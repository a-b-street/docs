# Hiring

A/B Street is hiring a Rust engineer!

- **Timeline**: Full-time for 3 months, starting ASAP. Latest possible start
  date is 1 June.
- **Compensation**: £6,981 total
- Must be UK-based with a UK bank account

## The project

[A/B Street](https://abstreet.org) aims to get the average citizen more involved
with local transportation planning and accelerate plans to make cities more
friendly to people biking, walking, and using public transit. This massive
undertaking involves building a realistic model of any city's street network
from open data, designing a user interface to easily edit streets and
intersections, getting a traffic simulation to run with some degree of realism,
using data visualization to explain the impacts of changes, and advocating for
real changes using results from the software.

Depending on your skills and interests, there are a few possible places to focus
for 3 months.

### OpenStreetMap network simplification

Representing street networks geometrically from OSM data is
[incredibly hard](https://a-b-street.github.io/docs/tech/map/geometry/index.html).
There are many limitations dealing with sidewalks, crossings, dual carriageways,
and cyclepaths parallel to the road. These problems impact all parts of A/B
Street -- for example, the traffic simulation tends to get stuck near complex
junctions, and the low-traffic neighborhood tool often can't handle boundaries
near overlapping road geometry. If you enjoy working with messy and incomplete
spatial data, there's plenty of opportunity to make impactful progress here.

Further reading:

- [osm2streets](https://github.com/a-b-street/osm2streets)
- [simplifying complex intersections from OpenStreetMap](https://github.com/a-b-street/abstreet/issues/654)
- [snapping separate paths to the main road](https://github.com/a-b-street/abstreet/issues/330)
- [improving heuristics for placing crosswalks](https://github.com/a-b-street/abstreet/issues/485)

### Public transit

A/B Street has yet to focus on public transit. Today, there's only preliminary
and broken support for importing bus routes from GTFS data and simulating people
using them. A vision of what proper public transit support in A/B Street should
do:

- Let people draw entirely new bus and light rail routes, then understand the
  impact on individual people and the aggregate community.
- Explore how small changes affect bus performance -- like changing bus stop
  locations, adding a bus-only lane, or configuring a traffic signal to
  prioritize buses.
- Gamify the process of planning for public transit, by gradually introducing
  editing tools and a budget, to teach the public about the trade-offs involved
  with planning.

In 3 months, you'd be expected to make progress on
[some tasks](https://github.com/a-b-street/abstreet/issues/372) such as:

- importing route and schedule data from GTFS
- modifying pathfinding to decide which route a person should use
- defining and visualizing metrics for performance of a bus route
- and changing the map model and UI to allow bus stops and routes to be created
  and edited

### Sharing proposals

After users modify a street network in A/B Street, they can save their changes
as files locally or in their browser's storage. There's extremely basic support
to [anonymously upload](https://github.com/a-b-street/yimbyhoodlum) the edits
and share a URL with someone else. We'd like to have a proper way for people to
share their proposals, with user accounts and versioning. Possibly we don't need
to build, productionize, and operate our own service for this (and thus take on
the burden of GDPR, handling abusive accounts, etc) and can instead leverage
something existing.

Relatedly, we'd like to explore incorporating the web version of A/B Street into
blog posts and story map-style articles, making it easy for campaign groups
without much technical skill to embed interactive demonstrations.

## Your qualifications

- Can ramp up quickly on Rust, OpenStreetMap, GTFS, etc. If you already know
  these, great. If not, you should feel comfortable learning enough to start
  contributing to the code-base in a few days.
- Can work independently, but still communicate effectively with the rest of the
  team. We need to focus our efforts on other parts of the project, but we'll
  keep up with your work closely
  - One way to demonstrate this: have you created your own project and
    maintained it for a while? Have you worked on other open source projects?
- Are fine with (and happy to have) all of your work being Apache licensed and
  designed/discussed transparently on Github and Slack/Discord
- Bonus if you have enough design sense to mock up UIs, but no worries if not

## Applying

If you think you'd be a good fit, email <dabreegster@gmail.com> and
<R.Lovelace@leeds.ac.uk> with any relevant material -- open source projects, a
resume, etc. We can schedule a video call.

In lieu of a traditional interview, we'd like to ask you to submit a PR to A/B
Street to make progress on one of our starter bugs or any other fix/feature
you'd like to see (there's plenty of things that need improving, and being able
to find and fix them without much guidance is what we're looking for). Please
focus on good communication in your PR, as it's something we'd expect you to
keep up the entire time -- see
[this](https://github.com/a-b-street/abstreet/pull/571) as an example, where the
before/after of the change is clear, and any uncertain design decisions are
brought up.
