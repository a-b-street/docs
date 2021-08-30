# Deep dive into devilish details: Intersection geometry

Some of the things in A/B Street that seem the simplest have taken me tremendous effort. Determining the shape of roads and intersections is one of those problems, so this article is a deep-dive into how it works and why it's so hard.

Note 1: There's no "related work" section here -- I haven't found many other projects attempting something like this. I've seen a few research papers going in this direction, but none of them pointed to any code to try. The approach I'll describe has many flaws -- I'm not claiming this is a good solution, just the one that A/B Street uses. If you see a way to improve anything here, let me know about it! Even better, try it for real and send a PR -- there's plenty of tooling to help you debug and visually diff against the existing implementation.

Note 2: This article would be way more awesome with code and some interactive demos to play around with each step. That level of ambition would prevent this from ever being written, though! I'll link to the real code and am happy to answer questions if anything's unclear.

## Background

Most street maps you'll find provide a simplified view of streets. Google Maps, Apple Maps, and most OpenStreetMap renderers mostly just tell you the road's name, color it by type (a highway, major arterial road, minor residential street), take great liberties with the width, and don't explicitly distinguish intersections from roads. These maps are used for navigation and drawing your attention to nearby businesses, so this is quite a reasonable view.

![](rainier_google.png)
*From Google, it looks like Rainier is a much bigger road than S Massachusetts*

![](rainier_osm.png)
*The roads look about the same width in OSM*

![](rainier_abst.png)
*A/B Street reveals the turn lanes and also some bike lines on Massachusetts!*

![](rainier_satellite.png)
*Finally, Google's satellite imagery reveals the true shape of the intersection, though it's a bit hard to tell with the tree cover. And unless you zoom in, there's no way you'll spot the lane count or bike lanes.*

A/B Street is all about imagining how traffic moves through a city and exploring the effects of redesigning streets. So of course, we need way more detail. To imagine a bike lane down Eastlake Ave instead of street parking, we need to first see how the street's space is allocated. To propose a more pedestrian-friendly traffic signal crossing from Husky Stadium to the UW medical building, we need to see that huge intersection.

![](eastlake_before.png)
*Does Eastlake really need to dedicate 5 lanes to moving cars and 2 to storing them?*

![](eastlake_after.png)
*Talking about Eastlake having a safe cycling route is one thing, but isn't it much easier to imagin when you can just see it?*

At a high-level, we want a representation that:

1) Clearly communicates how a road is divided into different types of lanes (general purpose driving, turn lanes, bike lanes, bus-only lanes, street parking, sidewalks)
2) Represents the total road width, which tells us how we might change that lane configuration
3) Divides paved area into distinct roads and intersections. This division tells us where vehicles stop before entering an intersection, how pedestrians and vehicles are likely to move through the space, and what conflicts between them might occur.

We're constrained to publicly available, free data sources. Although some cities have GIS departments with some datasets that might be helpful, we're pretty much going with OpenStreetMap (OSM), which has decent coverage of most cities worldwide.

### Desired output

Let's be a little more specific about the representation we want. If you imagine a city as flat 2D space, roads and intersections occupy some portion of it. (Let's ignore bridges and tunnels.)

![](thick_pt1.png)
*Here's a three-way intersection at your typical Seattle angle*

We want to partition this space into individual intersections and road segments. Each road segment (just called "road" for simplicity) leads between exactly two of those intersections. This partition shouldn't have any ambiguous overlap between objects.

![](thick_pt2.png)
*The red part is what we'll deem the intersection. The grey roads and the intersection now partition the space.*

A simplifying assumption, mostly coming from OSM, is that roads can be represented as a center-line and width, and individual lanes can be formed by projecting that center-line left and right. This means when the road changes width in the middle (like for pocket parking or to make room for a turn lane), we have to model that transition as a small "degenerate" intersection, which connects only those two roads.

![](degenerate.png)
*Two lanes become four -- probably some turn lanes appearing. The lighter grey is our intersection.*

