import type { DockyardModEntry, DockyardModMedia } from '../../../types.ts';
import type { ResolvedMod } from '../../types.ts';
import { resolveRepoRelativeUrl } from './resolve-repo-relative-url.ts';

type ResolvedMediaItem = NonNullable<ResolvedMod['media']['items']>[number];

/**
 * Resolves manifest media paths into remote media links.
 */
export const resolveMediaItem = (
	entry: DockyardModEntry,
	manifestPath: string,
	media: DockyardModMedia
): ResolvedMediaItem => ({
	type: media.type,
	url: resolveRepoRelativeUrl(entry, manifestPath, media.path),
	...(media.alt === undefined ? {} : { alt: media.alt }),
	...(media.thumbnailPath === undefined
		? {}
		: { thumbnailUrl: resolveRepoRelativeUrl(entry, manifestPath, media.thumbnailPath) })
});
