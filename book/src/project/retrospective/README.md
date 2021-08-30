# The A/B Street Retrospective

I want to reflect on what I've been working on for the past 3+ years, as of September 2021.

<!-- toc -->

## Technical accomplishments & challenges

<!-- A/B Street has pushed the envelope on some problems compared to anything else out there publicly. -->

### The map model

To support a traffic simulation, A/B Street's map model isn't just a graph. It represents the physical geometry of roads and intersections and includes land-use semantics, like estimates of residential units and commercial spaces within each building.

One thing that's surprising to people with a GIS background is how from-scratch everything is. There's no QGIS, Leaflet, PostGIS, or map tiles. The map is just a single file with simple data structures and a clipped study area.

#### Render OSM in gory detail

OpenStreetMap represents streets loosely as a graph, with road center-lines and a pretty free-form key/value tagging system. It was designed for ease of mapping certain features, not for maintaining data quality, representing roads as physical space, or describing semantics of movement along the transportation network.

But A/B Street needed lots of this, and OSM is the most enticing data source available, so I wrote aggressive heuristics to extract meaning from the formless chaos. Perfect results are unattainable, but I'm quite proud of how far it's come and how robust it is to most cities I've imported.

- [transforming road tagging into lanes](https://github.com/dabreegster/abstreet/blob/master/map_model/src/make/initial/lane_specs.rs)
  - The tagging schema described by the OSM wiki is complicated to begin with. But real mapping still diverges from this. I wound up fixing many discrepencies in Seattle, and made [a dedicated tool](../../software/osm_viewer.md) to help other mappers validate their work.
  - Because of A/B Street, I've mapped OSM tags that're just proposals or not widely used -- like [street parking](../../software/parking_mapper.md) and [cycleway:separation](https://wiki.openstreetmap.org/wiki/Talk:Proposed_features/cycleway:separation).
- [Creating geometry from roads and intersections](../../tech/map/geometry/index.md)
  - I believe A/B Street has the most advanced handling of complex OSM intersections of anything that's public
- OSM doesn't directly encode what movements are possible through each intersection. A/B Street generates this for vehicles and pedestrians with aggressive heuristics.
  - OSM turn lane tagging is often flat-out wrong (not matching the lane count) or broken when ways are split before an intersection
  - OSM has turn restriction relations that can span multiple road segments. This impacts graph pathfinding and traffic simulation in subtle ways. <!-- link pathfinding article -->
- OSM includes parking lots and aisles, but A/B Street needs to know capacity, which is rarely mapped. So it procedurally generates individual stalls fitting the geometry.
- A traffic signal is just a node in OSM -- or worse, a bunch of individual nodes for a complex junction. There's no way to describe its timing.
  - A/B Street has reasonable heuristics for grouping movements together in stages for many different shapes of intersections. (I never did much work on automatically improving the timing, though.)
  - I invented a [JSON interchange format](../../tech/dev/formats/traffic_signals.md) referencing OSM IDs to describe signal configuration.
  <!-- worked with Dr. Xuesong Zhou from ASU to import GMNS signal timing -->
  - The city of Seattle has still yet to release any public data about how signals are really timed, so for a while, I was [manually mapping them](https://docs.google.com/document/d/1Od_7WvBVYsvpY4etRI0sKmYmZnwXMAXcJxVmm8Iwdcg/edit?usp=sharing) with a notebook and stopwatch, and even convinced a few other people to join. (Of course this was futile; most interesting intersections depend on actuators, which can't be observed directly.)
- Built pathfinding into the map model for vehicles and pedestrians. <!-- article -->
  - Funded the creation of a new [Rust contraction hierarchy library](https://github.com/easbar/fast_paths) to achieve the performance necessary for a traffic simulation
  - Some complex features: responding to map edits (that might reverse roads, close things off to some vehicles), handling complex turn restriction relations, modeling private neighborhoods and streets with no through-traffic, turning left or right out of a driveway, and elevation-aware cost functions for vehicles, pedestrians, making unprotected turns, etc
<!-- Snapping -->

![](road_width_osm.png)
*Do you have any idea what's on these roads?*

![](road_width_abst.png)
*A/B Street shows the bus lanes and guesses road width.*

![](tempe_junction_osm.png)
*An arterial road with light rail crosses a minor road in OSM*

![](tempe_junction_abst.png)
*In A/B Street, one consolidated traffic signal represents this situation*

![](parking_lot_osm.png)
*A parking lot in OSM*
![](parking_lot_abst.png)
*The same lot in A/B Street -- 1500 spots, based on geometry*

![](tsig_two_stage.png)
*Is turning traffic backing up here?*

![](tsig_four_stage.png)
*Add some protected left turns!*

#### Joining data sources

A/B Street brings in other public data for some cities, joining it with the OSM-based map model.

![](data_blockface.png)
*Blockface data in Seattle describes street parking restrictions... in theory. Many segments disagree with OSM's splitting of roads, and many blocks have incorrect data.*

![](data_elevation.png)
*LIDAR elevation data overlaid with the bike network shows why Aurora would be such a nicer route to bike north from downtown than Fremont*

![](data_parcels.png)
*The sad blue sea of single-family parcels, from King County parcel data*

#### Map editing

It would be so simple if that map model representation was nice and immutable. But the whole point of A/B Street is to explore changes to the built environment. Aside from the UIs for this (which themselves went through many design iterations and usability studies), supporting this in the map model layer has been tough.

- Representing edits durably, even when a map is rebuilt from updated OSM data.
- Handling undo/redo. When you change the lanes of one road, it might invalidate the traffic signal policy nearby.
- When you widen or shrink a road, it affects intersection geometry. Especially when that intersection has been consolidated from several in OSM, there are some edge cases...
- Applying edits has to be fast -- jokes on loading screens are hard to write!

#### The map importer

At first, I was just importing a few parts of Seattle, so running a little tool was fine. But as word of the project spread, of course people wanted to see it in more places. (And in fact, the most solid audience for the project has been the OSM community -- mappers tend to already be very invested in OSM as a hobby, so they're willing to get past any clunky UX hurdles in order to play with something cool!) By now, I'm importing ~130 maps from ~80 cities. Anytime I update the OSM import code, I've committed to regenerating everything and at least not totally breaking a city!

I've [only barely managed](https://github.com/a-b-street/abstreet/issues/326) to stay on top of this growing scale. My faster laptop died for a few months and I scrambled to parallelize the import process in the cloud just to survive. Something that I haven't solved is expressing the complex importing process as a proper pipeline. Ideally it's a DAG of tasks depending on each other, with clear logging, progress tracking, parallelization, and error handling. One reason this is hard is expressing which parts of the graph to invalidate and recalculate. Should we grab new upstream OSM data? Just recalculat scenarios, leaving the maps alone? Only re-run one stage of the map import?

I'm pretty happy with how easy it is to [import a new city](https://a-b-street.github.io/docs/user/new_city.html). Originally you had to email me a boundary or compile the project yourself, but now the UI just asks you to draw a GeoJSON boundary, uses Overpass to grab fresh data, and runs the importer for you.

### Software engineering

#### Testing

A huge challenge to maintaining maps over time is not breaking things, either from my own importing code or when grabbing new OSM data upstream. Writing tests to guarantee some kind of invariants in the map model layer (like no two roads overlapping each other, no disconnected bits of the graph, minimum road length, etc...) was something I wanted to do, but all of those are pretty impossible targets to meet with the messiness of OSM data. So I settled on regression tests and manual tool-assisted diffing. Screenshot diffing is one trick -- inspect an imported map once, take screenshots of it, then later compare to manually validate changes. There are also tests that re-run a full traffic simulation on maps known to work. They ensure gridlock isn't re-introduced, that overall travel time patterns don't change radically, etc.

There aren't tons of unit tests. Usually expressing the input and expected output for any of the interesting problems is just too hard manually. There are some hybrid solutions, like generating turns at an intersection. The input (a map's roads) isn't easy to understand by looking at some text encoding, but viewing in the UI is. Likewise, a human can't glance at output like "left turn from lane #5 to lane #84" and hope to understand it. But we can store the text output as goldenfiles and, when there's a diff, again use the UI to inspect the change.

#### Releases

At my previous job, there was quite a bit of hassle maintaining a production service without downtime. It was initially very freeing to just write software quickly without worrying about breaking people, but of couse that didn't last long after I started releasing public builds every week. The [release process](../../tech/dev/release.md) is mostly automated.

At first, I just shipped all map and scenario data with the .zip releases and bundled this in one big .wasm blob (yes, really). Of course this didn't scale as we increased the number of imported cities. So eventually I made the UI download each city only when needed. This required [versioning the data](../../tech/dev/data.md) -- the code in a release from weeks ago is probably binary incompatible with the current map data.

Originally I just threw all the files in my personal Dropbox, but moved to S3 at some point (every single public file in Dropbox needs its own URL, and I broke the Python tool spamming it with requests for hundreds of files...). I really wanted to just re-use some existing tool to sync with S3 (both for me uploading and for people downloading), but never found anything that met all my needs -- cross-platform without system dependencies, grouping files into per-city data packs, gzipping. So I rolled my own [updater](https://github.com/a-b-street/abstreet/blob/master/updater/src/main.rs).

I'd still love to conceptually use real version control; maybe Git LFS is worth another try.

### Simulation

#### Discrete event traffic simulation

<!-- Full article... (maybe some of this is the intro to it) -->

Although there's lots of academic papers out there describing car-following models and other "microscopic," agent-based traffic models, it's always seemed to me that they omit details about how to actually implement them. So, I rolled my own. Not claiming this is a good approach -- simulation results have to be met with **much** more skepticism -- but I'm very proud of the model.

A/B Street simulates the movement of individual people walking, biking, and driving. It doesn't do so in fixed time-steps (every 0.1 seconds, update everything). It uses a "discrete event" approach. Each agent is in a state, like traveling along a lane or waiting at an intersection, for some amount of time. Updates only happen when that state possibly transitions to another one, like when a vehicle reaches the end of a lane or a traffic signal "wakes up" people on a green light. Instead of updating every agent every 0.1 seconds, we just "skip ahead" to the next interesting time, per agent.

Actually making this work with on-demand rendering at any moment in time is one of the more clever things I've come up with. The model is quite fast (until gridlock happens...) and looks reasonably realistic in aggregate. Things like smooth acceleration are missing, but few people have seemed to notice. Making vehicles change lanes and over-take is one of the main limitations -- this is very hard to squeeze into the discrete event model, and only half-done.

![](traffic_sim.gif)
*Drivers, cyclists, and pedestrians negotiate the traffic signal at Greenwood and N 87th*

#### Parking

Some traffic simulators out there are only focused on highways, not even inner-city driving. Many don't include pedestrians and cyclists, or bolt them on as an after-thought. But I'll bet A/B Street is one of the only ones including a detail crucial to the experience of driving: [parking](../../tech/trafficsim/parking.md). How many times have you heard a friend complain that it took 10 minutes to drive over, but 15 to find parking? Exactly.

Except in some maps that disable it, every driving trip in A/B Street begins and ends with somebody walking between their actual endpoint and a parking spot with their car. There's lots of estimation with the capacity along streets, in parking lots, and especially with private residences and businesses, but at least A/B Street tries. Maybe this pushes the rest of the field towards a bit more realism. Abstractions matter! Parking occupies a huge amount of space, and when your phone says driving somewhere is 20 minutes faster than taking a bus, it may not be giving you the full picture -- are you sure you won't circle around a dense neighborhood for 10 minutes finding that free spot? Abstractions matter. I hope I've done justice to Donald Shoup.

![](../../tech/trafficsim/parking_efficiency.png)
*Darker red dots are vehicles parked farther away from their final destination*

#### Gridlock

In both the real world and in a traffic simulation, vehicles get a bit stuck. In the real world, this is usually resolved by humans slightly breaking strict abstractions like usage of distinct lanes, slowly creeping into a partially blocked intersection, or deciding to detour around a problem last minute. I've had a hard time capturing that robustness in simulation, so well, in most simulations on larger maps, vehicles get stuck. Like, permanently.

This has so many causes -- broken intersection geometry causing impossible turn conflicts, weird lane-changing behavior, vehicles being too cautious about partially blocking an intersection, pedestrians darting into non-existent crosswalks, hilariously Byzantine traffic signal timing, travel demand models sending all 80,000 trips to UW campus to a single tiny building... and so I've dumped countless hours into trying to fix them, with only very modest success. Sometimes it's trying to fix the data, or improve signal timing heuristics. Sometimes it's building in complex cycle detectors into the simulation to figure out when vehicles in a roundabout are all waiting for each other. Sometimes it works. Usually it doesn't.

![](traffic_seitan.png)
*Traffic Seitan spreads from one broken Fremont bridge*

#### Travel demand models

You can't run a traffic simulation if you don't know where people are going, when they're leaving, or how they're trying to get there. The naive approach of uniformly distributing some number of trips between all possible buildings is hilariously unrealistic. And the amount of complex modeling and [specialized knowledge](https://www.psrc.org/sites/default/files/soundcastdesign2014.pdf) needed to properly do activity modeling or something simpler is overwhelming. I've tried as much as possible to punt on this -- importing Soundcast data for Seattle, relying on collaborators like [grid2demand](https://github.com/asu-trans-ai-lab/grid2demand) and [abstr](https://a-b-street.github.io/abstr).

But inevitably, A/B Street has wound up with its own simple travel demand models. Mateusz started the [proletariat robot model](https://github.com/a-b-street/abstreet/issues/154), using naught but OSM tags on buildings to estimate the number of people living and working, and using simple matching to send people to and from work, and nothing else. Such robots.

Then during the [Actdev](https://actdev.cyipt.bike/) work, it became necessary last-minute to generate traffic using UK census flow data, which describes the number of people commuting between different polygonal areas for work, broken down by mode. The [pipeline](https://github.com/a-b-street/abstreet/blob/master/popdat/src/od.rs) is simple.

We've also done a fair bit of work into data visualization to understand the outut of these travel demand models. Part of this even includes heuristics that automatically group buildings into "neighborhoods" -- roughly, tracing along arterial roads and finding everything in the middle.

![](commuter_patterns.png)
*Where do trips starting from Broadview go, according to Soundcast data?*

### UI

#### widgetry: a UI + dataviz library from scratch

This is probably one of the more ridiculous things that's happened.

In ~2018 when I started, all of the rendering and GUI libraries for Rust appeared to not do what I needed. So I started with [raw window event handling](https://github.com/rust-windowing/winit) and OpenGL and... just went for it. It's not hard to start drawing a big [slippy map](https://wiki.openstreetmap.org/wiki/Slippy_Map) with zooming and panning, nor is it tough to wire up a basic clickable button. But... [widgetry](https://a-b-street.github.io/docs/tech/dev/ui.html) has turned into something quite feature-full and has a decent API.

The journey there was quite circuitous. Most of the difficulty was not even knowing how the UI should work (or even having a clear picture of what the app was supposed to do...). But once Yuwen joined the project, this library started shaping up very quickly. And Michael has dumped in countless work into adding complex features to it, polishing the APIs and style, implementing massive design changes from Yuwen like the buttons...

The end result is pretty impressive -- it works on native and web (no system dependencies), everything's an infinitely scalable vector (including text), and it has loads of interactive dataviz widgets.

![](widgetry_demo.gif)
*A quick preview of interactive line plots, draggable cards, and a canvas filled with vector goodies*

#### Native and web

I never intended to target mobile or the web. But in January 2020ish, winit support for web landed, so I thought... why not? Initial support was surprisingly easy, but properly dealing with asynchronous file loading, loading screens, progress bars, and detangling native-only dependencies has been quite tough.

## Design accomplishments and challenges

I think it's safe to say my own design skills are somewhat lacking:

![](ui_ancient.png)
*A/B Street as of September 2019*

A/B Street has lots of complex information to convey and data to visualize, and getting people excited about a vision for a more sustainable transportation system requires beautiful design. So... it's quite awesome that [Yuwen](https://www.yuwen-li.com/work/abstreet) joined the project at the right time. Thanks to [Michael](https://github.com/michaelkirk) and feedback from dozens of people from OpenStreetMap, Github, Twitter, and user testing studies, A/B Street today is quite aesthetic and functional.

### Color schemes

One of the puzzles I struggled with from the very start was how to communicate both lane types and road types at the same time. Unzoomed, a simple color scheme distinguishes highways from major and minor roads:

![](colors_unzoomed.png)
*I5 is distinguishable from arterial and residential roads in Seattle, and the Burke Gilman trail is also visible.*

But zoom in, and we use coloring to distinguish regular lanes, parking, and sidewalks. It's still useful to distinguish major and minor roads, though! Most maps cheat with road width and use that, but there are many cases where arterials are just as wide as residential streets.

![](colors_zoomed_before.png)
*Can you spot the arterial?*

But inspired by designs from [Streetcomplete by Tobias](https://github.com/westnordost), we found some shades of grey that convey the difference quite effectively, as well as slightly convey the curb height:

![](colors_zoomed_after.png)
*There it is!*

Also, we have a pretty fantastic night mode, although I'm still holding out for something more cyberpunk.

![](colors_night.png)
*Both the UI and map have colors to show when the simulation is after-hours*

### Road editor

A/B Street's ability to edit roads started simple, but today is quite powerful. Inspired by [Streetmix](http://streetmix.net), you can modify lanes however you want:

![](edit_roads.gif)
*Drag-and-drop, spear-headed by Michael, is key to this UI working smoothly.*

We arrived at this design only after many rounds of designing, implementing prototypes, and gathering feedback.

### Traffic signal editor

Most people experience traffic signals from the ground, not the sky -- they think about just the direction they want to go, not how the entire intersection behaves over time. At any point in time, a particular movement could be protected by a green arrow or light, permitted after yielding to oncoming traffic, or not allowed. After many iterations, I think we represent and allow changes to this quite well:

![](edit_signals.gif)
*Left turns should be protected here. So first we remove the left turns from stage 1, where they were just permitted. Then we add a new stage, protect the left turns, and adjust its timing to end early if there's no traffic.*

### Data visualization

A/B Street measures all sorts of things -- travel times, delays, throughput, a biking route's steepness, exposure to risky events. All of these things can be understood at the level of individual agents, roads, and intersections, or you can explore aggregate patterns and finder larger trends. You can view the data in absolute terms based on the current simulation running, or if you've edited the map (and the map is one of the lucky few that doesn't gridlock), then you can compare the results to the baseline simulation without edits -- the essence of A/B testing.

Here's a very incomplete sampling of our work:

![](viz_trip.png)
*Diving into one person's route*

![](viz_delay_scatter.gif)
*Watching a live scatter plot of delays through an intersection, broken down by mode*

![](viz_relative_thruput.png)
*The red roads have higher foot traffic, due to converting Broadmoor to a Stay Healthy Street*

![](viz_trip_table.gif)
*Using a sortable table of all trips to find individual people whose journey got much faster due to map edits*

![](viz_time_summary.gif)
*Understanding how short and long trips got faster or slower due to map edits*

### Road labels

Placing road labels on a map is a design and implementation challenge, but Michael and I cranked out something decent in a few days:

![](road_labels.gif)
*Labels aren't too densely clustered, but they still appear to help orient by major roads.*

<!--
### Product requirements

- abst as a game
	- tutorial, challenge modes, sort of a story (even with character art!)
- 15m tool
- santa!
- osm viewer, parking mapper
- ungap map tool
-->
