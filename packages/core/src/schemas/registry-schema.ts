import { z } from 'zod';
import { nonEmptyString } from './constants/non-empty-string.ts';
import { modEntrySchema } from './mod-entry-schema.ts';
import { type DockyardModEntry } from '../types.ts';

export const registrySchemaUrl =
	'https://raw.githubusercontent.com/DockyardMods/dockyardmods/main/packages/core/schemas/registry.schema.json';

/**
 * Adds schema issues when multiple registry entries share the same field value.
 */
const addDuplicateModFieldIssues = (
	mods: DockyardModEntry[],
	field: 'id' | 'repo',
	messagePrefix: string,
	ctx: z.RefinementCtx
): void => {
	const seenValues = new Set<string>();

	for (const [index, mod] of mods.entries()) {
		const value = mod[field];

		if (seenValues.has(value)) {
			ctx.addIssue({
				code: 'custom',
				message: `${messagePrefix}: ${value}`,
				path: ['mods', index, field]
			});
		}

		seenValues.add(value);
	}
};

export const registrySchema = z
	.strictObject({
		$schema: z.literal(registrySchemaUrl),
		version: z.literal(1),
		currentGameVersionId: nonEmptyString,
		mods: z.array(modEntrySchema)
	})
	.superRefine((registry, ctx) => {
		addDuplicateModFieldIssues(registry.mods, 'id', 'Duplicate mod id found', ctx);
		addDuplicateModFieldIssues(registry.mods, 'repo', 'Duplicate repo URL found', ctx);
	})
	.meta({ title: 'Dockyard Mod Registry' });
