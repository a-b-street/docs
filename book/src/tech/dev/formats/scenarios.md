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

This defines a scenario containing a single person, who takes two trips. They
begin at midnight at the building nearest to the `origin`, then at 3AM (`10800`
is seconds after midnight), they drive to the building nearest to the
`destination`. Then an hour later (`14400`), they walk to another location
(quite far away -- I made up the `destination` coordinates). Note that the
`destination` of trip 1 must match the `origin` of trip 2.

The `mode` field could also be `Walk`, `Bike`, or `Transit`. The `purpose`
field is mostly unused; you could pick [other
values](https://a-b-street.github.io/abstreet/rustdoc/sim/enum.TripPurpose.html)
that show up in the UI. And of course, you can add as many people as you like.

```
{
  "scenario_name": "monday",
  "people": [
    {
      "trips": [
        {
          "departure": 10800.0,
          "origin": {
            "Position": {
              "longitude": -122.303723,
              "latitude": 47.6372834
            }
          },
          "destination": {
            "Position": {
              "longitude": -122.3075948,
              "latitude": 47.6394773
	    }
          },
          "mode": "Drive",
          "purpose": "Shopping"
        },
        {
          "departure": 14400.0,
          "origin": {
            "Position": {
              "longitude": -122.3075948,
              "latitude": 47.6394773
	    }
          },
          "destination": {
            "Position": {
              "longitude": -123.3075948,
              "latitude": 46.6394773
	    }
          },
          "mode": "Walk",
          "purpose": "Leisure"
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

## Future requests

- A way to specify some kind of numeric ID for each person, so you can later
  correlate results from the simulation with your input
