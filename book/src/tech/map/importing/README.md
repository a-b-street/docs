# Importing

This chapter describes the process of transforming OSM extracts into A/B
Street's map model.
In many cases, the quickest way to download and import pre-generated
map data is by using the GUI, e.g. as follows:

```bash
cargo run --bin game --release # launch the game
```

Once the game has been launched, click on the Sandbox option, and then
on the button in the top right that allows you to change map:

![](https://user-images.githubusercontent.com/1825120/131584198-c58bccf0-5712-4cd6-bd62-16ba607dc4af.png)

From there you can select a new city/area, as shown in the example below:

![](https://user-images.githubusercontent.com/1825120/131584299-b16db016-acf7-4e91-a418-f65af4105709.png)

After opting to download the data, you should be able to open the map.
In this case, the map data was saved as
`data/system/gb/exeter_red_cow_village/maps/center.bin`.

The process to generate new binary map files, the steps are:

1.  A large .osm file is clipped to a hand-drawn boundary region, using
    `osmconvert`
2.  The `convert_osm` crate reads the clipped `.osm`, and a bunch of optional
    supplementary files, and produces a `RawMap`
3.  Part of the `map_model` crate transforms the `RawMap` into the final `Map`
4.  Other applications read and use the `Map` file

The `importer` crate orchestrates these steps, along with automatically
downloading any missing input data.

The rest of these sections describe each step in a bit more detail. Keeping the
docs up-to-date is hard; the best reference is the code, which is hopefully
organized clearly.

Don't be afraid of how complicated this pipeline seems -- each step is
relatively simple. If it helps, imagine how this started -- just chop up OSM
ways into road segments, infer lanes for each road, and infer turns between the
lanes.
