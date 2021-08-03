# A/B Street docs

This repo contains the source code (in Markdown format) of the technical documentation and user guides for [A/B
Street](https://github.com/a-b-street/abstreet). We use
[mdbook](https://github.com/rust-lang/mdBook) for formatting, and have a Github
action publish on every commit. Contributions to the docs, all of which you can find as .md files
in the [book/src](https://github.com/a-b-street/docs/tree/main/book/src) folder of this repo,
and which can be edited on GitHub are very welcome!

To build the book, download or clone the repo, e.g. using the [`gh` CLI](https://github.com/cli/cli) as follows:

```bash
gh repo clone a-b-street/docs
```

Then you can change directory and start editing the files, e.g. with the following commands:

```bash
cd docs
edit book/src/tech/dev/api.md
```

That should open an editor with the contents of the [api.md](book/src/tech/dev/api.md) open, ready for you to edit.
You can also edit the files such as the API documentation linked to above directly in GitHub.

The following commands will serve a locally hosted version of the book from the `docs` folder (assuming you have Rust installed):

```bash

cargo install mdbook # install the mdbook crate used to serve the book
mdbook serve # serve book locally to dynamically update to show your changes
```

After running the commands above you should see a version of the docs at [127.0.0.1:3000/](http://127.0.0.1:3000/).

You can see the deployed docs at <https://a-b-street.github.io/docs>.
