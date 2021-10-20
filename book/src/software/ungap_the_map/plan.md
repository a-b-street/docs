# Project plan

## Stakeholders

There are three groups usually involved with city-scale transportation planning.
First are government agencies -- city departments of transportation (DOT),
state-level DOTs for some projects, public transit agencies, etc. Sometimes
these contract planning or design work out to private consulting companies.
Second are local advocacy groups, who help raise awareness about safety issues
and vocally push the government to make changes. Third are individual citizens.
Once they're engaged by the issue of inadequate cycling infrastructure -- often
because of personal experiences or from looking for safe routes for their
children to bike to school -- they get involved in a few ways. Many join the
advocacy groups, volunteering their time. A few --
[Joe Mangan](https://www.seattlebikeblog.com/2018/01/19/a-roosevelt-junior-redesigned-the-streets-around-his-high-school-and-his-plan-is-better-than-sdots/)
and [Pushing the Needle](https://twitter.com/pushtheneedle/) being notable
examples -- start directly writing about their vision. And many more spend
endless hours debating strangers online on sites like Reddit, Twitter, or the
[Urbanist blog](https://www.theurbanist.org/).

The aim is for A/B Street to engage all of these stakeholders using the same
data and software. Engagement strategies so far include meeting people in person
(through meetups, community bike ride events, and public talks), posting demos
online (using the "wow factor" of the software to grab attention), and
networking. The most common problem so far (from the ~3 years of A/B Street
work) is simply not hearing back. An individual or group initially finds the
project, expresses interest, but disappears after an initial meeting.

Another challenge is deciding what software solutions can best help. A/B
Street's focus has jumped all over the place -- traffic simulation, collecting
data for traffic signal timing, 15-minute neighborhoods -- because none of the
stakeholders clearly express a need for software to solve a particular problem.
Few of these groups have much technical expertise in software, so how could they
even imagine some far-fetched program that doesn't resemble anything they've
used before? In traditional software companies, product managers serve the role
of engaging with these groups, learning about their problems, and gathering
feedback about possible solutions. The A/B Street team doesn't have resources
for that so far.

A barrier to engaging with government agencies is establishing professional
credibility. Governments are risk-averse and establish private industry partners
slowly. A/B Street is an open source project not seeking any kind of profits,
and backed by a few volunteer individuals. This is not something agencies are
used to dealing with -- although in the past, Seattle's open data program hosted
some hackathons specifically to engage with civic hackers. One workaround is to
partner with academic researchers, who have more credibility and some prior
relationships with government.

### Seattle

The launch plan for the bike network tool in Seattle includes all of these
groups:

- Individuals
  - The [r/seattlebike subreddit](https://old.reddit.com/r/seattlebike)
  - publishing an article to
    [Seattle Bike Blog](https://www.seattlebikeblog.com)
  - The hope is for individual readers of these online communities to try out
    the software, upload their proposals, and maybe become more involved with
    widely publishing their ideas. This will help demonstrate the people's
    visions to the government in a more visual and specific way than what
    happens now.
- Advocacy groups
  - [Seattle Neighborhood Greenways](https://seattlegreenways.org/), with whom
    I've been involved for a while. They're starting an "ungap the map"
    campaign, which was one of the original inspirations for this tool's focus.
    - The A/B Street team is already involved with one local chapter,
      [the Aurora Reimagined Coalition](https://www.got99problems.org). We
      attended a live design workshop in late August and got feedback on the
      initial prototype of the tool.
  - [Move Redmond](https://www.glwstreets.org/complete-the-loop), a similar
    group for a nearby city. I have some contact with them previously.
  - [Complete Streets Bellevue](https://completestreetsbellevue.org/), also have
    prior contact.
- Government entities
  - I've met and demonstrated A/B Street to a few people within
    [SDOT](https://www.seattle.gov/transportation), but unfortunately I don't
    expect any further response from them.
  - The
    [Seattle Bike Advisory Board](http://www.seattle.gov/seattle-bicycle-advisory-board)
    is more likely to be responsive.
  - Seattle is about to elect a new mayor and city council in November. All the
    major candidates mention biking in their platforms, so I'll get in touch.

A/B Street has wound up local [TV](https://www.youtube.com/watch?v=Pk8V-egsUxU)
and
[newspaper](https://www.thestranger.com/slog/2020/06/29/43999454/ab-streets-game-lets-you-create-the-seattle-street-grid-of-your-dreams)
media before. It might be strategic to repeat this for the new software, but I'd
like to wait and see how many people use the tool and upload proposals. If
there's a strong community response, I think this would merit another story.

### UK

There's one exception to the difficulties mentioned previously about getting
clear product requirements.
[Brian Deegan](http://www.urbanmovement.co.uk/brian-deegan.html) is a cycling
planner who does consulting across the UK and whose company has written lots of
[design manuals](http://www.urbanmovement.co.uk/beeachampion.html). Thanks to
[Robin](https://www.robinlovelace.net), A/B Street has a relationship with
Brian, and based on studying a design workshop video by Brian, we've started
prototyping a new tool focused on placing modal filters to establish low-traffic
neighborhoods. The UK planning scene is currently more focused on this type of
intervention than building bike lanes. So, we're planning to pivot and focus on
this LTN tool after mid-October. The long-term strategy is to continue building
these smaller, focused tools, all leveraging the common A/B Street technical
platform. Different regions and situations will demand different planning
software.

### NYC

Thanks to the tool's part-time UX contributor
[Mara](https://www.mara-cruz.com/), we have a future meeting with
[TransAlt](https://www.transalt.org), an advocacy group in NYC.

### Others

The A/B Street team has a collaborator at the
[Arizona State Transportation AI lab](https://github.com/asu-trans-ai-lab/). It
could be the right time to focus on the currently car-centric Phoenix metro
area, with things like the [car-free Culdesac community](https://culdesac.com)
gaining traction.

San Francisco is another high-potential market for the bike tool. They have
extreme hills, a very active
[cycling advocacy group](https://bikesiliconvalley.org), and a large tech
industry workforce likely to be interested in this kind of software. During
COVID, they established many
[slow streets](https://sf.eater.com/2021/6/3/22457397/sf-restaurants-support-slow-streets-permanent).
The A/B Street team has some connections to local advocates here.

## Results so far

Stay tuned for the reaction to the tool's launch and the example
[Seattle proposal](../../proposals/seattle_bikes/index.md). Ultimately the
measurable result is the number of real bike lane projects that reach
construction and used A/B Street in some part of the planning or engagement
process. In the short term, metrics we'll track are the number of proposals
uploaded, the responses on social media, and any new collaborations that're
started after launching.

## Action plan

The immediate plans are to launch the tool the week of October 11 to all of the
listed Seattle stakeholders. In a few weeks, we'll meet with NYC's TransAlt
group. If the initial response in Seattle is quiet, we will launch to San
Francisco, after fixing some elevation data issues there.

Roughly whenever we want, we could scale up to more cities. There's always some
specialized effort to fix the most egregious OpenStreetMap data quality issues.
Getting travel demand data is a common challenge, but it's less important for
this bike network tool. The limiting factor to expanding quickly really is time
and managing communications with all of the people who will initially be
interested -- it's important to balance this with time spent actually working on
the software.

### Next steps

The immediate priorities are to polish the tool and finish things that didn't
make the deadline:

- draw routes more clearly when unzoomed on large maps
- [get the entire Seattle region to easily load on the web](https://github.com/a-b-street/abstreet/issues/746)
- map out the official Seattle bike master plan as a second example
- add functionality to compare different proposals against each other and the
  current conditions
- implement the
  [decay curves for mode shift](https://github.com/a-b-street/abstreet/issues/448)
  to get predictions better calibrated by research
- consolidate the user flow into just 3 stages: explore, your trips, and
  proposals

To support rolling out to more cities:

- improve elevation data (switch from SRTM to
  [NASADEM](https://earthdata.nasa.gov/esds/competitive-programs/measures/nasadem))
- snapping separate cycleways to the main road

There are also more features we could add:

- hover on commercial buildings to summarize what's inside
- showing historic collision data to emphasize the dangers of high-stress roads
- animating cyclists following sample routes before and after, using A/B
  Street's traffic simulator
- simulating other vehicles nearby to enhance the visualization
- improve routing by allowing bikes to enter/exit buildings from either side of
  the road

![](../../project/retrospective/traffic_sim.gif)

### Future directions

The longer-term vision for A/B Street in general extends beyond just improving
the bike network tool and rolling out to more cities.

- low-traffic neighborhood planning
  - As mentioned [above](#uk), we have a promising collaboration to expand an
    initial prototype to help design LTNs, which are a very active topic across
    the entire UK. This is probably the highest immediate priority.
- public transit
  - A/B Street has [plans](https://github.com/a-b-street/abstreet/issues/372) to
    simulate buses and light rail, but there's lots of work to build it out.
    We'd love to partner with [Seattle Subway](https://www.seattlesubway.org)
    and inspire the public to vote for
    [ST4](https://actionnetwork.org/letters/approve-funding-for-st4-in-seattle)
- a website for organizing proposals
  - Although it's now possible to share individual A/B Street proposals by URL,
    there's no way to browse, upvote, or give feedback on ideas
- story-mapping
  - Today we present A/B Street ideas like
    [the Seattle bike vision](../../proposals/seattle_bikes/index.md) in two
    formats -- a blog post with pictures, and the software itself.
    [Story maps](https://storymaps.arcgis.com/) could be a format to combine
    these.
- more detailed street and intersection design
  - A/B Street doesn't let you visualize or edit details like pocket parking,
    parklets, curb bulbs, or barriers in intersections. This is maybe something
    we should leave to experts with CAD software, but it could be worth modeling
    this level of detail too.
  - Incorporating a satellite view layer would also be useful to understand
    changes in context
- more detailed pedestrian simulation
  - Telling an effective story about what a new cafe street or public square
    requires showing people using the space to meet friends, share meals, relax,
    and play. A/B Street today just simulates people making trips. We'd like to
    explore crowd simulation and visualization.
- Incorporating census and demographic information
  - City planners prioritize changes based on nearby residents' income, age,
    employment, and other demographic factors. A/B Street could use public data
    to further measure the impact of changes.
- Modifying land use policies
  - Many cities outlaw medium- and high-density housing in most of the city, and
    force residential and commercial sectors to remain physically distinct. This
    leads to longer trips, which most likely use cars. We've
    [started](../fifteen_min.md) exploring this relationship, but there's no way
    yet to modify the zoning policy for some land parcels and explore possible
    effects.
- 3D visualization
  - Another way to visually communicate changes is with 3D renderings. We could
    partner with [3D Street](https://www.3d.st) and export A/B Street designs to
    engage the public even better.

In other words, we envision A/B Street growing into a general digital twin
platform for exploring different aspects of urban design. We will continue our
key differentiators from other projects of remaining open source and geared
towards the general public's use.

## Resources needed

In short:

- connections to government or industry stakeholders who could sponsor the
  project, provide use cases, etc
- staff
- funding (as a way to hire people)

### Staffing

A/B Street has just one full-time software developer, who also plays the role of
project manager, marketer, and writer. There are a handful of volunteer UX
designers and programmers who sometimes have time to help. To really deliver on
the project's ambition, we need more full-time help:

- a visual designer, with particular cartography expertise
  - A/B Street's zoomed-in view presents an unprecedented level of detail about
    each lane on a road. We also simulate individual vehicles and people moving
    around. Color and design choices are difficult. There's lots of information
    to display.
  - This is vital, because A/B Street's job is to tell stories and sell a vision
    to people. This is best done visually, not by just presenting data!
- UX designer
  - Yuwen served as the project's UX lead for ~1 year and totally transformed
    the project. We need full-time help here again.
- product manager
  - Urban planning is a broad space, and figuring out the most important area to
    focus on is hard. Requires networking with advocacy groups, city planners,
    etc across the world and figuring out their problems and ways to help.
- marketing expert
  - First use is just helping convince different stakeholders to use and invest
    in A/B Street
  - But perhaps more importantly, somebody who understands how the general
    public perceives transportation and city changes, and can figure out how to
    educate and convince people it's beneficial long-term
- software engineers
  - A/B Street is both very broadly-scoped (and so just needs lots of help
    implementing) and tackles some very difficult problems requiring deep focus
  - Because of this and the use of Rust, a programming language that has an
    initial learning curve, it's a difficult project for beginners to contribute
    to.

A single person may be able to serve multiple roles -- for instance, visual
designer, product management, and UX. Or a UX designer who can help with
programming.

### Budget

Say we want to hire one Rust software engineer and one UX designer (who would
also help with the cartography and product management roles) for a year.
Depending where the employees live, median salaries differ significantly.
Glassdoor estimates
[£42K](https://www.glassdoor.com/Salaries/london-programmer-salary-SRCH_IL.0,6_IM1035_KO7,17.htm)
for a general programmer in London, or
[$85k](https://www.glassdoor.com/Salaries/seattle-programmer-salary-SRCH_IL.0,7_IC1150505_KO8,18.htm)
for Seattle. Neither the engineer nor designer could be entry-level for a
project this complicated.

### Funding sources

Becoming a traditional business goes directly against A/B Street's core
philosophy. Cities belong to everybody who lives in them, so the planning
processes around them should be transparent, accessible to everyone, and any
research studies should be reproducible. Open-source software and public data
are vital to this. A business exists to generate profit, even if those profits
are modest and just meant to sustain the business. The ultimate metric that
matters for this project is impact on the real world -- making transportation
more environmentally friendly. Therefore, a
[B-corp](<https://en.wikipedia.org/wiki/B_Corporation_(certification)>) or
[benefit corp](https://en.wikipedia.org/wiki/Benefit_corporation) might be more
appropriate.

One possible direction is consulting. Cities contract the A/B Street team to
specialize the software for their immediate needs. All of the work is open
source. So effectively they would just define priorities for the project.
[OpenTripPlanner](http://docs.opentripplanner.org/en/latest/) is an example of
open source transportation software funded by different groups as a public good.

Other options are crowd-funding (like Github sponsors) and applying for grants
like the [Rees Jeffreys road fund](https://www.rjrf.uk/).

### Schedule

My time commitment is unknown starting November, so I'm only describing the next
few weeks.

- October 11-15
  - most of the [next steps](#next-steps) items: unzoomed drawing, large maps on
    the web, comparing proposals
  - gradually launch Ungap the Map to a Seattle audience
- October 18-22
  - mode shift decay curves, NASADEM elevation to support San Francisco and NYC
    rollout
  - continue rapid prototyping of the new low-traffic neighborhood tool
- October 25-29
  - simulate nearby vehicles (also needed for the LTN tool)
  - respond to feedback from whichever stakeholders respond
