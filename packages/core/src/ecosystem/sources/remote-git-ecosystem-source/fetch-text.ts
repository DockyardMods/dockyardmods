import { t } from 'try';

/**
 * Fetches a remote text resource.
 *
 * @throws When the request fails or the response body cannot be read.
 */
export const fetchText = async (
	url: string,
	throwReadError: (message: string, cause?: unknown) => never
): Promise<string> => {
	const responseResult = await t(() => fetch(url));

	if (!responseResult.ok) {
		throwReadError(`Failed to fetch "${url}".`, responseResult.error);
	}

	if (!responseResult.value.ok) {
		throwReadError(`Failed to fetch "${url}": ${String(responseResult.value.status)}.`);
	}

	const textResult = await t(() => responseResult.value.text());

	if (!textResult.ok) {
		throwReadError(`Failed to read response text from "${url}".`, textResult.error);
	}

	return textResult.value;
};
