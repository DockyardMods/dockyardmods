import { z } from 'zod';
import { nonEmptyString } from './constants/non-empty-string.ts';
import { modEntrySchema } from './mod-entry-schema.ts';

export const registrySchema = z
	.strictObject({
		$schema: z.literal('./schemas/registry.schema.json'),
		version: z.literal(1),
		currentGameVersionId: nonEmptyString,
		mods: z.array(modEntrySchema)
	})
	.meta({ title: 'Dockyard Mod Registry' });
