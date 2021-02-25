# Scenario data format

If you want to import your own
[travel demand model](../../trafficsim/travel_demand.md), you can use this JSON
file.

## Specification

Until we switch to using protobufs or similar, there's no formal spec. The JSON
deserialization happens from
[Rust code](https://github.com/a-b-street/abstreet/blob/master/sim/src/make/external.rs).
It's easiest to follow the example below.

## Example

This defines a scenario containing a single person, who takes one trip. They
begin at midnight at the building nearest to the `origin`, then at 3AM (`10800`
is seconds after midnight), they drive to the building nearest to the
`destination`. The `mode` field could also be `Walk`, `Bike`, or `Transit`. The
`purpose` field is mostly unused; you could pick
[other values](https://a-b-street.github.io/abstreet/rustdoc/sim/enum.TripPurpose.html)
that show up in the UI. You could add more trips to this person, with increasing
departure time. And of course, you can add as many people as you like.

```
{
  "scenario_name": "monday",
  "people": [
    {
      "origin": {
        "Position": {
          "longitude": -122.303723,
          "latitude": 47.6372834
        }
      },
      "trips": [
        {
          "departure": 10800.0,
          "destination": {
            "Position": {
              "longitude": -122.3075948,
              "latitude": 47.6394773
	    }
          },
          "mode": "Drive",
          "purpose": "Shopping"
        }
      ]
    }
  ]
}
```

## Tools

To import this JSON file into A/B Street:

```
cargo run --bin import_traffic -- --map=data/system/us/seattle/maps/montlake.bin --input=/path/to/input.json
```

This tool matches input positions to the nearest building, within 100 meters. If
the point lies outside the map boundary, it's snapped to the nearest map border.
The tool will fail if any point doesn't match to a building. If you pass
`--skip_problems`, those people will be logged and skipped instead.

There are also a few tools that produce this JSON file:

- <https://github.com/a-b-street/abstreet/blob/master/headless/examples/generate_traffic.py>
- <https://github.com/dabreegster/grid2demand/blob/scenario_script/src/demand_to_abst_scenario.py>

## Future requests

- A way to specify some kind of numeric ID for each person, so you can later
  correlate results from the simulation with your input
- A way to specify the purpose of a trip (unused for now, in the distant future
  may affect willingness to pay tolls)
