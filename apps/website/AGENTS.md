# Website Guidelines

## Overview

`apps/website` is the SvelteKit static site for Dockyard Mods. It owns the app routes, SvelteKit configuration, static assets, and website-specific integration with shared packages.

- `src/routes` contains SvelteKit layouts and pages.
- `src/lib` contains website-local support code and assets.
- `static` contains files served directly by the site.
- The app imports reusable Svelte components from `@dockyardmods/ui`.

## Code Style

- Keep TypeScript in strict mode and preserve type safety across Svelte components, route modules, and supporting TypeScript files.
- Keep files small and minimal. Move reusable component logic, data helpers, and page sections into focused files when pages become hard to scan.
- Prefer one exported function per file for supporting TypeScript modules. If a helper is private to one exported function or exists only to support that function, place it near that function in a dedicated directory instead of collecting unrelated utilities in a shared file.
- Keep code readable and direct. Prefer explicit data flow between route modules and components.
- Add short JSDoc summaries to functions. Do not duplicate TypeScript type annotations in prose. Include `@throws` when a function can throw.
- Prefer the `try` npm package over standard `try`/`catch` blocks for fallible operations.

## Checks

- `pnpm --filter @dockyardmods/website check`
- `pnpm --filter @dockyardmods/website lint`
- `pnpm --filter @dockyardmods/website fmt`
