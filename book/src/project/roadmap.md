# Roadmap

See
[this doc](https://docs.google.com/document/d/1tsr65WIIX3Y6A804eUK-BIVbOfwdYCOVddZe7esNSw0/edit?usp=sharing)
for a Q2 retrospective and more notes. This is a summary for our plans for
July-September 2021.

## Mode shift

Top priority is calculating when changes to roads might cause people to change
behavior long-term. A/B Street only shows short-term impacts right now, but we
have enough things in place to calculate when somebody might decide to ditch
their car. Ideas are [here](https://github.com/a-b-street/abstreet/issues/448).

Related to this, we'll try to allow
[editing the map without reseting the simulation](https://github.com/a-b-street/abstreet/issues/312)
again. This has eaten lots of time already without any usable results, but there
are some fresh ideas for a simpler implementation.

And [Trevor](https://github.com/tnederlof) is actively looking at reviving
public transit support from GTFS, which will fit into mode shifting perfectly --
in many places, deciding to use transit is much more likely than convincing
somebody to bike.

## Finish half-started projects

In Q2, there was some progress on hard technical problems:

- consolidating complex intersectons
- dynamic lane-changing
- entering and exiting driveways from either side of the road

We'll continue pushing forward here. And some other areas likely to be revived:

- snapping separate cyclepaths to roads
- more realistically placing crosswalks

Some of this work will be prioritized based on a contract to help a city
demonstrate their design ideas for making their downtown be more multimodal
friendly.

## Project logistics

- Push through a revamp of <docs.abstreet.org>
- Publish at least two blog posts exploring particular ideas in Seattle
- COVID-permitting, start a Seattle-area meetup for exploring transportation
  changes
