import { t } from 'try';
import { modManifestSchema } from '../schemas/mod-manifest-schema.ts';
import type { DockyardModManifest } from '../types.ts';

export const parseManifest = (value: unknown): DockyardModManifest => {
	const result = t(() => modManifestSchema.parse(value));

	if (!result.ok) {
		throw new Error('Manifest validation failed.', { cause: result.error });
	}

	return result.value;
};
