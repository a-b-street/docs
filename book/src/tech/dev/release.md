# Release process

This happens every Sunday.

1.  Push a commit containing `[rebuild] [release]` in the commit message.
2.  Wait for the build to complete at
    <https://github.com/a-b-street/abstreet/actions>
3.  Manually download the 3 .zip files
4.  With your current directory set to where the .zips are downloaded, run
    `~/abstreet/release/finalize.sh v0_2_38`, changing the version number. (That
    path assumes the abstreet git repo is in your home directory.)
5.  If you want, sanity check that the final generated binaries work. Sometimes
    I test things like the map importer or that maps not included by default can
    be downloaded.
6.  Create a new release at
    <https://github.com/a-b-street/abstreet/releases/new>. Make sure the version
    matches, with a different format -- `v0.2.38`. The description should match
    what later goes in the changelog, and the name really ought to be
    gastronomically offensive.
7.  Upload the 3 transformed .zips created by `finalize.sh` -- they're named
    something like `abstreet_mac_v0_2_38.zip`.
8.  Publish release!
9.  From the root directory of the abstreet repo, run
    `./release/update_docs.sh 37 38`. When the major version number changes,
    update that script first. This updates the latest release from `0.2.37` to
    `0.2.38`. It assumes the <https://github.com/a-b-street/docs> repo is in
    your home directory named `~/docs`.
10. Go fill out `~/docs/book/src/project/CHANGELOG.md`; the notes should match
    what's in the Github release.
11. Follow the steps that the `update_docs.sh` script tells you. Don't forget to
    push the commit on the main abstreet repo as well.

One of the `update_docs.sh` steps is an S3 copy. This "freezes" the current
"dev" data and web deployment as a named version. The URL would be something
like <http://abstreet.s3-website.us-east-2.amazonaws.com/0.2.38/abstreet.html>.

## How it works

The process is kind of convoluted; help is always welcome to smooth it out.

Github Actions is used to build for all 3 platforms.
`.github/workflows/main.yml` is configured to only build when `[rebuild]` is in
the commit message. `[release]` enables a cargo feature flag that tells
`map_gui/src/tools/updater.rs` where to look to download new system data.
Because the binary map format changes, an older release has to be pinned to a
particular versioned copy of all the system data. The workflow calls
`release/build.sh`, which assembles the directory structure with all of the
executables, system data (obtained by running the updater with the default
Seattle-only opt-in), and instructions.

There's some funkiness with producing a .zip, because uploading Github artifacts
always double-zips, and also on the Windows runner, there doesn't seem to be a
way to create a .zip. That's why the extra step of downloading the build
artifacts and running `release/finalize.sh` locally is necessary.
