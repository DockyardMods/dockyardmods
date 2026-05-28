import { z } from 'zod';
import { nonEmptyString } from './constants/non-empty-string.ts';
import { modDependencySchema } from './mod-dependency-schema.ts';
import { modMediaSchema } from './mod-media-schema.ts';
import { modPackageSchema } from './mod-package-schema.ts';

export const modManifestSchema = z
	.strictObject({
		manifestVersion: z.literal(1),
		name: nonEmptyString,
		summary: nonEmptyString,
		version: nonEmptyString,
		authors: z.array(nonEmptyString).min(1),
		gameVersionId: nonEmptyString,
		packages: z.array(modPackageSchema).min(1),
		description: nonEmptyString.optional(),
		tags: z.array(nonEmptyString).optional(),
		changelog: nonEmptyString.optional(),
		dependencies: z.array(modDependencySchema).optional(),
		license: nonEmptyString.optional(),
		media: z.array(modMediaSchema).optional()
	})
	.meta({ title: 'Dockyard Mod Manifest' });
