import { z } from 'zod';
import { nonEmptyString } from './constants/non-empty-string.ts';
import { modEntrySchema } from './mod-entry-schema.ts';

export const registrySchemaUrl =
	'https://raw.githubusercontent.com/DockyardMods/dockyardmods/main/packages/core/schemas/registry.schema.json';

export const registrySchema = z
	.strictObject({
		$schema: z.literal(registrySchemaUrl),
		version: z.literal(1),
		currentGameVersionId: nonEmptyString,
		mods: z.array(modEntrySchema)
	})
	.meta({ title: 'Dockyard Mod Registry' });
