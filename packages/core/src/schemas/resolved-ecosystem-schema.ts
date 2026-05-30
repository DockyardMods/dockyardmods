import { z } from 'zod';
import { registryBaseSchema } from './registry-schema.ts';
import { resolvedModSchema } from './resolved-mod-schema.ts';

export const ecosystemSnapshotSchemaUrl =
	'https://raw.githubusercontent.com/DockyardMods/dockyardmods/main/packages/core/schemas/ecosystem-snapshot.schema.json';

export const resolvedEcosystemSchema = registryBaseSchema
	.omit({
		$schema: true,
		mods: true
	})
	.extend({
		$schema: z.literal(ecosystemSnapshotSchemaUrl).optional(),
		mods: z.array(resolvedModSchema)
	})
	.meta({ title: 'Resolved Dockyard Ecosystem' });
