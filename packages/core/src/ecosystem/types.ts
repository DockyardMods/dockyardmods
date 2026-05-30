export type { ResolvedEcosystem, ResolvedMod } from '../types.ts';

export interface EcosystemSource {
	load(): Promise<unknown>;
}
