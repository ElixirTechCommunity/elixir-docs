# ElixirV4 Developer Documentation

The documentation site for ElixirV4 contributors and API consumers. It is built with Next.js and Fumadocs and is intended to deploy at `developer.elixircommunity.in`.

## Local development

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. Build the production site with `npm run build`.

## Content

Documentation pages live in `content/docs`. Read [DOCS_AUTHORING.md](./DOCS_AUTHORING.md) before adding technical content. Documentation must describe the current ElixirV4 implementation; inspect the ElixirV4 application repository as a read-only technical reference before documenting behavior.

## Checks

```sh
npm run types:check
npm run lint
npm run build
```
