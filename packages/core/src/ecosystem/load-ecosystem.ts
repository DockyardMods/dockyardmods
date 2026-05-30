import { t } from 'try';
import { resolvedEcosystemSchema } from '../schemas/resolved-ecosystem-schema.ts';
import { ResolvedEcosystemParseError } from './errors.ts';
import type { EcosystemSource, ResolvedEcosystem } from './types.ts';

/**
 * Loads and validates a resolved Dockyard ecosystem from a source.
 *
 * @throws When the source cannot load or the resolved ecosystem is invalid.
 */
export const loadEcosystem = async (source: EcosystemSource): Promise<ResolvedEcosystem> => {
	const ecosystem = await source.load();
	const parseResult = t(() => resolvedEcosystemSchema.parse(ecosystem));

	if (!parseResult.ok) {
		throw new ResolvedEcosystemParseError('Resolved ecosystem validation failed.', {
			cause: parseResult.error
		});
	}

	return parseResult.value;
};
