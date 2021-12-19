# CHANGELOG

Every time I upload a new [binary
release](https://github.com/a-b-street/abstreet/releases), I'll list major
changes here.

0.1.0

- First binary release

0.1.1

- drawing arrows better
- start with a splash screen, make it easy to change maps in-game

0.1.2

- totally revamp GUI by organizing everything into distinct gameplay modes

0.1.3

- new warp tool that autocompletes street names
- hideable menus, place context menus better, remove top menu bar, add a simple OSD
- loading screens reflect what's printed to the terminal
- depict pedestrians and bikes with more detail
- tool to scroll through an agent's route
- make simulation speed controls actually work

0.1.4

- improve stop sign editor UI (toggle entire roads)
- better mouseover / selection rendering
- better traffic signal rendering (show time left, use outlines for yields)
- make cars actually stop and briefly wait at stop signs
- improve edit mode diff visualization (cross-hatching)
- render actual stop signs, not just red lines
- fix intersection policies confused by conflicting straight turns with lane-changing
- fix mac scrolling
- better turn indicators
- nicer unzoomed view of roads, with different colors for big/small roads

0.1.5

(release file size jumped from ~15MB to ~70MB because of new PSRC trips)

- improve UX of intersection editors
- define a better set of maps included by default
- improve drawing speed by batching more stuff
- better default traffic signal policies for many cases
- import and visualize census data
- fix missing sidewalks on downtown one-ways
- import and visualize PSRC trip data

0.1.6

- slider widget for controlling time and speed
- fixing bad polyline geometry in most cases; visualizing routes should no longer be buggy
- handle PSRC trips that begin or end out-of-bounds
- draw agents in unzoomed mode in a way simpler way
- improve edit mode: detect reverts to original, easier lane type switching
- lots of fixes for buses: handle edits better, read sequence of stops correctly from GTFS
- set up A/B tests faster

0.1.7

- bulk and revert tools in edit mode
- improve turns and default intersection policies when bike/bus lanes involved
- new tool to manually hint for short roads and weird intersections. some problems have now been manually fixed
- scoreboard of trip results for sandbox and A/B test mode
- reduce lag when sim is running at full speeds, but system is too slow
- switch to easbar's contraction hierarchy crate, making all pathfinding INSANELY fast
- remove weird rules about the world freezing when traffic signals are in "overtime"

0.1.8

- edit mode: convert to a ped scramble cycle, simplify stop sign editor by removing individual turns
- ui: put labels next to sliders, organize modal menus into sections, add a minimize/maximize icon
- A/B test mode: savestate, include time controls and agent following/route tools here
- use more OSM data for turn lanes, turn restrictions from lanes, turn restrictions between entire roads
- dont attempt to cross a traffic signal if there's absolutely no hope
- improve bus route UI tools and make routes using transit more sane
- user-defined shortcuts for jumping between views of a map

0.1.9

- sliders to pick times in wizards
- fix hidpi scaling
- traffic signal diagram scrolls properly
- easier to instantiate a scenario, show all trips involving a building for a scenario
- colorschemes to show trip duration or time blocked
- label buses with route number
- represent overlapping pedestrians as a labeled crowd
- massive performance boost via real priority queue
- prevent cars from "blocking the box"
- prevent all? aborted trips (due to parking blackholes mostly)
- smarter roam-around-for-parking router

0.1.10

- sim
  - parking in off-street garages and on-street lanes on the off-side of oneways now mostly works
  - detect and handle parking blackholes; cars should never get stuck looking for parking now
  - let lower-priority turns happen at traffic signals when higher-priority ones blocked
  - get closer to FCFS ordering at stop signs
  - basic opportunistic lane-changing
  - a bus should be seeded for every route now
- demand data
  - show trips to/from buildings and borders
  - make PSRC trips seed and attempt to use parked cars
- UI
  - different heatmap overlays, like parking availability and busiest areas
  - show colorscheme legends when relevant
  - interactively seed parked cars, spawn more types of trips
  - fix major A/B test mode bug (mismatched scenarios and map edits)
  - adjusting sliders, menu placement, dynamic items
  - consolidating different tools into a single info panel for objects
  - bus route explorer shows entire route, current bus location
- map quality
  - degenerate intersections only have one crosswalk now
  - revamped the map editor for fixing geometry problems, used it in many places
  - nicer yellow center lines (dashed when appropriate)
  - handling OSM turn restriction relations properly
  - fix empty traffic signal phases
  - handling bike lanes on certain sides of the road
  - starting to upstream manually-verified parking lanes into OSM
- new gameplay: reverse direction of lanes

0.1.11

- small UI fixes: fixed width traffic signal diagram, skip info phase of menus when empty
- start drawing (but not using) shared left-turn lanes from OSM
- fix OSM polylines with redundant points (fixing an issue in ballard)
- improved traffic signal policies in some cases
- started upstreaming some sidewalk tags in OSM to fix inference issues
- fixed misclassified right turns
- adjusting map colors
- handling lakes/ocean polygons from OSM way better
- reorganized sim analytics, added stuff for bus arrivals
- adding new internal road points to map editor. almost ready to really aggressively use it
- skipping parking lanes with no nearby sidewalks, since they're unusable
- fix z-order of bridges/tunnels in unzoomed view
- allow unzooming indefinitely
- move lots of sandbox mode controls (and other modes) to menus under buttons and dedicated buttons
- basic support for marking a lane closed for construction
- improved geometry of sidewalks at dead-ends

0.1.12

- reorganize everything as different challenge modes. start implementing 3: optimizing a bus route, speeding up all trips, or causing as much gridlock as possible
- improved bus route explorer
- some UI fixes (popup messages in a few places, moving mouse tooltips to the OSD)
- lots of analytics and time-series plots

0.1.13

- analytics: prebake baseline results properly. hover over plot series. some new modes to see bus network, throughput of a road/intersection over time
- log scale for the speed slider
- add a bulk spawner in freeform mode (F2 on a lane)
- rendering: nicer routes, crosswalks, zoomed car colors
- map data: better stop sign and sidewalk heuristics
- fixed the mac hidpi text rendering issue once and for all?!

0.1.14

- better crosswalk generation when there's only a sidewalk on one side of a road
- edit mode UI revamp: paintbrush-style buttons to apply changes to lanes
- show error messages and prevent edits, like disconnecting sidewalks
- properly ban bikes from highways (revamped rules for vehicles using a lane)
- new freeform mode tool to spawn bikes
- WIP (not working yet): make bikes prefer bike lanes. some debug heatmaps for path cost
- edit mode has proper undo support

0.1.15

- minor bugfixes with reverting lane types, preserving stop signs
- incorporate edits into the challenge splash screen, make sure edits are reset when appropriate
- starting a new challenge mode, just focused on traffic signals
- can't leave traffic signal editor with missing turns
- render pedestrian crowds on building front paths
- traffic signals support an offset parameter
- traffic signal visualization and editing revamped to group related turns together
- can preview traffic using a signal from the editor
- actually apply priority at intersections, so protected turns get first dibs over yield turns

0.1.16

- fix Mac crashing with texture limit bug by switching to texture arrays
- fix crashing simulation when a border intersection was used
- started to implement a new UI design for starting the game

0.1.17

- more work on the pre-game UI, with some flexbox layouting
- prototype a minimap in sandbox mode. doesn't pan or scroll yet.
- prototype a new speed/time control panel from the mockup
- nicer time warp loading screen
- record and show detailed trip timeline, including time to park

0.1.18

- map data: infer more building addresses
- some analytics on how long people spend parking and intersection delay over time
- create an options panel, allowing runtime customization of color scheme, traffic signal rendering, etc
- internal changes to map building pipeline to make it much easier for new devs to onboard
- organizing challenges into sub-stages, starting to flesh out specifics for the fix traffic signal track
- much more realistic pedestrian pathfinding
- fix minimap on mac (dpi issues)
- visual tweaks to cars to make front/back easier to distinguish
- internal change to switch most assets from PNG to SVG

0.1.19

- some challenge modes show a histogram for counting faster/slower trips
- new visualization of current demand per direction at a traffic signal
- implementing some of Yuwen's UI changes: agent counter, split time/speed panel, moved functionality out of the old drop-down menus into a bottom-left tool panel, hiding debug functionality
- replaced right-click context menus with left click to open info panels
- fixed random issues reported by people from HN

0.1.20

- moved some UI functionality around, pulling graphs into info panel
- interactive legend for the minimap, toggle visibility of different agents
- nicer colors and shapes for cars
- misc simulation bugfixes that might help huge_seattle
- pedestrians choose to use transit more realistically, factoring in time for the bus to drive

0.1.21

- switch some analytics dashboards to use buttons, not old non-scrolling menus
- scrollbars... at least a start
- preview traffic signal changes from live sim as the base
- traffic signal preview has normal time/speed controls
- traffic signal editor has undo support
- minimap has buttons to pan

0.1.22

- minimap zoom controls
- traffic signal rendering overhaul
- heatmap colors improved, heatmap appears on minimap
- bus info panel, a start to live delay analytics

0.1.23

- UI revamps: speed panel, minimap controls, heatmap chooser
- bus timeline
- hide internal IDs normally
- limit map zoom
- fix bugs with crosswalks conflicting with vehicle turns

0.1.24

- overhaul traffic signal editor UI, and add redo support
- update main edit mode UI, and add redo support
- limit max unzoom
- fix the infamous HiDPI bug once and for all; minimaps should work everywhere
- almost bug-free support for floating, horizontally and vertically scrolling panels
- overhaul top-center panel, rename scenarios to be less confusing
- expose bus analytics outside of challenge mode
- live info panel can exist during a running simulation
- consolidated agent route/trip information into info panel

0.1.25

- overhauled the tutorial
- tuned top-center panel for sandbox and challenge modes
- make bike and bus lanes more obvious
- show map edits as an overlay anywhere
- tune info panel contents, and show relationships between parked cars and buildings
- fixes to traffic signal editor, like making all-walk conversion idempotent
- nicer throughput and delay plots (sliding windows, grid lines)

0.1.26

- tutorial improved in a few places
- map data: thinner sidewalks, associate buildings with named amenities
- traffic model: vehicles can spawn on all lanes from a border
- much better gameplay speed (previously was too fast)
- UI tuning: lane editor, minimap, signal editor, heatmap legends don't overwrite minimap
- traffic signal challenge communicates score more clearly

0.1.27

- edit mode revamped: click to edit stuff. no more lane paintbrushes. autosaving and save as.
- tutorial: can quit and resume tutorial now
- challenge picking flow simplified
- UI: layouting fixes to full-screen / into stuff, popup menus go beneath buttons, plots improved
- internal change to render all text using vector graphics. other than a few text layouting issues, shouldn't be noticeable, except now tooltips in plots don't get covered up
- misc perf improvements (cache SVGs, drawing many circles for unzoomed agents, dont reload prebaked data)
- upgraded winit, glutin, glium -- hopefully no new bugs introduced on any platforms

0.1.27a

- patch to fix a crash with empty text dimensions on things like building info panels

0.1.28

- all info panels revamped
- some tutorial stages are much more clear, with an updating goal
- traffic signal scorecard generalized to work for some tutorial too
- adjust how selected agents look
- X button on popup menus

0.1.29

- new tool to convert between stop signs and traffic signals
- lane editor easier to edit multiple lanes
- info panels: IDs, mostly avoid horizontal scrolling, better info about trips to/from somewhere, move buttons up
- traffic signal editor UI overhaul
- different data in top-right agent meters panel
- tooltips to communicate keybindings better
- new jump-to-time panel, showing when rush hours occur
- speed controls use more useful speeds
- include ongoing trips in measured trip times
- jump to next challenge after completing one
- lots of tutorial tweaks

0.1.30

- show additional info about traffic patterns and buggy maps
- revamp tutorial UI to group tasks and messages better
- handle different mode transitions when info panel open on an agent
- select entire roads in unzoomed edit mode
- show total time an agent has spent moving / blocked
- use 2-phase traffic signals by default, making the 23rd map successfully complete!
- jump-to-time now optionally points out traffic jams forming
- challenge splash screen improved

0.1.31

- overhauled trip timeline in agent info panels
- overhauled traffic signal details panel and the per-lane turn explorer
- settings page: show all options at once. add way to scale up text/UI elements for high-DPI displays, and an alternate pan/zoom control scheme
- traffic signal edits can now be exported and used in any slice of Seattle. will be using this to hand-map many of them.
- many small tutorial fixes

0.1.32

- some UI work on giving focus to textboxes, improving dropdown menus
- road/intersection plots display baseline sim data too
- start associating people with multiple trips, exposing this a little in the UI
- bring back elevation data, introduce a new overlay. the elevation data is still really bad.

0.1.33

- new "population" overlay, showing people (not just current trips). heatmap and dot map to visualize.
- improved the "delay" overlay to handle roads and intersections
- removed the confusing and useless alternate color schemes for agents
- initial left-hand driving side, tested in Perth, also drawing more arrows for all one-way roads
- loads of internal GUI code refactorings, preparing for a standalone release of the library
- fixed z-buffering and alpha values for web backend

0.1.34

- info panels have been totally overhauled again. multiple tabs, way more clear representation of agents, trips, and people.
- draw people inside of a building
- applied consistent typography everywhere
- lots of internal refactoring

0.1.35

- more info panel work, particularly for trips and buses. change plot settings live.
- prototype of a SEIR pandemic model based on time spent in shared spaces, by orestis
- slight heatmap improvements, more coming
- more typography changes
- mouse cursor now changes for buttons and dragging!
- overhaul minimap controls, make layers behavior zoomed in a little better
- new speed panel and jump-to-time modal

0.1.36

- overhauled simulation data page, with a table to find slow trips and some initial summary visualizations
- plots can change windowing and show/hide series
- layers: fade map to contrast more, better scales/legends
- show relative trip times in info panels
- tools to rewind/ffw to watch particular trips
- refocusing efforts on challenge modes; level 1 of a new one is pretty much ready
- some simulation fixes around parking and a corner case of cars temporarily forming a cycle
- orestis improved the population/pandemic heatmaps

0.1.37

- optimize commute challenge: high score, live sentiment, second stage
- parked cars are owned by people, not buildings
- info panel improvements for trips
- bike layer suggests places where bike lanes could be helpful
- many improvements to scatter plot
- a new histogram-ish thing for understanding faster/slower trips
- handling scenarios longer than 24 hours better (for pandemic model)
- prototype of commute visualization, grouping buildings by blocks
- sim bugfixes: crosswalk / vehicle turn conflicts, start bikes in bike lanes from borders

0.1.38

- major internal changes to ensure people's schedules don't have impossible gaps, to associate fixed bikes/cars to a eprson, handle delayed starts to trips
- parking changes: show path to closest free spot, utilization of a lane over time, every building includes at least 1 offstreet spot by default
- progress on removing unrealistic gridlock: detect turn conflict cycles and temporarily allow conflicts, trim last steps of a laggy head
- internal sim alert system. speeds up debugging, could be used for player-facing "traffic jam!" alerts

0.1.39

- switched to proper OSM-based maps; no more brittle, manual geometry fixes
- more sorting and filtering options in trip table and parking overhead tables
- improve offstreet parking rendering. park closer to destination buildings
- easier process for importing new cities. introducing Los Angeles, Austin, Barranquilla.
- new data updater tool so people can opt-in to new cities
- many internal fixes to prevent gridlock. smarter cycle detection, manual OSM fixes and traffic signal timings

0.1.40

- differential throughput layer to understand routing diversions
- map edits now reference longer-lasting OSM IDs, can work cross-map
- basemap updates: new areas for west seattle, mt baker, lots of upstreamed fixes in OSM and traffic signals, smarter border matching
- parking: optionally filter on/off-street spots in the layer, allow disconnecting spots via edits
- render some tunnels with lower opacity
- new feature to change speed limits and bulk road selection tools
- first write-up of a real use case (closing lake wash through arboretum)
- make the traffic signal challenge act like a game, with a failure/win state and scoring

0.1.40a

- added a mode to map parking

0.1.41

- new parking mapper tool
- include a one-shot .osm importer in the release
- new layer to find different types of amenities / businesses
- adjust traffic signal rendering style
- bulk lane editor for changing speed limits and lane types
- including west seattle and udistrict maps
- include some OSM buildings that were being skipped
- dont pause after opening something from sandbox mode
- adjust turn signals for lane-changing cars
- lots of fixes for monitors with different DPIs, enabled by default

0.1.42

- many misc UI bugfixes, especially for high-DPI screens
- managing turns across multiple nearby intersections: tool to visualize, handling multi-way OSM turn restrictions, using this to ban illegal movements at the pathfinding layer, starting a traffic signal editor variant to edit these
- rendering improvements: unzoomed agent size, visualizing routes on trip table, transparent roads beneath bridges, draw harbor island
- overhauled street/address finder
- parking mapper: shortcut to open bing

0.1.43

- new map picker!
- UI polish: traffic signal editor, layers, bus stops, delay plots
- generate more interesting biographies for people
- tuned all the map boundaries
- fleshing out lots of docs in preparation for the alpha release...

0.1.44

- spawner UI revamped
- model parking lots! and finally model public/private parking
- fix up tutorial
- starting a story map mode

0.1.45

- overhauled challenge cutscenes and hints
- traffic signal challenge: fix score detection, add meter, much faster startup, no reset-to-midnight required
- layers: use gradient for a few, delay comparison, new UI for picker
- overhauled minimap controls, should be intuitive now
- edit mode changelist UI started

0.2.0 (alpha launch)

- road names now shown by default, in a new style
- all layers now use gradients and show up zoomed in. worst traffic jam layer revamped.
- scatter and line plot improvements
- internal UI fixes: proper word wrap
- bugfixes for following people riding the bus
- rainbow crosswalks in one neighborhood
- final polishing for launch

0.2.1

- busy week due to launch, but many new features in the pipeline
- many bug fixes
- edit mode: proper autosave, load proposals, jump between lane/intersection editors
- very first steps on light rail... importing the tracks
- starting a new traffic scenario modifier system, to repeat entire scenario or outright cancel trips for some people. many more ideas for filters and actions coming soon.
- starting to represent private roads
- add a very simple actuated traffic signal

0.2.2

- the default traffic signal configuration is much smarter now, handling roads with some sidewalks missing and automatically synchronizing pairs of adjacent lights
- much faster startup time for large maps
- better UX for handling unsaved edits
- access-restricted zones: changing existing zones almost completely works, except for granting new access to pedestrians
- new sidewalk corner rendering, more rounded
- ui style standardized for margins, padding
- Javed got camera panning when your cursor is at the edge of the screen to work; enable it in settings
- pulling bus stop/route info from OSM, not GTFS. steps towards light rail.
- experimenting with controls for hiding bridges to see roads underneath; try them in dev mode (ctrl+S)
- many bug fixes

0.2.3

- lane geometry is dramatically fixed, especially for one-ways
- importing lanes from OSM improved
- UI: bulk select includes select-along-a-route, show all bus routes in the layer, unzoomed zordering for roads/intersections
- traffic scenario modifier can now convert trip modes
- slight progress on light rail, although the train only makes one stop
- vehicles moving through complex intersections with multiple traffic signals will now make it through multiple lights, even if they're unsynchronized
- new random traffic scenario generator that makes people go between houses and workplaces
- access-restricted zones: granular editing of individual roads now mostly works
- removing the hardcoded relative directories, which many people have been having problems with
- many many bug fixes, and some optimizations to reduce release file size

0.2.4

- bus/train routes overhauled; they're now one-way, regularly spawn every hour, and may begin or end at a border
- new commute pattern explorer tool
- new character art to give cutscenes a bit more personaliy
- some progress on gridlocking maps, both from manual fixes and an attempt to reduce conflicts in multi-turn sequences
- misc UI: show cars seeking parking in unzoomed mode, plot arrival rate at border intersections, consolidate bulk selection controls
- trips modified by an experiment can now be filtered in summaries
- buses, trains, and passengers on them are now properly distinguished in different stats
- include krakow and berlin in release
- buildings with holes in the middle are now rendered properly

0.2.5

- cars pick lanes better
- overhaul bus/stop/route info panels
- UI: better autocomplete, commuter pattern improvements by Michael, toggles instead of checkboxes, contours for heatmaps, edit mode loader revamp
- internal refactors: turn creation, osm tags, osm parsing
- import living streets from OSM as restricted-access zones, and other importer tweaks for berlin, krakow, san jose, sydney

0.2.6

- many roads without sidewalks now have a tiny shoulder lane, still enabling pedestrian movement, but with a penalty
- bike trips will stop/start at a better position along the sidewalk now
- support parking lanes on the off-side of a one-way
- UI: search by building names, commuter patterns shows borders better
- transit: make people ride off-map, spawn buses on short roads
- internal cleanups for buttons

0.2.7

- many intersections with on/off ramps have much better geometry
- lane-changing banned on turn lanes
- lots more work matching bus stops/routes to the map. some progress, also some regressions.
- fixing spawning on tiny borders
- bus spawn rates from GTFS for seattle. started an editor for the schedule.
- internal ezgui refactorings

0.2.8

- multiple traffic signals can now be synchronized and edited together
- new dashboard for "traffic signal demand" over the entire day and map
- started experimenting with controlling the headless runner via a JSON API
- epic ezgui fix by Michael to consolidate handling of HiDPI scaling
- got a bunch of huge cities importing and loading quickly
- you can now save the trips you manually spawn in freeform mode, then replay them later

0.2.9

- import Xi'an, add a Chinese font, and add a tool for that group to import their external demand data
- control A/B Street through a graphics-less API, with a Python example
- improve UI for per-direction traffic signal demand
- on/off ramp geometry fixed in a few more cases
- fix some missing parking lot aisles, handle parking lots with 0 spots, and extract parking garages from OSM
- switch road/building language in settings, if OSM data exists
- congestion capping prototype: declare a max number of vehicles that can pass through a zone per hour, view/edit it, and very simple implementation in the sim layer
- add custom-drawn trips to the main scenario, for exploring new demand from a new building
- mkirk fixed up the glow/wasm ezgui backends, letting us remove glium
- make map edit JSON backwards compatible
- better lane/turn markings

0.2.10

- two-way cycletracks and arbitrary direction changes for roads
- fix map editing for lane reversals, make edits backwards compatible, and massively speed up applying edits
- fleshing out the headless API and tooling for controlling the simulation from any language
- import a few more places, redo left-hand driving support so far
- various bug/performance fixes

0.2.11

- disabled support for editing the map without resetting the simulation. needs more work, but solid start.
- improvements to API, activity model, congestion capping
- small UI tweaks for parking, editing multiple signals
- fixed last bugs for left-handed driving, should work just as well now
- lots of graphics experiments from the hackathon, not merged yet

0.2.12

- new textured color scheme and isometric buildings, in settings
- new layer to show how far away people parked
- Massive UI overhauls: jump to time/delay, edit mode, traffic signal editor (now with offsets), lane editor, bulk lane edit, traffic signal demand (individual intersections and all), loading screen
- the Go API example compares trip times and detects gridlock
- infinite parking mode
- show how long a car has been parked in one spot
- bugfix for some pathfinding costs around uber-turns
- start to show a trip's purpose

0.2.13

- alleyways from OSM imported
- traffic signal minimum time now constrained by crosswalks; thanks Sam!
- UI changes in progress for trip tables, summaries, bulk edit
- more API / Python example work for congestion capping
- bug fixes: isometric buildings, documentation links, dropdown widgets, turn restrictions

0.2.14

- improve turn generation, with goldenfile tests
- UI adjustments: unzoomed routes, better delay layer, include reasons for cancelled trips, throughput layer counts
- small map importing fixes: multipolygon parking lots
- fix infinite parking and blackholed buildings

0.2.15

- large internal change allowing asynchronously loading extra files over HTTP for web
- the release of the first web version!
- cars looking for parking now have a "thought bubble" showing this, by Michael
- slow sections of a trip are now shown in the info panel, by Sam
- fix by Michael for handling window resizing in panels
- fix original routes on edited maps
- internal code organization and documentation

0.2.16

- UI: click unzoomed agents, switch between metric/imperial units, show reason for cancelled trips, new "faded zoom" color scheme based on mapbox, more detailed agent counts in the top-right panel's tooltips
- started a new dedicated OpenStreetMap viewer, will split out from A/B Street later
- fix alpha colors on web
- bugfixes for the new asynchronous map loading
- some substantial simulation performance gains (168s to 90s on one benchmark!)
- lots of progress towards editing the map without resetting the simulation to midnight. please test with --live_map_edits and report any issues
- internal refactoring and code documentation

0.2.17

- tooling to automatically extract different shapes around cities without an explicit bounding polygon
- imported many maps for an OSM viewer demo
- misc bug fixes, UI tweaks, and perf improvements, especially for the web version
- start using OSM sidewalks data properly in krakow -- more work needed, but better start

0.2.18

- overhaul data/system management: switch from Dropbox to S3, reorganize files, add an in-game updater
- started a UI for collision dataviz, with data in the UK and Seattle
- improve turns between separate footways
- simplify the process of importing a new city

0.2.19

- added experimental day/night support; run with --day_night
- slight performance improvements by avoiding applying no-op edits
- new tests for lane-changing behavior, used to more safely allow more realistic behavior blocking "degenerate" intersections
- experimenting with filling in gaps between one-way roads, to represent medians

0.2.20

- prototyped a new 15-minute neighborhood tool
- overhaul internal simulation input code -- better performance, way simpler
- debug tool to record traffic around a few intersections and replay later

0.2.21

- split separate tools into their own executables
- misc bug fixes and other refactoring, focused on GUI code mostly
- most of a prototype done for an experiment
- map added for north seattle

0.2.22

- vehicles will lane-change less erratically during uber-turns (sequences of turns through multiple traffic signals close together)
- debug mode has a "blocked-by graph" tool to understand dependencies between waiting agents
- try multiple OpenGL video mode options if the first choice fails (thanks Michael!)
- refactoring trip starting code and the minimap
- non-Latin fonts now supported on web too, thanks to rustybuzz release
- new small maps in Seattle included in the release, and NYC added to optional cities
- saving some player state on the web (mostly camera position per map, for the main game)
- partial prototype of a new census-based scenario generator, thanks to help from the Amazon SSPA hackathon
- significant progress on the experiment, about one week left...

0.2.23

- released the 15-minute Santa experiment!
- trip info panels now show more continuous progress along a route
- fixing inactive buttons stretching too much

0.2.24

- variable traffic signal timing, thanks to Bruce
- 15 min explorer: more walking options (require shoulders, change speed), more organized business search
- 15 min santa: remember upzoning choices
- misc bugfixes and refactoring
- 2021 roadmap drafted

0.2.25

- huge breakthrough on merging intersections to handle short roads. applied to just a few places so far
- support one-way roads with default traffic signal heuristics
- 15 min explorer: find residences close to user-specified businesses, see unwalkable roads
- bugfix from Bruce to prevent sim from crashing when a short road is over capacity
- automatically fetch census data for any US map and use for scenario generation, from Michael
- some initial experiments to bring A/B Street's lane rendering to the web using Leaflet

0.2.26

- dramatically improve initial web loading and be able to start with any map
- city picker UI now better organizes other regions with many maps
- new tool to convert SUMO networks into A/B Street maps
- taking screenshots of the entire map now much faster, portable. trying to use for Leaflet raster tiles, but not working yet.
- widgetry UI library now doesn't depend on anything specific to A/B Street
- internal refactoring for error handling

0.2.27

- dramatically speed up starting scenarios by deferring when public transit riders pick their route
- start importing separate cyclepaths and pedestrian plazas for Cambridge, many adjustments to make these start working
- full panel for picking a scenario to start
- import trip data from the actdev project for Cambridge
- improve inferred map elements (stop signs and crosswalks) near short roads
- heuristics for automatically finding and merging short roads. disabled, but solid start

0.2.28

- massive button overhaul by Yuwen and Michael
- the color scheme automatically switches between day/night based on simulation time!
- significant progress on editing the map without resetting the simulation
- various bugfixes, new maps, improvements to running the importer, faster updater

0.2.29

- new map, Rainier Valley, is the 3rd ever to finish without gridlock! One of the fixes was collapsing traffic circles into a normal intersecton
- bugfixes for map importing: cycleways with left-handed driving, matching traffic signals, odd number of lanes, u-turns
- further fixes after the great button refactor

0.2.30

- split documentation into a separate git repo
- UI: filter throughput layer by mode, render stop signs better
- started a debug tool to live-tune routing parameters and see the effects on a single route or all trips
- Michael improved the web loading screen and added webgl1 support for ios browsers
- cars looking for parking now randomize a bit, eliminating the unrealistic "parking snakes/parades" effect
- Bruce fixed a critical bug with uber-turns, helping ease gridlock in some maps
- new tool to procedurally generate houses along empty residential roads, useful when OSM is missing most data

0.2.31

- loads of work integrating abstreet with the actdev project, and importing tons of maps
- new tool to find the geofabrik OSM source best fitting a boundary
- fix crosswalks and traffic signal policies in left-handed driving countries
- fix initial zoom when starting with flags to copy the viewport from OSM
- Bruce added lagging green signal heuristics
- make it easier to click tiny bikes and pedestrians
- change the URL in the web version as you change maps/scenarios
- split the list of cities by country, and improved the UI for picking a place

0.2.32

- easier to share web URLs with the current viewport
- more actdev integration work
- misc bugfixes, especially with uber-turns and the city picker UI
- revived the map_editor tool for drawing small test maps and iterating faster on merging intersection geometry

0.2.33

- import service roads and separate cyclepaths in all maps!
- brand new day theme, designed by Yuwen and implemented by Michael!
- improved rendering where sidewalks and shoulders of roads meet
- fix overlapping panels on HiDPI screens with low resolution
- prototype of loading abst in the background on a webpage
- adjusted routing, penalizing unprotected left turns onto bigger roads, which often contribute to gridlock
- fixed some turn restrictions at merged intersections
- widgetry: change fonts mid-line, dynamically load extra fonts (for a Taipei map)

0.2.34

- new travel demand generator using UK origin/destination data
- the 15m and OSM viewer web apps also have nicer URLs now
- 2 more seattle maps complete without gridlock!
- less seattle maps bundled with the release by default, to keep file size sane
- many UI changes for the actdev integration, pending rollout to abst generally
- initial experiments with implementing lane over-taking and road-based pathfinding

0.2.35

- vast improvements to roundabouts, gridlock, and ordering at stop signs
- consolidated UI panels in simulation modes; should work much better for smaller screens
- measure intersection delay more intuitively
- use straight lines for right/left turns at small intersections
- various bugfixes and small UI improvements
- started a tool to import from OSM without the command line; should be ready next week

0.2.36

- released a new tool to import anywhere from OSM from within the game!
- UI: finished trips meter, consolidated agent counters on minimap, move layers to the left for small screens, new tab style, use new day colorscheme in other apps
- fixed a bug with comparing the route somebody took before/after changes
- start integrating Eldan's elevation data and reviving parts of the UI that use the data
- better routing into/out of access-restricted neighborhoods

0.2.37

- import elevation data for Seattle!
- add layers showing steep streets, elevation contours, and show elevation profile for bike/pedestrian routes
- faster, simpler pathfinding for access-restricted zones
- faster map importer and some UI fixes

0.2.38

- change walking and biking speed based on elevation
- import elevation data for all maps -- though there may still be quality issues
- filter trip table by start/end location on the map
- Michael made the web deployment much more flexible, in preparation for a blog post

0.2.39

- massive internal change to make pathfinding use roads, not lanes. paves the way for many exciting things, like...
- changing the number and width of lanes per road! WIP, debug mode-only UI for now

0.2.40

- fix bugs running the importer
- import grid2demand scenarios from the UI
- implement more of road widening internals
- new --minimal_controls option by Michael for screencasts
- ran the first UX study in a long time, lots of feedback on the tutorial and traffic signal editor

0.2.41

- first prototype of the new road editor!
- much easier way to download new cities -- just try to open a map you don't yet have. much smaller .zip release now
- track two "risk exposure" events -- when cars want to overtake cyclists, and passing through a large intersection -- and start to show data on trip panels, a new "problem map" layer, and a WIP summary dashboard
- better geometry for some merged intersections, and applying the algorithm all around Tempe
- another UX study and some tutorial UX fixes

0.2.42

- improvements to experimental road editor
- 2 more UX studies and a slew of small fixes

0.2.43

- starting to import GMNS traffic signal timing. this will eventully let us import from Synchro!
- more work on the new road editor, but still not ready. lane widths are now more varied and realistic.
- Trevor overhauled the OSM amenity categories and added a multi-source isochrone to the 15m tool to find places without access to some amenity
- partial work running the map importer in a Docker container, to eventually speed up the import process in the cloud
- signal editor UI adjustments
- time warp UI fixes and a new risk exposure contingency matrix by Michael
- internal code cleanup using clippy, by Vinzent

0.2.44

- experimental road editor finally released! more improvements still planned
- save/restore settings (like camera angle and units) between sessions
- Michael improved performance of scrolling panels
- Michael adding more dataviz to travel time and risk exposure dashboards
- regenerating all maps now happens on the cloud -- faster and less harmful to my poor laptop
- exploring some debug tools and strategies for consolidating intersections

0.2.45

- map importing fixes: multiple left/right turn lanes, combo bus/turn lanes, tidy up degenerate intersections along cyclepaths, allow explicitly tagged U-turns, better stop sign placement heuristics
- in Seattle, snap trips entering/leaving map through borders more carefully
- prebake data to cover trips starting near midnight. down from about 3000 cancelled trips in montlake to 300
- road editor UI: explain disabled actions
- Michael added new "arterial crossing" risk for pedestrians
- improved GMNS signal timing importer

0.2.46

- lots of internal writing, presentations... not quite ready for an audience yet
- fixed weird turn lane arrows
- GMNS signal import now works for many intersections, thanks to crosswalk inference
- road editor UI fixes
- speed up starting a simulation with infinite parking
- possible breakthrough with intersection consolidation

0.2.47

- simulation speedup by storing turns better
- new website/docs maybe halfway done
- sped up rust build process
- improved some geometry around Tempe
- fix broken screenshot diff test
- trevor added the "cloud of uncertainty" in the 15m tool to show borders

0.2.48

- vehicles will now dynamically change lanes to pass slower traffic! in limited cases only.
- vehicles can now exit a building's driveway and immediately cut across a few lanes
- new UI tool to easily find when trips start
- fix some crashes related to widening roads

0.2.49

- vehicles can exit driveways in either direction!
- bugfixes with lane-changing, time-warping, settings, nondeterministic z-ordering, changing speed limits
- speed up edit mode on large maps
- loading maps on native now sees locally imported maps
- smaller files across the board by serializing f64s as integers
- map data quality: greenlake cycletrack, better stop sign placement, crosswalks at consolidated intersections
- risk exposure matrix labels
- keep cars out of bus lanes with better costing

0.2.50

- UI: improve elevation profiles, add road editor revert button, thought bubbles for people climbing steep inclines
- fixed signal timing for 3-ways
- fixed a race condition with two vehicles going for the same offstreet parking
- fixing pedestrian speeds on inclines
- improved relative positons of adjacent lanes on curvy roads
- internal speedups for map importing and a tool to compare two maps, for intersection consolidation
- let lane-changing happen in more cases (when vehicle1 wants to pass vehicle2, but can't until a few lanes later)
- add a mode to import a region-wide map without local roads
- internal pathfinding refactor to switch between contraction hierarchies & Dijkstra more flexibly, reduce duplicate higher-level input graph logic

0.2.51

- special mid-week release to support a blog post
- using infinite parking for the arboretum scenario
- add y axis to trip time dashboard
- faster OSM import using overpass
- internal tools for working on intersection consolidation and cyclepath snapping

0.2.52

- started a mode shift dashboard
- individual trips can be explored from the risk exposure dashboards now
- fixed actdev scenarios
- web file loaders now show progress
- performance improvements for editing roads
- various bug fixes

0.2.53

- new intersection consolidation algorithm, applied around Seattle and Tempe with really great results!
- Seattle fixes: deduplicating cycletracks, connecting Arboretum bike paths
- add new lane types to express buffers for protected bike lanes
- better neighborhood shapes by Michael, in the commuter patterns layer
- fixed Overpass imports, which were missing border intersections

0.2.54

- brand new day mode color scheme!
- road editor automatically adjusts lane width, and other small UI fixes
- show bike network gaps in the mode shift dashboard
- progress on snapping cyclepaths, representing buffers, fixing up nearby geometry
- fixed crosswalks for consolidated intersections on left-handed maps

0.2.55

- more progress on cycleway snapping, but still not ready
- road editor sets new lane width better
- load proposals picks a better order
- a new experiment unfolding...

0.2.56

- releasing a new tool dedicated to planning bike networks!
- massive overhaul to the road editor, including lane cards that can be both dragged AND dropped
- new road labeling in unzoomed mode
- new tool to quickly sketch roads to edit
- new tool to plan routes and see elevation/road types along the way
- load previously saved proposals on web
- disabled prototype: uploading proposals to a central server for easier sharing

0.2.57

- bike network tool UI fixes, especially for the routing tool
- use drag and drop for traffic signal editor and route waypoints
- small internal map model performance boost
- heavy documentation week

0.2.58

- dramatically improve time to recalculate pathfinding
- deploy raw map editor to web, to support a long-form article: https://a-b-street.github.io/docs/tech/map/geometry/index.html
- long-form article about the simulation: https://a-b-street.github.io/docs/tech/trafficsim/discrete_event/index.html
- small fixes to ungap route tool

0.2.59

- bike network's route tool: naming saved routes, showing details about the route
- switch from s3 to cloudfront CDN; all downloads should be faster
- further pathfinding performance improvements
- fix bike quick sketch tool in left-handed maps
- consolidate tools into a single CLI and include it in the release

0.2.60

- incorporated a configurable mode shift and carbon emissions model with the bike network tool
- partially implemented Mara's UX changes to the bike tool
- improved UI map importing: no more overwriting, and naming new maps
- prototyped a new low-traffic neighborhood / rat-run tool

0.2.61

- bike network tool now shows alternate routes
- small fixes to mode shift and LTN tool
- major internal UI refactors started

0.2.62

- ungap the map bike network tool launched! bike.abstreet.org has documentation and videos
- uploading and sharing proposals now works!
- super speedup to applying map edits

0.2.63

- ungap: consolidate editing controls
- workaround some bugs loading map edits
- ungap: add ability to compare a trip before/after some proposed changes
- ungap: make the high-stress metric handle one side of a road missing bike lanes
- ungap route sketcher easier to use when zoomed far out
- ui fixes: units in barrier type, dropdowns focus-fighting with drag-drop cards
- perf: smaller city overview maps

0.2.64

- new algorithms to find and render city block and neighborhoods. almost ready for use in main applications
- fixed the worst of curb rendering bugs
- new mapbox gl + abstreet demo
- adding command-line --help to most programs

0.2.65

- rewrote the low-traffic neighborhood prototype. neighborhood detection much better, internal streets grouped into traffic cells, two rendering styles for cells. browsing rat runs not ready yet, disabled
- new shared title screen, to switch easily between all A/B Street apps

0.3.0 (major release)

See https://a-b-street.github.io/docs/project/history/retrospective/index.html for a look back on the project so far. I started https://github.com/sponsors/dabreegster to fundraise for a full-time Rust developer.

- added basic routing to LTN tool
- roads with modal filters belong to two traffic cells
- progress on LTN rat run detection, but still not ready
- new option to use OSM crossing nodes to model unmarked foot crossings
- better road label placement

0.3.1

- no right turn at red lights, in most of the world. thanks Marcel!
- simplify map importing config
- some fixes to OSM crosswalk matching
- placing LTN modal filters more intuitively
- change level of traffic assumptions in LTN pathfinder. thanks Andrew!
- diagonal modal filters for LTNs

0.3.2

- render one-way markings as outlines by Marcel
- few fixes, mostly just importing some new places
- the project lead has moved to London ;)

0.3.3

- bus routes now imported for Seattle and SF, from GTFS
- fix "bowtie" intersection shapes, resulting from incorrect clockwise ordering
- few small OSM data fixes for London and Leeds
- fix crash when customizing a route in Ungap the Map

0.3.4

- draw custom boundaries for LTNs (but can't yet save the boundaries)
- rendering modal filters better when zoomed in
- v3 of a rat-run detector, and showing a heatmap of quiet/busy streets
