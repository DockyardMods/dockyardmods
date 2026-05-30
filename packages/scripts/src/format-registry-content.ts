import type { DockyardModRegistry } from '@dockyardmods/core/registry';
import { t } from 'try';

/**
 * Formats a registry for deterministic file output.
 *
 * @throws When the registry cannot be serialized.
 */
export const formatRegistry = (registry: DockyardModRegistry): string => {
	const sortedRegistry: DockyardModRegistry = {
		...registry,
		mods: registry.mods.toSorted((left, right) => left.id.localeCompare(right.id))
	};
	const result = t(() => `${JSON.stringify(sortedRegistry, null, 2)}\n`);

	if (!result.ok) {
		throw new Error('Failed to format registry.', { cause: result.error });
	}

	return result.value;
};