Another assumption taken by A/B Street is that roads hit intersections at a perpendicular angle.

![](perp_no_traffic.png)
*Note how the intersection "eats into" Boren, the diagonal road more than you might expect.*

We use this division to determine where vehicles stop, and where a crosswalk exists:

![](perp_traffic.png)
*Does it seem like vehicles have stopped too far away from the intersection?*

Of course, this assumption isn't always true in reality:

![](perp_satellite.png)
*The crosswalks across Boren are horizontal!*

If we allowed roads to hit intersections at non-perpendicular angles, but still insisted that the stop position for each individual lane was perpendicular, it might have a "jagged tooth" look:

![](perp_teeth.png)
*The cyan lines show one way to represent adjacent lanes that extend different lengths.*

But for the sake of this article, these're the assumptions we're sticking with. Pedestrian islands, slip lanes, gores, and medians are all real-world elements that don't fit nicely in this model.

## Overview of the process

We'll now explore the steps to produce geometry for a single intersection and its connected roads. The broad overview:

1) Pre-process OSM into road center-lines with attributes, with each road connecting just two intersections.
2) Thicken each road
3) Trim back the roads based on overlap
4) Produce the intersection polygon

Let's pick a particularly illustrative [five-way intersection](https://www.openstreetmap.org/node/1705063811) as our example.

## Part 1: Thickening the infinitesmal

OSM models roads as a center-line -- supposedly the physical center of the paved area, not the solid or dashed yellow line (t least in the US) separating the two directions of traffic. The schema, and how it gets mapped in practice, is fuzzy when there are more lanes in one direction than the other or when roads join or split up for logical routing, but... let's keep things simple to start.

![](osm_center_lines.png)
*5 roads meet at this intersection. The white lines are OSM's center line.*

OSM has a few tags (link) for explicitly mapping road width, but in practice they're not used. Instead, we have a whole bunch of tags that describe the lane configuration of the road. A/B Street interprets these and produces an ordered list of lanes from the left side of the road to the right, guessing the direction, width, and type of each lane. See the [code here](https://github.com/dabreegster/abstreet/blob/master/map_model/src/make/initial/lane_specs.rs) -- it's fairly lengthy, but has some intuitive unit tests. This interpretation of tags is hard in practice because the schema is very confusing, there are multiple ways of mapping the same thing, people make many mistakes in practice, etc. <!-- TODO, list some examples like cycleway:left:separator:right. -->

![](tags_to_lane_specs.png)
*A very simple example of OSM tags on the left, and on the right, A/B Street's interpretation of each lane, ordered from the left side of the road.*

So for each road, we estimate the total width based on the lane tagging. Then we project the center line to the left and right, giving us a thickened polygon for the entire road:

![](thickened_5.png)
*All 5 of our roads, thickened based on the lane tagging. The red dot is the position of the OSM node shared by these roads.*

### Projecting a polyline

Before we move on, a quick primer on how to take a polyline (a list of ordered points) and project it to the left or right. There are some better explanations of this online, but I don't have them handy. I wouldn't call A/B Street's [implementation](https://github.com/a-b-street/abstreet/blob/91c152c123924d7b8bfa14722d18c652d7e42966/geom/src/polyline.rs#L435) fantastic, but it's there for reference.

![](project_pt1.png)

The original polyline is in black. If you can't tell from my quick drawing, it consists of 3 line segments glued together. We want to shift it to the right some distance. We start by taking each line segment and projecting it to the right that distance. That operation is simple -- rotate the line's angle by 90 degrees, then project the line's endpoints that direction. The 3 projected line segments are shown in blue, green, and red.

There are two types of problems we need to fix for the new polyline to be glued together nicely. The blue and the green line segment intersect each other, so we'll trim both segments to that common point:

![](project_pt2.png)
*Please forgive my horrid paint editor skills*

The green and the red line segments are far apart. Let's imagine they keep extending until they do intersect. If I recall proper terminology, this is a miter join:

