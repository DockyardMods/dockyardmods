# UI Package Guidelines

## Overview

`packages/ui` is the shared Svelte UI package for Dockyard Mods. It should contain reusable Svelte components and component-local support code that can be consumed by app workspaces.

- `src/lib` is the intended home for exported Svelte components.
- Package exports map component imports from `@dockyardmods/ui/*` to `src/lib/*.svelte`.
- Keep website-specific layout, routing, and content in `apps/website` instead of this package.

## Code Style

- Keep TypeScript in strict mode and preserve type safety in component props, events, snippets, and supporting modules.
- Keep files small and minimal. Split large components into focused components or support modules when they combine unrelated behavior.
- Prefer one exported function per file for supporting TypeScript modules. If a helper is private to one exported function or exists only to support that function, place it near that function in a dedicated directory instead of collecting unrelated utilities in a shared file.
- Keep code readable and component APIs clear. Shared UI should avoid hidden app-specific assumptions.
- Add short JSDoc summaries to functions. Do not duplicate TypeScript type annotations in prose. Include `@throws` when a function can throw.
- Prefer the `try` npm package over standard `try`/`catch` blocks for fallible operations.

## Checks

- `pnpm --filter @dockyardmods/ui check`
- `pnpm --filter @dockyardmods/ui lint`
- `pnpm --filter @dockyardmods/ui fmt`
