# Documentation authoring

Write concise, source-backed documentation. The repository structure supplies page titles and descriptions through MDX frontmatter; begin body content with the task or behavior, not a repeated H1.

## Page structure

- Use `##` headings for meaningful sections and keep heading levels consecutive.
- Put a concise, factual `description` in frontmatter.
- Use normal MDX links for internal documentation paths. Relative `.mdx` links are supported.
- Use tables for compact comparisons such as fields, roles, parameters, status codes, and configuration. Keep explanation-sized prose outside tables.

## Code and API reference

- Use fenced code blocks with a language (`sh`, `ts`, `json`, `http`, or `prisma`). Add a filename only when it helps locate a file.
- Put executable commands in `sh` blocks. Do not add invented terminal output.
- Introduce every endpoint with `<ApiEndpoint method="GET" path="/path" auth="Required">` and a one-sentence description. Follow it, as applicable, with authentication and authorization, parameters, request fields and validation, example request and response, status codes, errors, and implementation notes.
- Document behavior confirmed by the source application only.

## Callouts and limitations

- Use Fumadocs `<Callout>` with `note`, `important`, or `warning` for contextual, essential, and consequential information.
- Use `<TechnicalDebt>` only for a current implementation inconsistency or weakness. State current behavior first, name the limitation, and explain impact. Do not state proposed behavior as present fact.
- Keep detailed limitation explanations on **Known Limitations** and link there instead of repeating them.

## Trust and diagrams

- Add `<SourceReference href="...">backend/path</SourceReference>` at the end of implementation-specific sections when it helps a contributor inspect the code. Use a repository link when stable; omit `href` while the link is unknown.
- Diagrams use fenced `mermaid` blocks, transformed through the official Fumadocs integration. The renderer follows the site theme and permits horizontal scrolling on narrow screens. `npm run build` validates Mermaid syntax before compiling the site; keep diagrams focused and source-backed. The architecture diagrams cover request flow, Google OAuth, and Prisma relationships.
- Use “ElixirV4” for the application and “Elixir Community” for the organization.
