import { z } from 'zod';
import { registryBaseSchema } from './registry-schema.ts';
import { resolvedModSchema } from './resolved-mod-schema.ts';

export const resolvedEcosystemSchema = registryBaseSchema
	.omit({
		$schema: true,
		mods: true
	})
	.extend({
		mods: z.array(resolvedModSchema)
	})
	.meta({ title: 'Resolved Dockyard Ecosystem' });
