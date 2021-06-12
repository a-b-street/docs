# Software

Our main software is [A/B Street](abstreet/README.md), but along the way, we've split out a few related side projects. A/B Street has a huge scope, so over time, we'd like to carve out more smaller pieces from it.

The main projects:

- [A/B Street](abstreet.md) for running a traffic simulation, editing roads and intersections, and measuring the impact of your changes. It has game-like elements, but leans more on the side of being a real prototyping tool.
- [15-minute neighborhood explorer](fifteen_min.md) for seeing where people live in relation to commercial and public amenities.
- [15-minute Santa](santa.md), a light-hearted arcade game to demonstrate the concept of a 15-minute neighborhood.

Some dedicated tools for the OpenStreetMap community:

- [OpenStreetMap viewer](osm_viewer.md) for auditing lane tagging
- [Parking mapper](parking_mapper.md) for editing street parking data

Some pieces of the code-base are eventually destined to be stand-alone and useful for other projects:

- [widgetry](../tech/dev/ui.md) Rust UI library for native/web
- a [common library](https://github.com/a-b-street/abstreet/blob/master/map_model/src/make/initial/lane_specs.rs) for transforming OpenStreetMap key/values to a clear schema of lanes

And some planned projects:
- a [low traffic neighborhood planner](https://docs.google.com/document/d/1ejmOPNyizR8owqjEbTYlIAN4l5QgLPJ85-es26q8nfg/edit?usp=sharing)
- something focused on [public transit](https://github.com/a-b-street/abstreet/issues/372)
