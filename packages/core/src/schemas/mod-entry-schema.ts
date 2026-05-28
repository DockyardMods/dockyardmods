import { z } from 'zod';
import { certificationSchema } from './certification-schema.ts';
import { dockyardRepoRegex } from './constants/dockyard-repo-regex.ts';
import { modIdRegex } from './constants/mod-id-regex.ts';
import { nonEmptyString } from './constants/non-empty-string.ts';

export const modEntrySchema = z
	.strictObject({
		id: z.string().regex(modIdRegex),
		version: nonEmptyString,
		repo: z.string().regex(dockyardRepoRegex),
		manifestPath: nonEmptyString,
		gameVersionId: nonEmptyString,
		certification: certificationSchema.optional()
	})
	.meta({ title: 'Dockyard Mod Entry' });
