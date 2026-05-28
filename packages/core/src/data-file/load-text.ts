import { readFile } from 'node:fs/promises';
import { t } from 'try';

export const loadText = async (location: string): Promise<string> => {
	if (URL.canParse(location)) {
		const responseResult = await t(() => fetch(location));

		if (!responseResult.ok) {
			throw new Error(`Failed to fetch "${location}".`, { cause: responseResult.error });
		}

		if (!responseResult.value.ok) {
			throw new Error(
				`Failed to fetch "${location}": ${String(responseResult.value.status)} ${
					responseResult.value.statusText
				}`
			);
		}

		const textResult = await t(() => responseResult.value.text());

		if (!textResult.ok) {
			throw new Error(`Failed to read response text from "${location}".`, {
				cause: textResult.error
			});
		}

		return textResult.value;
	}

	const textResult = await t(() => readFile(location, 'utf8'));

	if (!textResult.ok) {
		throw new Error(`Failed to read "${location}".`, { cause: textResult.error });
	}

	return textResult.value;
};
