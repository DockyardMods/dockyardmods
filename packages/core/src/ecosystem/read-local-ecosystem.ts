import { parseManifestFile } from '../manifest/parse-manifest-file.ts';
import { parseRegistryFile } from '../registry/parse-registry-file.ts';
import type { DockyardModManifest, DockyardModRegistry } from '../types.ts';
import type { DockyardEcosystemLayout } from './create-dockyard-ecosystem-layout.ts';
import { getManifestPathForRegistryEntry } from './get-manifest-path-for-registry-entry.ts';

export type DockyardLocalEcosystem = {
	registry: DockyardModRegistry;
	manifests: Record<string, DockyardModManifest>;
};

/**
 * Reads and parses a local Dockyard ecosystem registry and its manifests.
 *
 * @throws When any registry or manifest file cannot be read, parsed, or validated.
 */
export const readLocalEcosystem = async (
	layout: DockyardEcosystemLayout
): Promise<DockyardLocalEcosystem> => {
	const registry = await parseRegistryFile(layout.registryPath);
	const manifestEntries: Array<[string, DockyardModManifest]> = await Promise.all(
		registry.mods.map(async (entry) => [
			entry.id,
			await parseManifestFile(getManifestPathForRegistryEntry(layout, entry))
		])
	);

	return {
		registry,
		manifests: Object.fromEntries(manifestEntries)
	};
};
