# Contributing

Lots of people are interested in this project, with very diverse backgrounds.
This page isn't meant to be prescriptive or limit options; it's just a starter.

## Programming

The biggest hurdle here is that A/B Street is written in Rust, a language that
may have a high entry barrier. If you're more comfortable in Python, R, or
something else, there are still ways to contribute -- particularly producing
input data for A/B Street to simulate.

### Machine/reinforcement learning

If you're a researcher looking for a complex multi-agent simulation with lots of
things to optimize, you've found the right place. We have a simple
[JSON API](../tech/dev/api.md) already you can plug into, but we'd love to
improve this based on your use case. Particularly cool ideas could be
auto-tuning traffic signal timing or calibrating travel demand scenarios to
real-world throughput/delay measurements.

### Transportation modelling

Do you sling around population and aggregated origin/destination data with R or
Python? Great, help us generate realistic
[travel demand models](../tech/dev/formats/scenarios.md)! Work in whatever language
you like best; we'll settle on a common format.

### Working on A/B Street itself

You'll need to learn at least some Rust to start here. We can help you a bit
with that, especially by recommending starter projects or giving feedback in
PRs, but this requires a fair bit of independence.

There's so many different types of things to work on -- see our
[hiring page](hiring.md) and
[Github issues](https://github.com/a-b-street/abstreet/issues).

### Data visualization / analysis

A/B Street generates loads of individual data through the simulation, but
deciding what's important, how to aggregate things, what filters/controls to
give to the user, and how to communicate trade-offs is really hard!

We can export data however's useful -- there's a few CSV files that the UI can
export today. You can work on analyzing and visualizing the data using whatever
tools you like. To actually implement a new dashboard in A/B Street, we'll
implement it in Rust, but we can implement/copy what you produce elsewhere.

Some examples where we need help:

- How to aggregate and compare the number of "risky events" somebody encounters
  on their trip, possibly using some kind of contingency matrix. See
  [this PR](https://github.com/a-b-street/abstreet/pull/622) for some discussion
  and open questions
- How to show roads with more/less traffic. See this
  [discussion](https://github.com/a-b-street/abstreet/issues/85)

## Design

We wouldn't have made it to this point without loads of help from our UX
designer. We could always use more help here. We use Figma for designs
currently.

### Graphics

From what I've seen, no other street map attempt to include lane markings and as
much detail as A/B Street. This means there's not much cartography to take
inspiration from. Some places we need help:

- Showing arterial vs small residential roads while zoomed in
- Conveying more information about buildings and land use -- is it a small
  house, some apartments, a shop, a mall, a multi-use development?
- [Tuning the color-scheme](https://github.com/a-b-street/abstreet/issues/74),
  especially in a color-blind friendly way
- Visualizing
  [low traffic neighborhoods](https://github.com/a-b-street/abstreet/issues/660)
- Many people can't recognize the pedestrians and cyclists; how do we represent
  them better in our 2D top-down view? What should e-scooters look like?

### Storyboarding

We didn't start A/B Street with a clear set of product requirements or a
storyboard for how it should work -- and we've been paying the price of this all
along. But newer tools like the [15-minute explorer](../software/fifteen_min.md)
or the idea for a
[low-traffic neighborhood planner](https://github.com/a-b-street/abstreet/issues/660)
are focused and young enough where we could properly plan out the features and
UI.

### Game design

A/B Street _tries_ to be a game, but it falls pretty short. Want to help us
improve the [tutorial](https://github.com/a-b-street/abstreet/issues/611)? Have
some ideas how to split up levels in the challenge mode? Know how to write a
story? Help us!

Or maybe you can imagine a new spin-off game reusing some of the work that
exists today. That's how [15-minute Santa](../software/santa.md) happened!

## Using A/B Street

### You have an idea for fixing something in your city

That's why we made this! Just go try and make the change, initially without help
from us. Write down your experience and all of the problems you hit. Then tell
us the problems and any ideas for fixing them.

Then write up a [proposal](../proposals/index.md) and start advocating for it!

### You're an advocacy group

If you want to use A/B Street to argue for some change in your city, get in
touch! It's easiest if you:

- Tell us very clearly what you need
- Draw a [study area](../user/new_city.md)
- Have a pretty specific idea of what roads/intersections you want to actually
  change
- Have an idea of how you want to communicate your idea; browse
  [our proposals](../proposals/index.md) for inspiration

### Researching car-free cities

Maybe you're studying urban planning and think our software can help. We have
some of the tools to get you started -- importing a new map, changing road
configuration and access, measuring comparative results. But you'll probably
have to work with us directly to fix up the map data and get a proper demand
model. You can help us by giving usability feedback about what's hard to do and
ideas for things to add. We're not experts in planning -- if you can tell us how
software can help you do your job better, let's talk!

### Usability studies

Every so often, we conduct formal usability studies. You'll spend an hour on a
videocall doing something in A/B Street and vocalizing your thought process and
what problems you hit. We'll use your feedback to find and fix problems.

We only run these every now and then; just contact us to get on the list for the
next round.

### Reporting bugs

You're bound to hit problems using our software -- just
[file an issue](https://github.com/a-b-street/abstreet/issues/new) when you do.

## Improving data quality

A/B Street relies on having an accurate and up-to-date model of your city. What
do you do when it's wrong?

### Fix incorrect lane data

The most common problem is that a road has the wrong number of lanes, or
turn/bike/parking lanes are missing. If you know how to edit OpenStreetMap
already, go fix it. If not, you can use the lane editor in A/B Street to fix the
problem and make the road match reality. Send us your edits, and we can help
make the fix in OSM.

### OpenStreetMap mapper

Are you already involved in OSM and want to validate your work? Use
[our tool](../software/osm_viewer.md) to help you visualize lane tagging easily.
Keep in mind there are some problems with this viewer that might not reflect
problems with the data in OSM -- particularly separate foot/cyclepaths and weird
intersection geometry.

Or maybe you think your city is incredibly well-mapped already -- I bet it's
missing one thing. Please map [street parking](../software/parking_mapper.md) --
we need this to guess road widths.

## Project logistics

### Networking / marketing

Know an advocacy group or city authority who would want to use our work? Make
the connection!

### Project management

Organizing all of the information, ideas, and people involved with this project
is hard. Just writing this page and website took way too many tears and
caffeine! We could also use help prioritizing work and coming up with
requirements for new ideas.

### Write documentation

This website is [easy to edit](https://github.com/a-b-street/docs). We could
especially use help writing a user guide -- describe how different tools in A/B
Street work, or work through examples of how to do stuff.

### Funding

Our [funding](funding.md) is pretty nonexistent, but if we had some, we could
[hire more people](hiring.md) and build useful things faster. Do you know how to
write NSF grants? Have you thought of a business model compatible with our
values but that would let us financially sustain ourselves? Do you think we
should be an LLC, a B corp, a non-profit, something else? Help needed!
