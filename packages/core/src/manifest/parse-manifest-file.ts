import { parseYamlFile } from '../files/parse-yaml-file.ts';
import type { DockyardModManifest } from '../types.ts';
import { parseManifest } from './parse-manifest.ts';

/**
 * Parses a local YAML mod manifest file.
 *
 * @throws When the file cannot be read, parsed, or validated.
 */
export const parseManifestFile = async (path: string): Promise<DockyardModManifest> => {
	const data = await parseYamlFile(path);
	return parseManifest(data);
};
