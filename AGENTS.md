# Repository Guidelines

## Overview

Dockyard Mods is a pnpm monorepo for the Dockyard Mods website and shared tooling.

- `apps/website` contains the SvelteKit static website. It depends on the shared UI package for reusable Svelte components.
- `packages/core` contains reusable TypeScript domain code: registry and manifest schemas, types, parsers, formatters, linters, and generated JSON Schemas.
- `packages/scripts` contains executable CLI wrappers for registry and manifest maintenance tasks.
- `packages/ui` contains shared Svelte UI components for app workspaces.

## Code Style

- Keep TypeScript in strict mode and preserve type safety. Prefer code that TypeScript can fully check over dynamic or loosely typed shortcuts.
- Keep files small. Split code into focused files and directories when a module starts mixing responsibilities.
- Optimize for readable code: clear names, direct control flow, and straightforward module boundaries.
- Add short JSDoc summaries to functions. Do not duplicate TypeScript type annotations in prose. Include `@throws` when a function can throw.
- Prefer the `try` npm package over standard `try`/`catch` blocks for fallible operations.

## Tooling

- Use `pnpm` for package scripts and dependency management.
- Use `mise` for local tool versions.
- Run the relevant workspace checks before handing off changes, for example `pnpm --filter @dockyardmods/core check` or `pnpm --filter @dockyardmods/website check`.
