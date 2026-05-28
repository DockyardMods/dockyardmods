import { t } from 'try';
import { parse as parseYaml } from 'yaml';
import { loadText } from './load-text.ts';

export const loadDataFile = async (location: string): Promise<unknown> => {
	const text = await loadText(location);
	const lower = location.toLowerCase();

	if (lower.endsWith('.yaml') || lower.endsWith('.yml')) {
		const yamlResult = t(() => parseYaml(text) as unknown);

		if (!yamlResult.ok) {
			throw new Error(`Failed to parse YAML from "${location}".`, { cause: yamlResult.error });
		}

		return yamlResult.value;
	}

	const jsonResult = t(() => JSON.parse(text) as unknown);

	if (!jsonResult.ok) {
		throw new Error(`Failed to parse JSON from "${location}".`, { cause: jsonResult.error });
	}

	return jsonResult.value;
};
