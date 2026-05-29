import { parseJsonFile } from '../files/parse-json-file.ts';
import type { DockyardModRegistry } from '../types.ts';
import { parseRegistry } from './parse-registry.ts';

/**
 * Parses a local JSON registry file.
 *
 * @throws When the file cannot be read, parsed, or validated.
 */
export const parseRegistryFile = async (path: string): Promise<DockyardModRegistry> => {
	const data = await parseJsonFile(path);
	return parseRegistry(data);
};
