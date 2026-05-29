import { join } from 'node:path';
import type { DockyardModEntry } from '../types.ts';
import type { DockyardEcosystemLayout } from './create-dockyard-ecosystem-layout.ts';

/**
 * Resolves the local manifest path for a registry entry in a Dockyard ecosystem layout.
 */
export const getManifestPathForRegistryEntry = (
	layout: DockyardEcosystemLayout,
	entry: DockyardModEntry
): string => join(layout.manifestsDir, entry.id, entry.manifestPath);
