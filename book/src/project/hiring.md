# Hiring

A/B Street is hiring a Rust engineer!

## The project

A/B Street aims to get the average citizen more involved with local
transportation planning and accelerate plans to make cities more friendly to
people biking, walking, and using public transit. This massive undertaking
involves building a realistic model of any city’s street network from open data,
designing a user interface to easily edit streets and intersections, getting a
traffic simulation to run with some degree of realism, using data visualization
to explain the impacts of changes, and advocating for real changes using results
from the software.

A/B Street has yet to focus on public transit. That’s where you come in. Today,
there’s only preliminary and broken support for importing bus routes from
OpenStreetMap and simulating people using them. A vision of what proper public
transit support in A/B Street should do:

- Let people draw entirely new bus and light rail routes, then understand the
  impact on individual people and the aggregate community.
- Explore how small changes affect bus performance -- like changing bus stop
  locations, adding a bus-only lane, or configuring a traffic signal to
  prioritize buses.
- Gamify the process of planning for public transit, by gradually introducing
  editing tools and a budget, to teach the public about the trade-offs involved
  with planning.

These goals will involve
[many tasks](https://github.com/a-b-street/abstreet/issues/372), such as
incorporating data from OpenStreetMap and GTFS into A/B Street’s map model;
modifying pathfinding to decide which route a person should use; defining and
visualizing metrics for performance of a bus route; and changing the map model
and UI to allow bus stops and routes to be created and edited.

Although your main focus will be public transit, A/B Street is a project with a
wide scope, and there are other areas we need help, many of which good public
transit support depends on:

- Improving the underlying map model:
  - [simplifying complex intersections from OpenStreetMap](https://github.com/a-b-street/abstreet/issues/654)
  - [snapping separate paths to the main road](https://github.com/a-b-street/abstreet/issues/330)
  - [improving heuristics for placing crosswalks](https://github.com/a-b-street/abstreet/issues/485)
- Fixing gridock and improving the simulation
  - lane-changing and over-taking
  - biking in parking lanes when possible
  - better rules for when pedestrians are likely to start crossing
  - mode shift / figuring out when a new bus route would
    [convince somebody to stop driving](https://github.com/a-b-street/abstreet/issues/448)
  - editing the map without needing to restart a simulation
- UI / design
  - helping implement UX designs prototyped in Figma
  - fixing usability problems you notice yourself

## Your qualifications

- Can work independently, but still communicate effectively with the rest of the
  team. We need to focus our efforts on other parts of the project, but we'll
  keep up with your work closely
  - One way to demonstrate this: have you created your own project and
    maintained it for a while? Have you worked on other open source projects?
- Can ramp up quickly on Rust, OpenStreetMap, GTFS, etc. If you already know
  these, great. If not, you should feel comfortable learning enough to start
  contributing to the code-base in a few days.
- Are fine with (and happy to have) all of your work being Apache licensed and
  designed/discussed transparently on Github and Slack
- Bonus if you have enough design sense to mock up UIs, but no worries if not

## The job

Our [funding](funding.md) is all but nonexistent, so I am personally carving out
some of my savings for this. Because of this, the bar for hiring and my
expectations are pretty high.

- The amount is negotiable, but no more than about $30,000 USD total for the
  duration of the contract.
- Ideally this contract would be full-time (35-40 hours a week) for about 6
  months -- so that's about $5,000 per month.
- Can't offer any benefits, sorry -- we're not a company yet!
- Remote only. Anywhere in the world is fine, but most of us are in Seattle
  (PST).

If we can figure out how to financially sustain ourselves, this could become a
permanent position, but don't count on it.

## Applying

If you think you’d be a good fit, email <dabreegster@gmail.com> with any
relevant material -- open source projects, a resume, etc. We can schedule a
video call.

In lieu of a traditional interview, I’d like to ask you to submit a PR to A/B
Street to make progress on one of our starter bugs or any other fix/feature
you’d like to see (there’s plenty of things that need improving, and being able
to find and fix them without much guidance is what we’re looking for). Please
focus on good communication in your PR, as it’s something we’d expect you to
keep up the entire time -- see
[this](https://github.com/a-b-street/abstreet/pull/571) as an example, where the
before/after of the change is clear, and any uncertain design decisions are
brought up.
