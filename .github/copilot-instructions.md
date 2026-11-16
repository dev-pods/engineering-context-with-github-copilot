# Project Guidelines

> [!NOTE]
> These are durable project conventions. The current lesson defines the delivery and its acceptance criteria; instructions do not replace reading the relevant source files.

## Architecture

- This is a GitHub Skills exercise built with Next.js App Router and TypeScript.
- Keep UI components in `src/components` and shared data in `src/lib`.
- Preserve the starter scope: learners expand tag data, implement upload tag suggestions and keyboard interaction, and add regression tests.

| Area | Source | Invariant |
| --- | --- | --- |
| Tag data | [`src/lib/mock-tag-data.ts`](../src/lib/mock-tag-data.ts) | `AVAILABLE_TAGS` derives from `PHOTO_TAGS`; do not create a parallel catalog |
| Upload integration | [`src/app/upload/page.tsx`](../src/app/upload/page.tsx) | Preserve the other fields and file-selection behavior |
| UI components | [`src/components/`](../src/components/) | Keep the autocomplete and any client wrapper within the existing component structure |
| Visual language | [`src/app/globals.css`](../src/app/globals.css) | Reuse existing styling and visible focus |

## Interaction Design

- Prefer native HTML semantics and keyboard interaction before adding abstractions.
- A suggestion input must expose combobox/listbox roles, visible focus, and descriptive labels.
- Reuse the visual language in `src/app/globals.css`; do not introduce another UI library.

## Build And Test

- Run `npm test` for starter health and learner tests.
- Run the behavior contract named by the current lesson in `.github/steps/`. The full `npm run test:solution` intentionally fails before the learner completes the implementation.
- Run `npm run lint` and `npm run build` before proposing completion.

| Check | Purpose |
| --- | --- |
| `npm test` | Starter health and learner tests present in the repository |
| The lesson's `npm run test:solution` command | Acceptance behaviors for the current delivery, including its file/name filters |
| `npm run test:learner` in steps 5 and 6 | At least two executed and passing learner tests |
| `npm run lint` and `npm run build` | Static analysis and compilation |

## Boundaries

- Do not add authentication, persistence, APIs, MCP servers, custom agents, or deployment.
- Do not modify acceptance contracts in `tests/solution/` to make learner checks pass.
- Follow the current lesson in `.github/steps/`; there are no evidence worksheets to complete.
- Keep learner changes limited to tag data, the autocomplete component, its Upload page integration, regression tests and the test skill requested by the lesson.

## Official References

- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components): state ownership and serializable data across the boundary.
- [WAI-ARIA combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/): keyboard interaction and announced state.
- [VS Code custom instructions](https://code.visualstudio.com/docs/agent-customization/custom-instructions): how project conventions are supplied to the agent.
