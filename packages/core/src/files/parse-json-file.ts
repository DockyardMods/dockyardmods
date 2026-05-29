import { t } from 'try';
import { readTextFile } from './read-text-file.ts';

/**
 * Parses a local JSON file.
 *
 * @throws When the file cannot be read or contains invalid JSON.
 */
export const parseJsonFile = async (path: string): Promise<unknown> => {
	const text = await readTextFile(path);
	const jsonResult = t(() => JSON.parse(text) as unknown);

	if (!jsonResult.ok) {
		throw new Error(`Failed to parse JSON from "${path}".`, { cause: jsonResult.error });
	}

	return jsonResult.value;
};
