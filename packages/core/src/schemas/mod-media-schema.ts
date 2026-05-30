import { z } from 'zod';
import { nonEmptyString } from './constants/non-empty-string.ts';
import { relativeRepoPath } from './constants/relative-repo-path.ts';

export const modMediaSchema = z
	.strictObject({
		type: z.enum(['image', 'video']),
		path: relativeRepoPath,
		alt: nonEmptyString.optional(),
		thumbnailPath: relativeRepoPath.optional()
	})
	.meta({ title: 'Dockyard Mod Media' });
