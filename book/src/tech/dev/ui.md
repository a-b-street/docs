# How the the A/B Street UI & drawing work

When I started A/B Street in June 2018, the
[Rust UI ecosystem](https://www.areweguiyet.com) had nothing that clearly fit my
needs, so I wound up rolling something custom. This doc explains conceptually
how it works and how to use it. Eventually some of this should become proper
docs for `widgetry`.

Best advice on how to use stuff in practice is to work from examples. `grep` is
your friend.

## widgetry overview

First, the crate-level view. `widgetry` is the generic drawing and UI library,
independent of A/B Street. `map_gui` builds on top of it, providing ways to
render the map model used by all of the projects. Finally, `game`,
`fifteen_min`, `santa`, and others are the runnable applications making use of
this.

This section will explain how `widgetry` works from bottom-up. Conceptually
we'll walk through how it was built from scratch, skipping all of the false
turns made along the way.

### Low-level

Let's start just by drawing stuff and handling keyboard/mouse events. The basic
loop of any [winit](https://crates.io/crates/winit) program is to handle input
events and, when winit says to, redraw everything. The earliest A/B Street
prototype expressed the primitive map model imported from OpenStreetMap as a
bunch of polygons, and hooked up basic mouse controls to pan and zoom over the
canvas.

And that hasn't really changed -- we still only draw 2D colored polygons.
Widgetry's use of
[OpenGL shaders](https://github.com/a-b-street/abstreet/tree/master/widgetry/shaders)
is dirt simple. With the exception of some barely used texture code, all of the
icons and images in A/B Street are SVGs, which can be
[transformed into colored polygons](https://github.com/a-b-street/abstreet/blob/master/widgetry/src/svg.rs)
through the magic of the [usvg](https://crates.io/crates/usvg) and
[lyon](https://crates.io/crates/lyon) crates. This includes all
[text](https://github.com/a-b-street/abstreet/blob/master/widgetry/src/text.rs)
-- even the text is just colored vector polygons! (Text rendering usually works
by uploading a table of raster glyphs to the GPU and drawing textured quads.)

The brief story of how we got here: by
[November 2019](../../project/history/year2.md), there was some basic support
for uploading raster texture and drawing them. At the second Democracy Lab
hackathon, a developer on Mac hit a 16 texture object limit that was different
than Linux. This is also when Yuwen joined and started designing using Figma,
which... conveniently had SVG export. I was also frustrated by rendering text
separately from everything else; finding the bounding boxes was buggy and there
were z-order issues. All of this prompted me to poke around and discover an
example using lyon to tesellate the output from usvg. I thought, there's no way
vectorizing EVERYTHING could be performant. But happily I was wrong.

Finally getting to the practical consequence here. It's expensive to upload
stuff to the GPU, but it's cheap to draw something already uploaded. So you use
a `GeomBatch` to build up that list of colored polygons, then upload it by doing
`ctx.upload(batch)`. Later on, you can `g.redraw(&drawable)` as many times as
you want and it's fast. You don't keep the `GeomBatch` around; it's just the
builder for a `Drawable`.

How should you batch stuff? Issuing redraw calls is fast, but not when there's
lots of them. So for example, one `Drawable` per every building on the map would
be a nightmare. Since buildings don't change, there's a single batch and
`Drawable` for all of them. There's a balance here; sometimes you have to
experiment to find it. But generally, if recalculating a batch only needs to
happen every so often, just lump everything together in one for simplicity.

### Stack of states

So at this point, there's logically one method to handle input events, and one
method to draw. No built-in organization; all application state is just lumped
somewhere. The basic insight is that an app has a stack of smaller states
layered on top of each other. For example, you start with a title screen, then
enter the main simulation interface, then open up a menu to show extra layers.
You still want to draw the simulation underneath the menu, but not allow it to
handle events. When you exit the simulation, you want to go back to the title
screen and preserve any local state there.

So a widgetry app mainly consists of a stack of
[States](https://github.com/a-b-street/abstreet/blob/master/widgetry/src/app_state.rs).
Each state implements a method to handle events and draw. Some states want to
draw what's underneath them, while some want to clear the screen and fully
handle everything -- so `draw_baselayer` specifies this.

When a state handles an event, it returns a `Transition`. This manipulates the
stack. `Transition::Keep` doesn't do anything; the current state remains.
`Transition::Pop` deletes the current state from the stack, and the previous one
takes over. `Transition::Push` introduces a new state, preserving the current
underneath. And so on.

There's actually two types of "state" (as in, data managed by the app): local
and global. Local "state" is owned by the struct implementing the `State` trait.
This is usually stuff like any UI panels (which we'll get to soon) and stuff
like which road we're editing, or what building we're examining. But usually an
app has a bunch of "state" that lasts for the entire lifetime of the program --
the map, the simulation, global settings. This stuff can change through the
program, like loading a new map, but every single `State` probably wants to use
it. This global stuff is stored in the `App` struct, which gets plumbed around.
So, each `State` has
`fn event(&mut self, ctx: &mut EventCtx, app: &mut App) -> Transition` -- `self`
is the local `State` on the stack, `ctx` is a handle into the generic `widgetry`
system, and `app` is that global "state". And there's also
`fn draw(&self, g: &mut GfxCtx, app: &App)`, with `GfxCtx` being the hook to
draw stuff. Note `draw` uses immutable borrows; generally you shouldn't modify
anything while drawing. (When you need to, like for caching, usually
[RefCell](https://doc.rust-lang.org/std/cell/index.html) is the answer.)

This system of states and transitions mostly works, but there's one super
awkward problem. Sometimes, state1 needs to push on state2 in order to prompt
the user for input (free-form text, a menu, or even something more complicated)
and use the result of state2 in order to do something else. In normal
programming, this would just be calling a function and using the return value.
How do we make that work with the event/draw interface? The answer is for state2
to return `Transition::Pop` and `Transition::ModifyState`, downcast the previous
`State` into a particular struct, and shove the return value somewhere. This is
incredibly gross, but I'm not sure what else to do.

### Panels

What's been described so far is kind of only useful for drawing and interacting
with stuff in "map-space", aka, the scrollable canvas. What about normal GUI
elements that live in "screen-space" on top of everything else -- buttons,
dropdowns, checkboxes, frobnozzlers? There needs to be a way to create these,
arrange them in some kind of layout, and use them for interaction. There's a
bunch of ways that GUI frameworks manage the problem of synchronizing
application "state" with the UI widgets, and it's more complex than usual in
Rust, because you hit crazy lifetime and borrowing issues if you try to do
anything with callbacks.

So sticking to the widgetry philosophy of seeing how far the low-level
abstractions stretch, widgets are just temporary "state" managed by a `State`.
They're always managed as part of a `Panel`, even if you have just a single
button. Constructing `Panel`s is hopefully straightforward from examples; you
assemble a tree of rows and columns, with some occasional styling and layouting
hints thrown in. Underneath, widgetry uses
[stretch](https://crates.io/crates/stretch) for CSS Flexbox-style layouting.
There are some quirks, most of which we've worked out and hopefully papered over
(like `padding` and `margin` don't work on most widgets directly; you have to
wrap them in a `Widget::row` or `Widget::col`).

So how do you know if a button has been clicked, a toggle toggled, a slider
slidden, a frobnozzler frobnuzzled? In some languages, you might expect
callbacks, but here in widgetry, you have to explicitly ask. Most `State`s will
`match self.panel.event(ctx)` somewhere near the top. This takes the current
event (a low-level keypress or mouse movement) and lets all of the widgets
inside the `Panel` possibly use it. If the event caused the widgets to do
something interesting, the entire `Panel` will return
`Some(Outcome::Clicked("button name"))` or
`Some(Outcome::Changed("spinner name"))`. The `State` code can then interpret
that UI-level event appropriately.

Currently, the widgets in a `Panel` are identified by lovely type-unsafe
hardcoded strings. This isn't the best, but in practice, it's rare to get out of
sync between the two places in one file that talk about the same widget.

Some widgets have more information than just "the button was clicked". Whenever
you need to, you can just query their state --
`self.panel.slider("time").get_percent()`, `self.panel.dropdown_value("mode")`,
`self.panel.spinner("duration")`. These last two are generic, and the compiler
usually infers the type of the value contained. (Internally, we just downcast to
that type, so you'd get a runtime panic if you mess up.)

#### Updating panels

Sometimes you need to change a `Panel`, often in response to something done on
that panel -- like say you toggle between showing raw data points versus
aggregating in a heatmap, and want to expose extra heatmap settings. There are
two choices for how to do this: build a new panel entirely, or replace one
widget.

Often it's simplest to just split the method that builds a `Panel` into its own
method, and call it again with some different parameters. Very very occasionally
when you take this approach, you'll need to do
`new_panel.restore(ctx, &self.panel); self.panel = new_panel;` to retain
internal widgetry state, such as "this scrollbar is in the process of being
dragged by the mouse."

Or you can just replace one widget (which may be an entire row or column of
stuff; it's just based on the string ID you specify).
`self.panel.replace(ctx, "edit", new_button)` does the trick.

#### SimpleState

The free-formed nature of `State::event` is sometimes overwhelming; how do you
order all of the things that need to happen? You could also implement
[SimpleState](https://github.com/a-b-street/abstreet/blob/master/widgetry/src/app_state.rs)
when you only have a single `Panel`. This gives a slightly more opinionated
interface, telling you when a button was clicked, slider was changed, when the
mouse was moved, etc. If you're confused, see how it implements `fn event` --
it's just organizing some typical different things that happen to handle an
event.

## Higher layers

Someday we want to release `widgetry` for general use to the Rust community. But
there's also lot of code shared between `game`, `fifteen_min`, and other apps
that handles UI concerns specific to `map_model`, which isn't something most
people will care about. This stuff goes in `map_gui`.

Lots of the `map_gui` code implements widgetry `States`, but those are
parameterized by a particular `App` struct. Since each of the top-level crates
uses a different struct, there's an
[AppLike trait](https://github.com/a-b-street/abstreet/blob/master/map_gui/src/lib.rs)
to handle this level of indirection. If it walks like a duck...

### Rendering maps

There are generally two strategies for drawing the map. In the unzoomed view, we
tend to have a single `Drawable` for all buildings, another for all roads, etc.
In the zoomed view, only a few map elements (bus stops, lanes, buildings) are
visible at a time, so we can afford to show more detail, and store a `Drawable`
per object. In fact, there's no need to even calculate all of this zoomed-in
detail upfront; many maps are huge, and a player won't zoom into every section
in a particular session. So internally, most of the
[Renderables](https://github.com/a-b-street/abstreet/blob/master/map_gui/src/render/)
use `RefCell` and lazily calculate what to draw.

`DrawMap` internally manages a
[quadtree](https://en.wikipedia.org/wiki/Quadtree) to figure out what to draw
and to help figure out what object is under the mouse cursor.

### async madness

If you want to see some scary Rust, check out
[load.rs](https://github.com/a-b-street/abstreet/blob/master/map_gui/src/load.rs).
There's a fatal flaw with the core `winit` event loop -- it was written before
Rust async landed. It's generally bad to spend more than a few milliseconds in
either `event` or `draw`; the app will appear sluggish, and at some point, the
window manager warns that the app is frozen. This happens when we
synchronously/blockingly load a big file from disk, or worse, from the network.

We're starting to figure out some of the workarounds. When there's "proper"
async Rust code, like for downloading a file on native, the trick is to spawn a
separate thread to execute the async block. The main thread (where `event` and
`draw` and most things run) stashes a `Future` inside of the `State`. In
`event`, it non-blockingly polls the future to see if its done. If not,
immediately return control to the window manager and just ask it to wake things
up again in a few milliseconds. Proper loading screens can be drawn this way.

All of this gets more complicated on the web, because you can't really spawn a
thread without somme web worker magic. It's still possible to make async HTTP
fetches work, but it's not all wired together yet.
