import type { DockyardModEntry, DockyardModManifest } from '../../../types.ts';
import type { ResolvedMod } from '../../types.ts';
import { resolveMediaItem } from './resolve-media-item.ts';
import { resolveRepoRelativeUrl } from './resolve-repo-relative-url.ts';

/**
 * Translates a parsed manifest and registry entry into resolved mod data.
 */
export const resolveMod = (
	entry: DockyardModEntry,
	manifest: DockyardModManifest,
	manifestUrl: string
): ResolvedMod => ({
	id: entry.id,
	name: manifest.name,
	summary: manifest.summary,
	version: manifest.version,
	authors: manifest.authors,
	gameVersionId: manifest.gameVersionId,
	packages: manifest.packages,
	repo: entry.repo,
	ref: entry.ref,
	manifestPath: entry.manifestPath,
	manifestUrl,
	media: {
		iconUrl: resolveRepoRelativeUrl(entry, entry.manifestPath, manifest.icon),
		...(manifest.media === undefined
			? {}
			: {
					items: manifest.media.map((media) => resolveMediaItem(entry, entry.manifestPath, media))
				})
	},
	...(entry.certification === undefined ? {} : { certification: entry.certification }),
	...(manifest.description === undefined ? {} : { description: manifest.description }),
	...(manifest.tags === undefined ? {} : { tags: manifest.tags }),
	...(manifest.changelog === undefined ? {} : { changelog: manifest.changelog }),
	...(manifest.dependencies === undefined ? {} : { dependencies: manifest.dependencies }),
	...(manifest.license === undefined ? {} : { license: manifest.license })
});
