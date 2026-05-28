import { loadDataFile } from '../data-file/load-data-file.ts';
import type { DockyardModRegistry } from '../types.ts';
import { parseRegistry } from './parse-registry.ts';

export const parseRegistryFile = async (pathOrUrl: string): Promise<DockyardModRegistry> => {
	const data = await loadDataFile(pathOrUrl);
	return parseRegistry(data);
};