![](project_pt3.png)

And that's it! Easy.

... Except not really. The real world of OSM center-lines has every imaginable edge case. When a road is both thick and sharply angled enough, extending those line segments until they meet works... but the hit might be very far away:

![](project_sharp.png)

My workaround currently is to hardcode a maximum distance away from the original line endpoints. If our miter cap reaches beyond that, just draw a straight line between the two segments. I think this is known as a bevel join.

Just for fun, let's see what happens when a polyline doubles back on itself in some less-than-realistic ways:

![](project_lovecraftian.gif)

Truly Lovecraftian geometry. I don't think I often see points from OSM totally out of order like this, but it happens sometimes and is immediately obvious.

## Part 2: Counting coup

For each road, we've got the original center from OSM and our calculated the left and right side:

(pic)

Now the magic happens. You'll notice that many of those polylines collide (For sanity, let's call these "collisions" and not "intersections", since that term is overloaded here!). Let's find every collision point:

(pic)

These collisions represent where two thickened roads overlap. So let's use them to "trim back" the roads and avoid overlap. For each collision, we form an infinitely long line perpendicular to the collision and find where it hits the original center-line. We'll trim the road back to at least that point.

(diagram)

Because we want roads to meet intersections perpendiculously (I'm quite sure that's the proper term), we want the left and right side of a road to line up. There's probably a collision on a road's left and right side, and usually one of them would cause the center-line to be trimmed back more than the other. We'll always trim back as much as possible.

(pic)

Some questions to consider:

1) Why look for collisions between every pair of left/right lines? Couldn't we just use the "adjacent" pairs?

2) Is it ever possible for the line perpendicular to a collision to NOT hit the center-line?

## Part 3: The clockwise walk

