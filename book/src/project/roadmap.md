# Roadmap

[The 2021 roadmap](https://docs.google.com/document/d/1oV4mdtb0ve-wf0HqbEvR9IwXLIkTeDu8a3UnJxnr2F0/edit?usp=sharing)
is in a Google doc -- feel free to comment.

The rest of this doc covers plans for April-June 2021.

## Advocacy

A/B Street has been under active development since June 2018, but we haven't yet
used the software to advocate for anything specific in the real world. Ideally
we'd attract other people to do this and just focus on making the software
strengthen arguments as much as possible, but it's hard to pitch the idea of an
"explorable explanations" blog post without an example. So, we'll produce some
ourselves.

- Seattle:
  [Open Broadmoor for biking and walking](https://github.com/a-b-street/abstreet/issues/574) -
  there are no A/B Street modelling gaps to doing this, and it's a really
  simple, cheap idea.
- Seattle:
  [Model the Northgate pedestrian bridge](https://github.com/a-b-street/abstreet/discussions/490) -
  this'll open this fall, but we can estimate how much it'll help before then.
- Seattle: Model a few ongoing paving projects from
  [here](https://www.seattle.gov/transportation/projects-and-programs/current-projects)
  or
  [here](https://www.seattle.gov/transportation/projects-and-programs/programs/maintenance-and-paving/current-paving-projects),
  to see if the map editor is easy to use and drive UX improvements.
- London:
  [Cycling along the A5](https://github.com/a-b-street/abstreet/issues/577)

## Map / simulation

The main project will be
[widening existing roads](https://github.com/a-b-street/abstreet/issues/67).
Today, you can't transform one driving lane into a pair of bidirectional
cyclepaths, even though that'd usually physically work width-wise. You also
can't correct the OSM / inferred data about street parking. It's a complicated
technical change, but essential. Hopefully building entirely new roads is
possible to implement after this -- for things like the Northgate bridge or
mocking up light rail expansion ideas -- but consider it a stretch goal.

I think one of the intermediate steps to implement the above will be letting
cars
[enter and exit driveways](https://github.com/a-b-street/abstreet/issues/555)
from either side of the road. This should also help with gridlock, since many
vehicles today loop around strangely to approach a building from the right side
of the road.

### Score functions

A/B Street's main metric for success is impact to trip time, but this is the
kind of vehicle-centric, outdated way of thinking that we're trying to defeat.
It's just the simplest to implement. We'll start tracking safety/pleasantness of
trips too, exposing that in the UI as prominently as time, with the same ability
to compare changes. Specifically, we can measure cases when cars over-take bikes
(or at least want to), biking in the door-zone next to parking, and cars turning
from a road with a high speed limit over a crosswalk with pedestrians. We have
historic collision data for Seattle and the UK, and we can see if the dangerous
areas A/B Street finds match that data.

Relatedly, it's finally time to implement some form of
[mode shift](https://github.com/a-b-street/abstreet/issues/448). When you edit
the map and make it more pleasant to bike, some people should switch over to
doing it. There are many ways to do this, but we'll at least start with
something.

### Stretch: lane-overtaking

There are a few varieties of this, passing using another lane in the same
direction or against oncoming traffic, and something specific for
[shared walking/biking paths](https://github.com/a-b-street/abstreet/issues/139).
I think this is less important and riskier than the other work, but I want to
start it.

## UI

Implement Yuwen's new info panels, including the consolidated lane/intersection
editing.

## Leftovers - help wanted!

There aren't enough hours in the day, so probably not much work on:

- [Public transit](https://github.com/a-b-street/abstreet/issues/372)
- [15-minute neighborhoods](https://github.com/a-b-street/abstreet/issues/393)
- Some kind of website to share your map proposals

Although the funding story is unclear, I'd like to hire somebody in the next few
months to work on these.
