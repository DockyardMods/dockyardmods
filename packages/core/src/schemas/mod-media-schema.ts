import { z } from 'zod';
import { nonEmptyString } from './constants/non-empty-string.ts';

export const modMediaSchema = z
	.strictObject({
		type: z.enum(['image', 'video']),
		path: nonEmptyString,
		alt: nonEmptyString.optional(),
		thumbnailPath: nonEmptyString.optional()
	})
	.meta({ title: 'Dockyard Mod Media' });
