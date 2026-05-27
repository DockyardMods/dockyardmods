# Dockyard Mods

Monorepo for the Dockyard Mods website and shared packages.

## Workspace

- `apps/website` - SvelteKit static site generated with `sv`
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
pnpm dev
pnpm check
pnpm build
pnpm lint
pnpm test
pnpm format
```
