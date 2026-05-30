import { readFile } from 'node:fs/promises';
import { t } from 'try';
import { SnapshotParseError, SnapshotReadError } from '../errors.ts';
import type { EcosystemSource } from '../types.ts';

export class LocalSnapshotEcosystemSource implements EcosystemSource {
	readonly #snapshotPath: string;

	constructor(snapshotPath: string) {
		this.#snapshotPath = snapshotPath;
	}

	/**
	 * Reads and parses a local resolved ecosystem snapshot.
	 *
	 * @throws When the snapshot cannot be read or contains invalid JSON.
	 */
	async load(): Promise<unknown> {
		const textResult = await t(() => readFile(this.#snapshotPath, 'utf8'));

		if (!textResult.ok) {
			throw new SnapshotReadError(`Failed to read ecosystem snapshot "${this.#snapshotPath}".`, {
				cause: textResult.error
			});
		}

		const jsonResult = t(() => JSON.parse(textResult.value) as unknown);

		if (!jsonResult.ok) {
			throw new SnapshotParseError(`Failed to parse ecosystem snapshot "${this.#snapshotPath}".`, {
				cause: jsonResult.error
			});
		}

		return jsonResult.value;
	}
}
