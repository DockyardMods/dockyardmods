import path from 'node:path';
import type { DockyardModEntry } from '../../../types.ts';
import { MediaResolutionError } from '../../errors.ts';
import { createRawGitHubUrl } from './create-raw-github-url.ts';

/**
 * Resolves a path relative to the manifest into a raw GitHub URL.
 *
 * @throws When the path escapes the repository root.
 */
export const resolveRepoRelativeUrl = (
	entry: DockyardModEntry,
	manifestPath: string,
	repoRelativePath: string
): string => {
	const manifestDirectory = path.posix.dirname(manifestPath);
	const resolvedPath = path.posix.normalize(path.posix.join(manifestDirectory, repoRelativePath));

	if (resolvedPath === '.' || resolvedPath.startsWith('../')) {
		throw new MediaResolutionError(
			`Failed to resolve media path "${repoRelativePath}" for manifest "${manifestPath}".`
		);
	}

	return createRawGitHubUrl(entry.repo, entry.ref, resolvedPath);
};
