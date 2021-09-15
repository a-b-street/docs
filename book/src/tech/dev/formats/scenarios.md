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
begin at 1 second past midnight (`10000`) at the building nearest to the
`origin`, 'find' a bike and cycle to the `destination`. Then at 12:20
(`12000000` is `1200` seconds after midnight), they walk to the building nearest
to the `destination`. Note that the `destination` of trip 1 must match the
`origin` of trip 2.

The `mode` field can be be `Walk`, `Bike`, or `Transit`. The `purpose` field is
mostly unused; you could pick
[other values](https://a-b-street.github.io/abstreet/rustdoc/sim/enum.TripPurpose.html)
that show up in the UI. And of course, you can add as many people as you like.

```
{
  "scenario_name": "minimal",
  "people": [
    {
      "trips": [
        {
          "departure": 10000,
          "origin": {
            "Position": {
              "longitude": -122.303723,
              "latitude": 47.6372834
            }
          },
          "destination": {
            "Position": {
             "longitude": -122.3190500,
              "latitude": 47.6378600
        }
          },
          "mode": "Bike",
          "purpose": "Meal"
        },
        {
          "departure": 12000000,
          "origin": {
            "Position": {
             "longitude": -122.3190500,
              "latitude": 47.6378600
        }
          },
          "destination": {
            "Position": {
              "longitude": -122.3075948,
              "latitude": 47.6394773
        }
          },
          "mode": "Walk",
          "purpose": "Recreation"
        }
      ]
    }
  ]
}
```

## Tools

To import this JSON file into A/B Street:

```
cargo run --release --bin cli -- import-scenario --map=data/system/us/seattle/maps/montlake.bin --input=/path/to/input.json
```

Then run the game as follows:

```
cargo run --bin game -- --dev data/system/us/seattle/maps/montlake.bin
```

You will need to select the senario with the user interface.

This tool matches input positions to the nearest building, within 100 meters. If
the point lies outside the map boundary, it's snapped to the nearest map border.
The tool will fail if any point doesn't match to a building. If you pass
`--skip_problems`, those people will be logged and skipped instead.

There are also a few tools that produce this JSON file:

- <https://github.com/a-b-street/abstreet/blob/master/headless/examples/generate_traffic.py>
- <https://github.com/a-b-street/abstr>

## Future requests

- A way to specify some kind of numeric ID for each person, so you can later
  correlate results from the simulation with your input
