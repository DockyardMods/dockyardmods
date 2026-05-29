import { t } from 'try';
import { parse as parseYaml } from 'yaml';
import { readTextFile } from './read-text-file.ts';

/**
 * Parses a local YAML file.
 *
 * @throws When the file cannot be read or contains invalid YAML.
 */
export const parseYamlFile = async (path: string): Promise<unknown> => {
	const text = await readTextFile(path);
	const yamlResult = t(() => parseYaml(text) as unknown);

	if (!yamlResult.ok) {
		throw new Error(`Failed to parse YAML from "${path}".`, { cause: yamlResult.error });
	}

	return yamlResult.value;
};
