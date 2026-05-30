import { z } from 'zod';
import { resolvedModMediaItemSchema } from './resolved-mod-media-item-schema.ts';

export const resolvedModMediaSchema = z
	.strictObject({
		iconUrl: z.url(),
		items: z.array(resolvedModMediaItemSchema).optional()
	})
	.meta({ title: 'Resolved Mod Media' });
