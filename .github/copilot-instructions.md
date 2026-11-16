# Project Guidelines

## Architecture

- This is a GitHub Skills exercise built with Next.js App Router and TypeScript.
- Keep UI components in `src/components` and shared data in `src/lib`.
- Preserve the starter scope: learners expand tag data, implement upload tag suggestions and keyboard interaction, and add regression tests.

## Interaction Design

- Prefer native HTML semantics and keyboard interaction before adding abstractions.
- A suggestion input must expose combobox/listbox roles, visible focus, and descriptive labels.
- Reuse the visual language in `src/app/globals.css`; do not introduce another UI library.

## Build And Test

- Run `npm test` for starter health and learner tests.
- Run the behavior contract named by the current lesson in `.github/steps/`. The full `npm run test:solution` intentionally fails before the learner completes the implementation.
- Run `npm run lint` and `npm run build` before proposing completion.

## Boundaries

- Do not add authentication, persistence, APIs, MCP servers, custom agents, or deployment.
- Do not modify acceptance contracts in `tests/solution/` to make learner checks pass.
- Follow the current lesson in `.github/steps/`; there are no evidence worksheets to complete.
- Keep learner changes limited to tag data, the autocomplete component, its Upload page integration, regression tests and the test prompt requested by the lesson.
