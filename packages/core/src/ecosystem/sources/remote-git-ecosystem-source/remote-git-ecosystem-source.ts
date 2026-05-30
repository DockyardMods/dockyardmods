import type { EcosystemSource, ResolvedEcosystem } from '../../types.ts';
import { loadMod } from './load-mod.ts';
import { loadRegistry } from './load-registry.ts';

export type RemoteGitEcosystemSourceOptions = {
	registryUrl: string;
};

export class RemoteGitEcosystemSource implements EcosystemSource {
	readonly #registryUrl: string;

	constructor(options: RemoteGitEcosystemSourceOptions) {
		this.#registryUrl = options.registryUrl;
	}

	/**
	 * Reads raw remote registry and manifest data, then returns a resolved ecosystem shape.
	 *
	 * @throws When remote data cannot be read, parsed, validated, or resolved.
	 */
	async load(): Promise<unknown> {
		const registry = await loadRegistry(this.#registryUrl);
		const mods = await Promise.all(registry.mods.map((entry) => loadMod(entry)));

		return {
			version: registry.version,
			currentGameVersionId: registry.currentGameVersionId,
			mods
		} satisfies ResolvedEcosystem;
	}
}
