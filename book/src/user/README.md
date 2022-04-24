# User guide

Please [file a Github issue](https://github.com/a-b-street/abstreet/issues/) or
email <dabreegster@gmail.com> if you encounter any problems.

## Installing A/B Street

You can run A/B Street
[directly in your web browser](http://play.abstreet.org/0.3.19/abstreet.html).
It's slower and there are some limitations compared to installing locally.

Grab a pre-built binary release:

- [Windows](https://github.com/a-b-street/abstreet/releases/download/v0.3.19/abstreet_windows_v0_3_19.zip)
  - Unzip the folder, then run `play_abstreet.bat`. If you get a warning about
    compressed files, choose to extract -- you can't run from the .zip directly.
  - If you get a "Windows protected you" security warning, click "more info",
    then "run anyway." We don't sign the release yet, so A/B Street shows up as
    an unknown publisher.
- [Mac](https://github.com/a-b-street/abstreet/releases/download/v0.3.19/abstreet_mac_v0_3_19.zip)
  - Unzip the directory, then run `play_abstreet.sh`.
  - If you get an error about the developer unverified,
    [follow this](https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac).
    Help needed to start
    [signing the release](https://github.com/a-b-street/abstreet/issues/107)!
  - If that just opens a text file, then instead open terminal, `cd` to the
    directory you just unzipped. Then do:
    `cd game; RUST_BACKTRACE=1 ./game 1> ../output.txt 2>&1`
  - [Help needed](https://github.com/a-b-street/abstreet/issues/77) to package
    this as a Mac .app, to make this process simpler
- [Linux](https://github.com/a-b-street/abstreet/releases/download/v0.3.19/abstreet_linux_v0_3_19.zip)
  - Unzip the directory, then run `play_abstreet.sh`, e.g. with the following
    commands

```bash
cd ~/Downloads
wget https://github.com/a-b-street/abstreet/releases/download/v0.3.19/abstreet_linux_v0_3_19.zip
unzip abstreet_linux_v0_3_19.zip
cd abstreet_linux_v0_3_19
./play_abstreet.sh
```

- For a video illustrating this and more detailed instructions on installing the
  tool on Linux, see [here](run_on_linux.gif).
- [FreeBSD](https://www.freshports.org/games/abstreet/), thanks to
  [Yuri](https://github.com/yurivict)

Or you can [compile from source](../tech/dev/index.md).

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
