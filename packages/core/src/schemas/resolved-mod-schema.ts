import { z } from 'zod';
import { modEntrySchema } from './mod-entry-schema.ts';
import { modManifestSchema } from './mod-manifest-schema.ts';
import { resolvedModMediaSchema } from './resolved-mod-media-schema.ts';

export const resolvedModSchema = modManifestSchema
	.omit({
		manifestVersion: true,
		icon: true,
		media: true
	})
	.extend({
		repo: modEntrySchema.shape.repo,
		ref: modEntrySchema.shape.ref,
		manifestPath: modEntrySchema.shape.manifestPath,
		manifestUrl: z.url(),
		media: resolvedModMediaSchema,
		certification: modEntrySchema.shape.certification
	})
	.meta({ title: 'Resolved Mod' });
