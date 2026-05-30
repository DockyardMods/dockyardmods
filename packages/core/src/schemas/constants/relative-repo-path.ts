import { z } from 'zod';

export const relativeRepoPath = z
	.string()
	.min(1)
	.refine((path) => !path.startsWith('/'), 'path must be relative')
	.refine((path) => !path.includes('\\'), 'path must use forward slashes')
	.refine((path) => !path.split('/').includes('..'), 'path must not contain .. segments')
	.refine((path) => !path.split('/').includes(''), 'path must not contain empty segments');
