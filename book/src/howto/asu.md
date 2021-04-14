# Instructions for ASU collaborators

These instructions are tailored to the
[ASU Transportation AI Lab](https://github.com/asu-trans-ai-lab/).

The most important tip: ask questions!
[File an issue](https://github.com/dabreegster/abstreet/issues/), email
<dabreegster@gmail.com>, or ask for a Slack invite.

## Installing

A new version is released every Sunday, but you probably don't need to update
every week.

1.  Go to <https://github.com/a-b-street/abstreet/releases> and download the
    latest `.zip` file for Windows, Mac, or Linux.

![download](download.png)

2.  Unzip the folder and run `play_abstreet.sh` or `play_abstreet.bat`

![run](run.png)

3.  On the main title screen, click `Sandbox`. This starts in Seattle by
    default, so change the map at the top.

![change_map](change_map.png)

4.  Scroll down and choose `Download more cities`

![loader](loader.png)

5.  Enable `us/phoenix` to download Tempe, then `Sync files`

![updater](updater.png)

6.  Wait. It'll look like the window is frozen. You can open `output.txt` to
    convince yourself it's trying to download something. I'm working on adding
    proper progress bars to this part!

7.  You'll see the map chooser screen again. Choose USA, then Phoenix.

![usa](usa.png)

You've now opened up the Tempe map!

### A shortcut

If you want to skip the title screen and directly open the map of Tempe next
time, you can modify the script that starts A/B Street. Edit `run_abstreet.sh`
or `run_abstreet.bat` and add `--dev data/system/us/phoenix/maps/tempe.bin`
after it says `game` or `game.exe`. The Mac version should wind up with
`RUST_BACKTRACE=1 ./game --dev data/system/us/phoenix/maps/tempe.bin 1> ../output.txt 2>&1`
on the last line. For Window it's
`game.exe --dev data/system/us/phoenix/maps/tempe.bin 1> ..\\output.txt 2>&1`

There are a bunch of other
[startup parameters](../dev/index.md#development-tips) you can pass here.

## Importing a Grid2Demand scenario

When you run <https://github.com/asu-trans-ai-lab/grid2demand>, you get an
`input_agents.csv` file. You can import this into A/B Street as a scenario.

1.  Change the traffic from `none`

![pick_scenario](pick_scenario.png)

2.  Click `import Grid2Demand data`

![grid2demand](grid2demand.png)

3.  Choose your `input_agents.csv` file

4.  A new scenario will be imported. Later you can launch this from the same
    menu; the scenario will be called `grid2demand`

![scenario_again](scenario_again.png)

Grid2Demand needs a .osm file as input. The extract of Tempe that A/B Street
uses is at
<https://abstreet.s3.us-east-2.amazonaws.com/dev/data/input/us/phoenix/osm/tempe.osm.gz>.
Note the file is compressed.

## Modifying a scenario

You can transform a scenario before simulating it. This example will cancel all
walking and biking trips from the scenario, only leaving driving and public
transit.

1.  After loading a scenario, click `0 modifications to traffic patterns`

![mod_traffic](mod_traffic.png)

2.  Click `Change trip mode`

3.  Select the types of trips that you want to transform, and change them to
    cancel. Click `Apply`.

![cancel](cancel.png)
