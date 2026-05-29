import { readFile } from 'node:fs/promises';
import { t } from 'try';

/**
 * Reads a UTF-8 text file from the local filesystem.
 *
 * @throws When the file cannot be read.
 */
export const readTextFile = async (path: string): Promise<string> => {
	const textResult = await t(() => readFile(path, 'utf8'));

	if (!textResult.ok) {
		throw new Error(`Failed to read "${path}".`, { cause: textResult.error });
	}

	return textResult.value;
};
