import type { z } from 'zod';
import type { resolvedEcosystemSchema } from '../schemas/resolved-ecosystem-schema.ts';

export type ResolvedEcosystem = z.infer<typeof resolvedEcosystemSchema>;
export type ResolvedMod = ResolvedEcosystem['mods'][number];

export interface EcosystemSource {
	load(): Promise<unknown>;
}
