import { t } from 'try';
import { registrySchema } from '../schemas/registry-schema.ts';
import type { DockyardModRegistry } from '../types.ts';

export const parseRegistry = (value: unknown): DockyardModRegistry => {
	const result = t(() => registrySchema.parse(value));

	if (!result.ok) {
		throw new Error('Registry validation failed.', { cause: result.error });
	}

	return result.value;
};
