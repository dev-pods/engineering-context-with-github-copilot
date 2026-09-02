# Project Guidelines

## Architecture

- This is a GitHub Skills exercise built with Next.js App Router and TypeScript.
- Keep UI components in `src/components` and shared data in `src/lib`.
- Preserve the starter scope: the exercise changes only the upload tags experience.

## Interaction Design

- Prefer native HTML semantics and keyboard interaction before adding abstractions.
- A suggestion input must expose combobox/listbox roles, visible focus, and descriptive labels.
- Reuse the visual language in `src/app/globals.css`; do not introduce another UI library.

## Build And Test

- Run `npm test` for the starter data contract.
- Run `npm run test:solution` for the autocomplete acceptance contract.
- Run `npm run lint` and `npm run build` before proposing completion.

## Boundaries

- Do not add authentication, persistence, APIs, MCP servers, custom agents, or deployment.
- Do not modify workshop evidence files unless the current step explicitly asks for it.
- Keep the implementation diff limited to the autocomplete component, its Upload page integration, and necessary tests.
