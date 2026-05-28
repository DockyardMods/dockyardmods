import { z } from 'zod';
import { modIdRegex } from './constants/mod-id-regex.ts';
import { nonEmptyString } from './constants/non-empty-string.ts';

export const modDependencySchema = z
	.strictObject({
		id: z.string().regex(modIdRegex),
		version: nonEmptyString
	})
	.meta({ title: 'Dockyard Mod Dependency' });
