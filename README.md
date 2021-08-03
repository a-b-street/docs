# A/B Street docs

This repo contains the source code (in Markdown format) of the technical documentation and user guides for [A/B
Street](https://github.com/a-b-street/abstreet). We use
[mdbook](https://github.com/rust-lang/mdBook) for formatting, and have a Github
action publish on every commit. Contributions to the docs are very welcome!

To build the book locally, download or clone the repo, e.g. using the [`gh` CLI](https://github.com/cli/cli) as follows:

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

You can see the deployed docs at <https://a-b-street.github.io/docs>.
