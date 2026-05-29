# Scripts Package Guidelines

## Overview

`packages/scripts` contains executable CLI entry points for Dockyard Mods registry and manifest maintenance. The scripts should stay thin and delegate shared domain behavior to `@dockyardmods/core`; script-only file operations and formatting can live here. The registry is a JSON registry maintained at <https://github.com/DockyardMods/the-dockyard>. Mod manifests are YAML manifests; see <https://github.com/DockyardMods/mod-submission> for an example.

- `src/validate-registry.ts` runs registry validation and reports issues.
- `src/format-registry.ts` formats registry files.
- `src/validate-manifest.ts` validates mod manifest files.
- `src/generate-json-schemas.ts` generates JSON Schema artifacts from the core schemas.

## Code Style

- Keep TypeScript in strict mode and preserve type safety for CLI arguments, process exits, and core package results.
- Keep files small. Add shared CLI helpers when multiple entry points need the same argument parsing or output behavior.
- Keep code readable and operationally explicit. CLI files should make inputs, outputs, and exit behavior clear.
- Add short JSDoc summaries to functions. Do not duplicate TypeScript type annotations in prose. Include `@throws` when a function can throw.
- Prefer the `try` npm package over standard `try`/`catch` blocks for fallible operations.

## Checks

- `pnpm --filter @dockyardmods/scripts check`
- `pnpm --filter @dockyardmods/scripts lint`
- `pnpm --filter @dockyardmods/scripts fmt`
