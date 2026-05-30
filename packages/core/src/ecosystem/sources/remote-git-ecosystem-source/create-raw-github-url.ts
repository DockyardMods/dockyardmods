import { MediaResolutionError } from '../../errors.ts';

/**
 * Builds a raw GitHub URL for a repository path.
 *
 * @throws When the repository URL cannot be resolved.
 */
export const createRawGitHubUrl = (repo: string, ref: string, repoPath: string): string => {
	const repoUrl = new URL(repo);
	const [, owner, name] = repoUrl.pathname.split('/');

	if (owner.length === 0 || name.length === 0) {
		throw new MediaResolutionError(`Failed to resolve GitHub repository URL "${repo}".`);
	}

	const encodedPath = repoPath.split('/').map(encodeURIComponent).join('/');

	return `https://raw.githubusercontent.com/${owner}/${name}/${ref}/${encodedPath}`;
};