We've now trimmed roads back to avoid overlapping each other. We just need to generate the polygon for the intersection. As a first cut, let's take these trimmed center-lines, calculate the left and right polylines again (since we've changed the center line), and use the endpoints for the shape.

(example)

Oops, the polygon covers a bit too much space! Cut red tape, queues, and split ends, but not corners. What if we remember all of the collision points, and use those too?

(example)

Much better.

### Sorting roads around a center

When we're forming the intersection polygon, we know all of the points making it up. But what order do they go in? Seemingly innocent question.

Maybe we can just average all of the points, call that the "center", calculate the angle to each point, and order clockwise.

(diagram)

TODO: Should we talk about the consolidated intersection case here or not?

## Interlude: problems so far

That wasn't actually so bad! The results are reasonable in many cases:

(examples)

But what kind of things go wrong?

### Floating point fudgery

Do we ever wind up with points that're aaaalmost the same? What threshold do we pick to deduplicate?

### Funky sidewalks

the montlake example

### Lovecraftian geometry

When do we wind up with the polygon looping back on itself? (When two thick roads overlap, but dont share an intersection -- right?)

### Bad OSM data

Often times, the upstream OSM data is just flat-out wrong. Center lines for divided one-way roads are way too close to each other, so using the number of lanes with a reasonable guess at width produces roads that overlap outside of the intersection. This throws off everything we've done!

(aurora)

Another example is people tagging the lane count incorrectly. A common problem when splitting a bidirectional road into two one-ways (which is what you're supposed to do when there's physical separation like a median) is forgetting to change the lane count:

(example)

An important lesson when trying to write algorithms using OSM data: there's a balance between making your code robust to problems in the data, and trying to fix everything upstream. I attempt a compromise. It's a virtuous cycle -- in trying to use OSM data in this new way, I wind up fixing the data sometimes.

### Highway on/off-ramps

TODO Problem and solution. How do we detect this case?

The montlake/520 thing also has this -- if we opt it in, can we fix?

## Intersection consolidation

This strict separation between roads and intersections has a fatal flaw -- the real world is very complicated.

### Where short roads conspire

"Dog-leg" intersections: We model the short highlighted piece as its own road, and there two intersections super close together.

(example)

But sometimes something looking like a dog-leg actually isn't -- if vehicles can legitimately stop and queue there, even if it's only one or two of them, then I think it deserves to remain separate:

(phinney/market example)

Another common case is divided highways, aka dual carriageways, aka parallel one-way roads. Every time these intersect, we wind up with some short roads and lots of intersections.

(example of 2 crossing a normal bidi, example of two oneways crossing)

And then there's just the funky cases where I'm pretty sure civil engineers anticipated me writing this algorithm, and found the most obnoxious angles for roads to meet in order to maximize my frustration:

(weird boston example)

### Why we want to do something about it

So why is this a problem? For starters, it's visually incomprehensible:

(examples)

Oh, that's not enough convincing for you? These complicated areas often are the ones that would be most interesting to study in A/B Street, but just try adding or removing lanes in these cases:

(example)

Now throw traffic signals into the mix. A/B Street tries to simulate those, so when we have a cluster of two or four of them super close, now we have to somehow try to synchronize their timing. When somebody wants to edit them, now they have to operate on all of them at once! We even extended the UI to handle that, but it's quite a poor editing experience.

(example before, and after)

And finally, traffic simulation gets MUCH harder. A/B Street models vehicles as having some length, meaning a vehicle's front can make it through one intersection, but its tail gets stuck there:

(example)

Turns through intersections are just modeled as polylines. They conflict with each other very coarsely. In reality, humans might try to wiggle around a vehicle partially blocking an intersection, but we don't have that robustness. So to prevent this problem from happening, the simulation has complicated rules so that vehicles do not "block the box" -- if they enter an intersection, they must be guaranteed to fully exit and clear it, not get stuck somewhere in the middle. These rules blow up in the presence of short roads. Lots of effort has gone into workarounds at the simulation layer, but... just fixing the representation in the map model seems much more desirable. So let's do that!

### My lazy first attempt

Remove the short road, extend the road geometry (or not?), run it through the same algorithm. Miraculously this worked sometimes?!

### Current attempt: two stage

TODO: Write.

Pre-trim based on original thing, remember how much to trim back each road center line.

Then do the merge -- blow up the road. Don't modify any center lines.

For the geom algorithm, do something totally different -- just project the pre-trimmed thing and use that. Seems to work? Even when editing roads, turns out k?

### Sorting around a center

Before trimming, how do you do this? The point farthest away? A point a fixed few meters away?

For consolidated intersections, probably use the pre-trimmed point

Example Tempe intersection with light rail that blows it up. Center vs polylabel.

### Finding the short roads

I've been tagging junction=intersection manually upstream to opt them in slowly.

Tried some approaches that look for all short road (pre trimmed or post?). Usually breaks.

Targeted heuristics for 2 and 4-clusters of tsigs.

Examples in Loop 101 -- it gets crazy.

Focusing on tsig clusters for now, since they cause the most problems to traffic sim, but very much ongoing work.

## Conclusion

Given how much time I've sank into trying to automatically generate decent geometry from an OSM schema absolutely not meant for this, I hope you don't fault me for wanting to try some radically different ideas, like mapping from scratch. There are some intersections just not worth trying to squeeze into OSM's model. Maybe in some future, I'll explore something very different. Or play around with some of the proposals to tag OSM junction areas.

## Appendices

### Tricks and tooling

- screenshot diff as a regression test!
- back and forth on RawMap editor and marking stuff in the main game. fast reimports. be able to adjust road centers in rawmap, quickly toggle shorties on or off, preview geometry.
- how to debug? this is wedged in the middle of an import process, should we emit extra "side output" files to visualize later? Some kind of step-through debugger, live edit code would be fantastic.

### Hall of Lovecraftian horrors / the stress tests

montlake/520

roundabouts

south of fremont bridge

### Radically simpler approach?

Why not just thicken roads, calc bool overlap?  robust bool-op library, and also three-ways

### Other data sources

philly curb vectors?

streets illustrated
