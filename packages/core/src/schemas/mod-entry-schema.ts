import { z } from 'zod';
import { certificationSchema } from './certification-schema.ts';
import { dockyardRepoRegex } from './constants/dockyard-repo-regex.ts';
import { gitCommitShaRegex } from './constants/git-commit-sha-regex.ts';
import { modIdRegex } from './constants/mod-id-regex.ts';
import { relativeRepoPath } from './constants/relative-repo-path.ts';

export const modEntrySchema = z
	.strictObject({
		id: z.string().regex(modIdRegex),
		repo: z.string().regex(dockyardRepoRegex),
		manifestPath: relativeRepoPath,
		ref: z.string().regex(gitCommitShaRegex, 'ref must be a full 40-character git commit SHA'),
		certification: certificationSchema.optional()
	})
	.meta({ title: 'Dockyard Mod Entry' });
