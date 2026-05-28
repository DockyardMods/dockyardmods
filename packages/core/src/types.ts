import type { z } from 'zod';
import type { certificationSchema } from './schemas/certification-schema.ts';
import type { modDependencySchema } from './schemas/mod-dependency-schema.ts';
import type { modEntrySchema } from './schemas/mod-entry-schema.ts';
import type { modManifestSchema } from './schemas/mod-manifest-schema.ts';
import type { modMediaSchema } from './schemas/mod-media-schema.ts';
import type { modPackageSchema } from './schemas/mod-package-schema.ts';
import type { registrySchema } from './schemas/registry-schema.ts';

export type Certification = z.infer<typeof certificationSchema>;
export type DockyardModDependency = z.infer<typeof modDependencySchema>;
export type DockyardModEntry = z.infer<typeof modEntrySchema>;
export type DockyardModManifest = z.infer<typeof modManifestSchema>;
export type DockyardModMedia = z.infer<typeof modMediaSchema>;
export type DockyardModPackage = z.infer<typeof modPackageSchema>;
export type DockyardModRegistry = z.infer<typeof registrySchema>;

export type RegistryLintIssue = {
	code:
		| 'duplicate-mod-id'
		| 'duplicate-repo'
		| 'invalid-certification-expires-at'
		| 'invalid-registry-schema';
	message: string;
	path: string;
	value?: unknown;
};

export type RegistryLintResult = {
	ok: boolean;
	issues: RegistryLintIssue[];
};
