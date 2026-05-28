import { loadDataFile } from '../data-file/load-data-file.ts';
import type { DockyardModManifest } from '../types.ts';
import { parseManifest } from './parse-manifest.ts';

export const parseManifestFile = async (pathOrUrl: string): Promise<DockyardModManifest> => {
	const data = await loadDataFile(pathOrUrl);
	return parseManifest(data);
};
