# Repository Guidelines

## Overview

Dockyard Mods is a pnpm monorepo for the Dockyard Mods website and shared tooling.

- `apps/website` contains the SvelteKit static website. It depends on the shared UI package for reusable Svelte components.
- `packages/core` contains reusable TypeScript domain code: registry and manifest schemas, types, parsers, formatters, linters, and generated JSON Schemas. The registry is a JSON registry maintained at <https://github.com/DockyardMods/the-dockyard>. Mod manifests are YAML manifests; see <https://github.com/DockyardMods/mod-submission> for an example.
- `packages/scripts` contains executable CLI wrappers for registry and manifest maintenance tasks.
- `packages/ui` contains shared Svelte UI components for app workspaces.

## Code Style

- Keep TypeScript in strict mode and preserve type safety. Prefer code that TypeScript can fully check over dynamic or loosely typed shortcuts.
- Keep files small and minimal. Prefer more small, focused files over fewer large files, and split code into directories when a module starts mixing responsibilities.
- Prefer one exported function per file. If a helper is private to one exported function or exists only to support that function, place it near that function in a dedicated directory instead of collecting unrelated utilities in a shared file.
- Optimize for readable code: clear names, direct control flow, and straightforward module boundaries.
- Add short JSDoc summaries to functions. Do not duplicate TypeScript type annotations in prose. Include `@throws` when a function can throw.
- Prefer the `try` npm package over standard `try`/`catch` blocks for fallible operations.

## Tooling

- Use `pnpm` for package scripts and dependency management.
- Use `mise` for local tool versions.
- Run the relevant workspace linting, formatting, and checking before handing off changes, for example `pnpm --filter @dockyardmods/core lint`, `pnpm --filter @dockyardmods/core format`, and `pnpm --filter @dockyardmods/core check`.

## Validation Boundaries

- `@dockyardmods/core` exposes the app-facing Zod contracts for registry and manifest parsing.
- Zod schemas should cover single-object shape checks, required fields, string formats, URLs, checksums, dates, safe relative paths, and object-local `superRefine` checks.
- Maintenance scripts should handle checks that require more than one parsed object or external state, such as registry-to-manifest ID matching, pinned manifest existence, package downloads, checksum verification, media existence, and certification expiry.
- Do not manually edit generated JSON Schema artifacts when changing Zod contracts unless that generation is explicitly requested.
