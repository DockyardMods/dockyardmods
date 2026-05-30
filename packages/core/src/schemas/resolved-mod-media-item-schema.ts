import { z } from 'zod';
import { modMediaSchema } from './mod-media-schema.ts';

export const resolvedModMediaItemSchema = modMediaSchema
	.omit({
		path: true,
		thumbnailPath: true
	})
	.extend({
		url: z.url(),
		thumbnailUrl: z.url().optional()
	})
	.meta({ title: 'Resolved Mod Media Item' });
