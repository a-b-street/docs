# Development notes

Find packages to upgrade: `cargo outdated -R`

Deal with compile tile: `cargo bloat --time`

Find why two binary crates aren't sharing dependencies:
<https://old.reddit.com/r/rust/comments/cqceu4/common_crates_in_cargo_workspace_recompiled/>

Where's a dependency coming from? `cargo tree -i -p syn`

Diff screencaps: <http://www.imagemagick.org/Usage/compare/#methods>

Debug OpenGL calls:

```
apitrace trace --api gl ../target/debug/game
qapitrace game.trace
apitrace dump game.trace
```

Understand XML: just use firefox

## Markdown

For formatting:

```
sudo apt-get install npm
cd ~; mkdir npm; cd npm
npm init --yes
npm install prettier --save-dev --save-exact
```

## Videos

```
# Fullscreen
ffmpeg -f x11grab -r 25 -s 1920x960 -i :0.0+0,55 -vcodec huffyuv raw.avi

ffmpeg -ss 10.0 -t 5.0 -i raw.avi -f gif -filter_complex "[0:v] fps=12,scale=1024:-1,split [a][b];[a] palettegen [p];[b][p] paletteuse" screencast.gif
```

## Faster linking

```
sudo apt-get install lld
```

Stick this in ~/.cargo/config:

```
[target.x86_64-unknown-linux-gnu]
rustflags = [
    "-C", "link-arg=-fuse-ld=lld",
]
```

Also enable incremental builds in release mode. In `~/.cargo/config`:

```
[build]
incremental = true
```

I'm not sure about setting this in the repo's Cargo.toml, because we may not
want incremental builds on Github Actions for building the release? Not sure
what best practice is.

## git

Keep a fork up to date:

```
# Once
git remote add upstream https://github.com/rust-windowing/glutin/

git fetch upstream
git merge upstream/master
git diff upstream/master
```

## Refactoring

```
perl -pi -e 's/WrappedComposite::text_button\(ctx, (.+?), (.+?)\)/Btn::text_fg(\1).build_def\(ctx, \2\)/' `find|grep rs|xargs`
```

## Stack overflow

rust-gdb --args ../target/release/game --dev

## Drawing diagrams

draw.io

## Mapping

xodo on Android for annotating maps in the field

## OSM tools

osmcha.org for recent changes

To upload diffs:

```
java -jar ~/Downloads/josm-tested.jar ~/abstreet/map_editor/diff.osc
```

JOSM: Press (and release T), then click to pan. Download a relevant layer,
select the .osc, merge, then upload.

## Fonts

fontdrop.info

## Release checklist

What things are sensitive to changes in map data and simulation rules?

- tutorial
- optimize commute challenges

What things do I always forget to test?

- DPI issues, use `--scale_factor`
