import { t } from 'try';
import { registrySchema } from '../../../schemas/registry-schema.ts';
import type { DockyardModRegistry } from '../../../types.ts';
import { RegistryParseError, RegistryReadError } from '../../errors.ts';
import { fetchText } from './fetch-text.ts';

/**
 * Loads and validates a remote Dockyard registry.
 *
 * @throws When registry data cannot be read, parsed, or validated.
 */
export const loadRegistry = async (registryUrl: string): Promise<DockyardModRegistry> => {
	const text = await fetchText(registryUrl, (message, cause) => {
		throw new RegistryReadError(message, { cause });
	});
	const jsonResult = t(() => JSON.parse(text) as unknown);

	if (!jsonResult.ok) {
		throw new RegistryParseError(`Failed to parse registry JSON from "${registryUrl}".`, {
			cause: jsonResult.error
		});
	}

	const registryResult = t(() => registrySchema.parse(jsonResult.value));

	if (!registryResult.ok) {
		throw new RegistryParseError(`Registry validation failed for "${registryUrl}".`, {
			cause: registryResult.error
		});
	}

	return registryResult.value;
};
