import { z } from 'zod';
import { gameVersionId } from './constants/game-version-id.ts';
import { modIdRegex } from './constants/mod-id-regex.ts';
import { nonEmptyString } from './constants/non-empty-string.ts';
import { relativeRepoPath } from './constants/relative-repo-path.ts';
import { modDependencySchema } from './mod-dependency-schema.ts';
import { modMediaSchema } from './mod-media-schema.ts';
import { modPackageSchema } from './mod-package-schema.ts';

export const modManifestSchema = z
	.strictObject({
		manifestVersion: z.literal(1),
		id: z.string().regex(modIdRegex, 'mod id must be kebab-case lowercase alphanumeric'),
		name: nonEmptyString,
		summary: nonEmptyString,
		version: nonEmptyString,
		authors: z.array(nonEmptyString).min(1),
		gameVersionId,
		icon: relativeRepoPath,
		packages: z.array(modPackageSchema).min(1),
		description: nonEmptyString.optional(),
		tags: z.array(nonEmptyString).optional(),
		changelog: nonEmptyString.optional(),
		dependencies: z.array(modDependencySchema).optional(),
		license: nonEmptyString.optional(),
		media: z.array(modMediaSchema).optional()
	})
	.meta({ title: 'Dockyard Mod Manifest' });
