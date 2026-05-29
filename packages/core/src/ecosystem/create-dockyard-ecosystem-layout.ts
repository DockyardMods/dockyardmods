import { join } from 'node:path';

export type DockyardEcosystemLayout = {
	root: string;
	registryPath: string;
	manifestsDir: string;
};

/**
 * Creates the canonical local Dockyard ecosystem layout for a root directory.
 */
export const createDockyardEcosystemLayout = (root: string): DockyardEcosystemLayout => ({
	root,
	registryPath: join(root, 'registry.json'),
	manifestsDir: join(root, 'manifests')
});
