# Travel demand

A/B Street simulates people following a schedule of trips over a day. A single
_trip_ has a start and endpoint, a departure time, and a mode. Most trips go
between buildings, but the start or endpoint may also be a border intersection
to represent something outside the map boundaries. The mode specifies whether
the person will walk, bike, drive, or use transit. Without a good set of people
and trips, evaluating some changes to a map is hard -- what if the traffic
patterns near the change aren't realistic to begin with? This chapter describes
where the travel demand data comes from.

## Scenarios

A _scenario_ encodes the people and trips taken over a day. See the
[code](https://github.com/a-b-street/abstreet/blob/master/sim/src/make/scenario.rs).

See [here](parking.md#seeding-cars) for details how vehicles are initially
placed and used by the driving trips specified by the scenario.

## Data sources

### Seattle: Soundcast

Seattle luckily has the Puget Sound Regional Council, which has produced the
[Soundcast model](https://www.psrc.org/activity-based-travel-model-soundcast).
They use census stats, land parcel records, observed vehicle counts, travel
diaries, and lots of other things I don't understand to produce a detailed model
of the region. We're currently using their 2014 model; the 2018 one should be
available sometime in 2020. See the
[code](https://github.com/a-b-street/abstreet/tree/master/importer/src/soundcast)
for importing their data.

TODO:

- talk about how trips beginning/ending off-map are handled

### Berlin

This work is [stalled](https://github.com/a-b-street/abstreet/issues/119). See
the
[code](https://github.com/a-b-street/abstreet/blob/master/importer/src/berlin.rs).
So far, we've found a population count per planning area and are randomly
distributing the number of residents to all residential buildings in each area.

### Proletariat robot

What if we just want to generate a reasonable model without any city-specific
data? One of the simplest approaches is just to spawn people beginning at
residential buildings, make them go to some workplace in the morning, then
return in the evening. OpenStreetMap building tags can be used to roughly
classify building types and distinguish small houses from large apartments. See
the `proletariat_robot`
[code](https://github.com/a-b-street/abstreet/blob/master/sim/src/make/activity_model.rs)
for an implementation of this.

### Census Based

Trips are distributed based on where we believe people live. For the US, this
information comes from the US Census. To take advantage of this model for areas
outside the US, you'll need to add your data to the global `population_areas`
file. This is one huge file that is shared across regions. This is more work up
front, but makes adding individual cities relatively straight forward.

See
[the code](https://github.com/a-b-street/abstreet/blob/master/popdat/src/lib.rs)
for the very simple activity model using the census data.

#### Preparing the `population_areas` file

See
[this script](https://github.com/a-b-street/abstreet/blob/master/popdat/scripts/build_population_areas.sh)
for updating or adding to the existing population areas. Once rebuilt, you'll
need to upload the file so that popdat can find it.

### Grid2Demand

Collaborators at ASU are creating
<https://github.com/asu-trans-ai-lab/grid2demand>, which does the traditional
four-step trip generation just using OSM as input. The output of this tool can
be directly imported into A/B Street. From the scenario picker, choose "Import
Grid2Demand data" and select the `input_agents.csv` file.

### abstr

[Robin Lovelace](https://www.robinlovelace.net/) is working on an
[R package](https://a-b-street.github.io/abstr/) to transform aggregate desire
lines between different zones into A/B Street scenarios.

### Desire lines (for the UK)

The UK has origin/destination (aka desire line) data, recording how many people
travel between a home and work zone for work, broken down by mode. We have a
tool to disaggregate this and create individual people, picking homes and
workplaces reasonably using OSM-based heuristics. See
[the pipeline](https://github.com/a-b-street/abstreet/blob/master/popdat/src/od.rs)
for details about how it works. The code that parses the raw UK data is
[here](https://github.com/a-b-street/abstreet/blob/master/importer/src/uk.rs).
If you have similar data for your area, contact me and we can add support for
it!

### Custom import

See [here](../dev/formats/scenarios.md).

## Modifying demand

The travel demand model is extremely fixed; the main effect of a different
random number seed is currently to initially place parked cars in specific
spots. When the player makes changes to the map, exactly the same people and
trips are simulated, and we just measure how trip time changes. This is a very
short-term prediction. If it becomes much more convenient to bike or bus
somewhere, then more people will do it over time. How can we transform the
original demand model to respond to these changes?

Right now, there's very preliminary work in sandbox mode for Seattle weekday
scenarios. You can cancel all trips for some people (simulating lockdown) or
modify the mode for some people (change 50% of all driving trips between 7 and
9am to use transit).

## Research

- <https://github.com/replicahq/doppelganger>
- <https://github.com/stasmix/popsynth>
- <https://zephyrtransport.github.io/zephyr-directory/projects/>
- <https://activitysim.github.io>
- <https://github.com/BayAreaMetro/travel-model-one>
- <https://github.com/RSGInc/DaySim>
- <https://github.com/arup-group/pam>
- <https://spatial-microsim-book.robinlovelace.net/smsimr.html>
- <https://github.com/DLR-VF/TAPAS>
- <https://sumo.dlr.de/docs/Demand/Activity-based_Demand_Generation.html>
- [Watch Dogs: Legion](https://www.youtube.com/watch?v=oYUZp4I3ksE&t=213s) has a
  synthetic population of London, generating individual detail lazily from real
  statistical data

## Future ideas

### UK data sources

Currently A/B Street is using
[2011 flow data](https://www.ons.gov.uk/census/2011census/2011censusdata/originanddestinationdata)
-- specifically WU03UK (the location of usual residence and place of work by
method of travel to work).

There are some others to consider:

- WF01AEW_oa from
  [here](https://wicid.ukdataservice.ac.uk/flowdata/cider/wicid/downloads.php)
  has even more granular home<->work zones
  - Need to compare to
    [WF01BEW](https://webarchive.nationalarchives.gov.uk/ukgwa/20160202161811/http://www.nomisweb.co.uk/census/2011/wf01bew)
- <https://www.nomisweb.co.uk/sources/ukbc> could be used to understand how many
  people work at different places
- [NTEM](https://github.com/ITSLeeds/NTEM2OD/) has forecasted OD pairs
- [QUANT](http://quant.casa.ucl.ac.uk/) and [SPENSER](https://geospenser.com/)
  are two other population and activity/time-use datasets, used by another
  project I'm working on called
  [RAMP](https://github.com/Urban-Analytics/RAMP-UA)

### Use cases

What're all the uses of an accurate travel demand model? And when might it be
helpful to represent synthetic people with more info than just their daily
trips?

- the obvious: traffic simulation
- Ungap the Map's mode shift calculation -- look for short driving trips, then
  check the network to see if there are common gaps that might prevent cycling.
  Do we need to understand the demographics of people taking these "possible to
  switch" trips?
- the LTN tool's impact predicton -- without using traffic simulation, just
  calculate routes before and after changes
- Equity and health analysis
  - If we think some interventions might cause higher traffic (and thus
    noise/air pollution and safety issues) on major roads, who lives near the
    affected area?

### Validation / calibration

How do we judge whether a given travel demand model is "good"?

For comparing two different models, one idea is to "re-aggregate" individual
trips from each of them and see if overall counts look similar. For example,
partition the map into zones (maybe using zones that one of the models being
compared used originally, or maybe making up new ones), count the trips between
zones, and compare between models -- grouping by departure time and mode, or
not.

This comparison could sanity check that roughly the same number of people live
and commute to the same places. But it's not a very satisfying judgment, because
it's not really what we're trying to measure. I think the validation that makes
sense is to plug the model into an analysis we actually care about and where we
have real observations. One of the simplest -- and most useful for LTN impact
prediction, particularly -- is just estimating traffic volumes at different
roads and intersections.
