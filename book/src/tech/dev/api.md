# API

Suppose you're tired of manually fiddling with traffic signals, and you want to
use machine learning to do it. You can run A/B Street without graphics and
automatically control it through an API.

## Examples

This
[Python example](https://github.com/a-b-street/abstreet/blob/master/headless/examples/python_client.py)
has everything you need to get started.

See
[all example code](https://github.com/a-b-street/abstreet/tree/master/headless/examples)
-- there are different experiments in Go and Python that automate running a
simulation, measuring some metric, and making a change to improve the metric.

## Control flow

The `headless` API server that you run contains a single map and simulation at a
time. Even though you can theoretically have multiple clients make requests to
it simultaneously, the server will only execute one at a time. If you're trying
to do something other than use one script to make API calls in sequence, please
get in touch, so we can figure out something better suited to your use case.

When you start the `headless` server, it always loads the `montlake` map with
the `weekday` scenario. The only way you can change this is by calling
`/sim/load`. For example:

```
curl http://localhost:1234/sim/load -d '{ "scenario": "data/system/us/seattle/scenarios/downtown/monday.bin", "modifiers": [], "edits": null }' -X POST`
```

You can also pass flags like `--infinite_parking` to the server to control
[SimOptions](https://a-b-street.github.io/abstreet/rustdoc/sim/struct.SimOptions.html).
These settings will apply for the entire lifetime of the server; you can't
change them later.

## API details

> **Under construction**: The API will keep changing. There are no backwards
> compatibility guarantees yet. Please make sure I know about your project, so I
> don't break your client code.

For now, the API is JSON over HTTP. The exact format is unspecified, error codes
are missing, etc. A summary of the commands available so far:

- **/sim**
  - **GET /sim/reset**: Reset all temporary map edits and the simulation state.
    The trips that will run don't change; they're determined by the scenario
    specified by the last call to `/sim/load`. If you made live map edits using
    things like `/traffic-signals/set`, they'll be reset to the `edits` from
    `/sim/load`.
  - **POST /sim/load**: Switch the scenario being simulated, and also optionally
    sets the map edits.
  - **GET /sim/load-blank?map=data/system/gb/london/maps/southwark.bin**: Switch
    to a different map, loading a blank simulation.
  - **GET /sim/get-time**: Returns the current simulation time.
  - **GET /sim/goto-time?t=06:30:00**: Simulate until 6:30 AM. If the time you
    specify is before the current time, you have to call **/sim/reset** first.
  - **POST /sim/new-person**: The POST body must be an
    [ExternalPerson](https://a-b-street.github.io/abstreet/rustdoc/sim/struct.ExternalPerson.html)
    in JSON format.
- **/traffic-signals**
  - **GET /traffic-signals/get?id=42**: Returns the traffic signal of
    intersection #42 in JSON.
  - **POST /traffic-signals/set**: The POST body must be a
    [ControlTrafficSignal](https://a-b-street.github.io/abstreet/rustdoc/map_model/struct.ControlTrafficSignal.html)
    in JSON format.
  - **GET /traffic-signals/get-delays?id=42&t1=03:00:00&t2=03:30:00**: Returns
    the delay experienced by every agent passing through intersection #42 from
    3am to 3:30, grouped by direction of travel.
  - **GET /traffic-signals/get-cumulative-thruput?id=42**: Returns the number of
    agents passing through intersection #42 since midnight, grouped by direction
    of travel.
  - **GET /traffic-signals/get-all-current-state**: Returns the current state of
    all traffic signals, including the stage timing, waiting, and accepted
    agents.
- **/data**
  - **GET /data/get-finished-trips**: Returns a JSON list of all finished trips.
    Each tuple is (time the trip finished in seconds after midnight, trip ID,
    mode, duration of trip in seconds). The mode is a string like "Walk" or
    "Drive". If the trip was cancelled for any reason, duration will be null.
  - **GET /data/get-agent-positions**: Returns a JSON list of all active agents.
    Vehicle type (or pedestrian), person ID, and position is included.
  - **GET /data/get-road-thruput**: Returns a JSON list of (road, agent type,
    hour since midnight, throughput for that one hour period).
  - **GET /data/get-blocked-by-graph**: Returns a mapping from agent IDs to how
    long they've been waiting and why they're blocked.
  - **GET /data/trip-time-lower-bound?id=123**: Returns a reasonable lower bound
    for the total duration of trip 123, in seconds. The time is calculated
    assuming no delay at intersections, travelling full speed along every road,
    and using the primary mode for the entire trip (so just driving).
  - **GET /data/all-trip-time-lower-bounds**: The faster equivalent of calling
    `/data/trip-time-lower-bound` for every trip in the simulation.
- **/map**
  - **GET /map/get-edits**: Returns the current map edits in JSON. You can save
    this to a file in `data/player/edits/city_name/map_name/` and later use it
    in-game normally. You can also later run the `headless` server with
    `--edits=name_of_edits`.
  - **GET /map/get-edit-road-command?id=123**: Returns an object that can be
    modified and then added to map edits.
  - **GET /map/get-intersection-geometry?id=123**: Returns a GeoJSON object with
    one feature for the intersection and a feature for all connecting roads. The
    polygon coordinates are measured in meters, with the origin centered at the
    intersection's center.
  - **GET /map/get-all-geometry**: Returns a huge GeoJSON object with one
    feature per road and intersection in the map. The coordinate space is WGS84.
  - **GET /map/get-nearest-road?lat=1.23&lon=4.56&threshold_meters=100**: Snaps
    a point to the nearest road center line, and returns the RoadID.

## Working with the map model

If you need to deeply inspect the map, you can dump it to JSON:

```
cargo run --release --bin cli -- dump-json data/system/us/seattle/maps/montlake.bin > montlake.json
```

See some example code that
[reads this JSON and finds buildings](https://github.com/a-b-street/abstreet/blob/master/headless/examples/generate_traffic.py).

You could also edit the map JSON, convert it back to binary, and use it in the
simulation. This isn't recommended generally, but one possible use case could be
tuning the amount of offstreet parking per building. The map JSON has a list
called `buildings`, and each object there has a field `parking`. You coud set
this object to `{ "Private": [100, false] }` to indicate 100 parking spots, for
a building not explicitly designated in OpenStreetMap as a garage. After editing
the JSON, you have to convert it back to the binary format:

```
cargo run --release --bin cli -- import-json-map --input=montlake.json --output=data/system/us/seattle/maps/montlake_modified.bin`
```

The format of the map isn't well-documented yet. See the
[generated API docs](https://a-b-street.github.io/abstreet/rustdoc/map_model/index.html)
and [the map model docs](../map/index.md) in the meantime.

## Working with individual trips

You can use the **/sim/new-person** API in the middle of a simulation, if
needed. If possible, it's simpler to create a Scenario as input.

## Working with Scenarios

You can
[import trips from your own data](../trafficsim/travel_demand.md#custom-import).

You can also generate different variations of one of the
[demand models](../trafficsim/travel_demand.md#proletariat-robot) by specifying
an RNG seed:

```
cargo run --release --bin cli -- random-scenario --rng=123 --map=data/system/us/seattle/maps/montlake.bin --scenario_name=home_to_work
```

You can also dump Scenarios (the file that defines all of the people and trips)
to JSON:

```
cargo run --release --bin cli -- dump-json data/system/us/seattle/scenarios/montlake/weekday.bin > montlake_weekday.json
```

You can modify the JSON, then put the file back in the appropriate directory and
use it in-game:

```
cargo run --bin game -- --dev data/system/us/seattle/scenarios/montlake/modified_scenario.json
```

The Scenario format is [documented here](formats/scenarios.md).
