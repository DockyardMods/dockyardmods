# Dockyard Mods

Monorepo for the Dockyard Mods website and shared packages.

## Workspace

- `apps/website` - SvelteKit static site generated with `sv`
- `packages/core` - reusable schemas, types, registry helpers, manifest helpers, and generated JSON Schemas
- `packages/scripts` - executable registry tooling wrappers
- `packages/ui` - shared Svelte UI package

## Tooling

Tools are managed with `mise`:

```sh
mise install
```

Dependencies are managed with pnpm:

```sh
pnpm install
```

## Scripts

```sh
pnpm dev:web
pnpm check
pnpm build
pnpm lint
pnpm test
pnpm format
```

## Registry Tooling

```sh
pnpm --filter @dockyardmods/scripts generate:schemas
pnpm --filter @dockyardmods/scripts validate-registry /path/to/registry.json
pnpm --filter @dockyardmods/scripts format-registry /path/to/registry.json
```
