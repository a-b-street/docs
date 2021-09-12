# User guide

This is an alpha-quality demo. Please email <dabreegster@gmail.com> or
[file a Github issue](https://github.com/a-b-street/abstreet/issues/) if you hit
problems.

## Installing the game

Grab a pre-built binary release -- updated every Sunday, announced at
[r/abstreet](http://old.reddit.com/r/abstreet):

- [Windows](https://github.com/a-b-street/abstreet/releases/download/v0.2.58/abstreet_windows_v0_2_58.zip)
  - Unzip the folder, then run `play_abstreet.bat`. If you get a warning about
    compressed files, choose to extract -- you can't run from the .zip directly.
  - If you get a "Windows protected you" security warning, click "more info",
    then "run anyway." We don't sign the release yet, so A/B Street shows up as
    an unknown publisher.
- [Mac](https://github.com/a-b-street/abstreet/releases/download/v0.2.58/abstreet_mac_v0_2_58.zip)
  - Unzip the directory, then run `play_abstreet.sh`.
  - If you get an error about the developer unverified,
    [follow this](https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac).
    Help needed to start
    [signing the release](https://github.com/a-b-street/abstreet/issues/107)!
  - If that just opens a text file instead of running the game, then instead
    open terminal, `cd` to the directory you just unzipped. Then do:
    `cd game; RUST_BACKTRACE=1 ./game 1> ../output.txt 2>&1`
  - [Help needed](https://github.com/a-b-street/abstreet/issues/77) to package
    this as a Mac .app, to make this process simpler
- [Linux](https://github.com/a-b-street/abstreet/releases/download/v0.2.58/abstreet_linux_v0_2_58.zip)
  - Unzip the directory, then run `play_abstreet.sh`.
- [FreeBSD](https://www.freshports.org/games/abstreet/), thanks to
  [Yuri](https://github.com/yurivict)

Or you can play
[directly in your web browser](http://abstreet.s3-website.us-east-2.amazonaws.com/0.2.58/abstreet.html)
-- some things don't work as well, but no install required.

Or you can [compile from source](../tech/dev/index.md).

## Playing the game

- Use the **tutorial** to learn the controls.
- Play the **challenges** for directed gameplay.
- Try out any ideas in the **sandbox**.

## Common issues

If the size of text and panels
[seems very strange](https://github.com/a-b-street/abstreet/issues/381), you can
try editing `play_abstreet.sh` or `play_abstreet.bat` and passing
`--scale_factor=1` on the command line. This value is detected from your monitor
settings, so if you have a Retina or other HiDPI display, things may be too big
or small.

## Data source licensing

A/B Street binary releases contain pre-built maps that combine data from:

- OpenStreetMap (<https://www.openstreetmap.org/copyright>)
- King County metro
  (<https://www.kingcounty.gov/depts/transportation/metro/travel-options/bus/app-center/terms-of-use.aspx>)
- City of Seattle GIS program
  (<https://www.opendatacommons.org/licenses/pddl/1.0/>)
- <https://github.com/seattleio/seattle-boundaries-data>
  (<https://creativecommons.org/publicdomain/zero/1.0/>)
- Puget Sound Regional Council
  (<https://www.psrc.org/activity-based-travel-model-soundcast>)
- USGS SRTM

Other binary data bundled in:

- Overpass font (<https://fonts.google.com/specimen/Overpass>, Open Font
  License)
- Bungee fonts (<https://fonts.google.com/specimen/Bungee>, Open Font License)
- Material Design icons (<https://material.io/resources/icons>, Apache license)
- Some Graphics textures (<https://www.kenney.nl/>, CC0 1.0 Universal)
- Snowflake SVG (<https://www.svgrepo.com/page/licensing>, CC0)
- Music from
  [various sources](https://github.com/a-b-street/abstreet/tree/master/data/system/assets/music/sources.md)
  with Creative Commons licenses
- Country flags (<https://github.com/hampusborgos/country-flags>, public domain)
