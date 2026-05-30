import { t } from 'try';
import { parse as parseYaml } from 'yaml';
import { modManifestSchema } from '../../../schemas/mod-manifest-schema.ts';
import type { DockyardModEntry } from '../../../types.ts';
import type { ResolvedMod } from '../../types.ts';
import { ManifestParseError, ManifestReadError } from '../../errors.ts';
import { createRawGitHubUrl } from './create-raw-github-url.ts';
import { fetchText } from './fetch-text.ts';
import { resolveMod } from './resolve-mod.ts';

/**
 * Loads and validates a remote mod manifest, then resolves it with registry metadata.
 *
 * @throws When manifest data cannot be read, parsed, validated, or resolved.
 */
export const loadMod = async (entry: DockyardModEntry): Promise<ResolvedMod> => {
	const manifestUrl = createRawGitHubUrl(entry.repo, entry.ref, entry.manifestPath);
	const text = await fetchText(manifestUrl, (message, cause) => {
		throw new ManifestReadError(message, { cause });
	});
	const yamlResult = t(() => parseYaml(text) as unknown);

	if (!yamlResult.ok) {
		throw new ManifestParseError(`Failed to parse manifest YAML from "${manifestUrl}".`, {
			cause: yamlResult.error
		});
	}

	const manifestResult = t(() => modManifestSchema.parse(yamlResult.value));

	if (!manifestResult.ok) {
		throw new ManifestParseError(`Manifest validation failed for "${manifestUrl}".`, {
			cause: manifestResult.error
		});
	}

	return resolveMod(entry, manifestResult.value, manifestUrl);
};
