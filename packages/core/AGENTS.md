# Core Package Guidelines

## Overview

`packages/core` is the shared TypeScript domain package for Dockyard Mods. It provides schema definitions, domain types, parsing, formatting, linting, and generated JSON Schema files used by other workspaces. The registry is a JSON registry maintained at <https://github.com/DockyardMods/the-dockyard>. Mod manifests are YAML manifests; see <https://github.com/DockyardMods/mod-submission> for an example.

- `src/schemas` contains Zod schema definitions and schema constants.
- `src/registry` contains registry parsing, formatting, and linting helpers.
- `src/manifest` contains mod manifest parsing helpers.
- `src/data-file` contains shared file-loading utilities.
- `schemas` contains generated JSON Schema artifacts exported by the package.

## Code Style

- Keep TypeScript in strict mode and preserve type safety. Schema-derived types should stay connected to their Zod schemas where practical.
- Keep files small. Split schemas, helpers, and transformations by domain concept instead of building large utility modules.
- Keep code readable and deterministic. Core behavior should be easy for CLI wrappers and app code to reuse.
- Add short JSDoc summaries to functions. Do not duplicate TypeScript type annotations in prose. Include `@throws` when a function can throw.
- Prefer the `try` npm package over standard `try`/`catch` blocks for fallible operations.

## Checks

- `pnpm --filter @dockyardmods/core check`
- `pnpm --filter @dockyardmods/core lint`
- `pnpm --filter @dockyardmods/core fmt`
