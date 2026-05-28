import { t } from 'try';
import { registrySchema } from '../schemas/registry-schema.ts';
import type { RegistryLintIssue, RegistryLintResult } from '../types.ts';
import { zodPathToString } from './zod-path-to-string.ts';

export const lintRegistry = (value: unknown): RegistryLintResult => {
	const parsed = registrySchema.safeParse(value);
	const issues: RegistryLintIssue[] = [];

	if (!parsed.success) {
		for (const issue of parsed.error.issues) {
			issues.push({
				code: 'invalid-registry-schema',
				message: issue.message,
				path: zodPathToString(issue.path),
				value
			});
		}

		return {
			ok: false,
			issues
		};
	}

	const seenIds = new Set<string>();
	const seenRepos = new Set<string>();

	for (const [index, mod] of parsed.data.mods.entries()) {
		if (seenIds.has(mod.id)) {
			issues.push({
				code: 'duplicate-mod-id',
				message: `Duplicate mod id found: ${mod.id}`,
				path: `/mods/${String(index)}/id`,
				value: mod.id
			});
		}

		seenIds.add(mod.id);

		if (seenRepos.has(mod.repo)) {
			issues.push({
				code: 'duplicate-repo',
				message: `Duplicate repo URL found: ${mod.repo}`,
				path: `/mods/${String(index)}/repo`,
				value: mod.repo
			});
		}

		seenRepos.add(mod.repo);

		const certification = mod.certification;

		if (certification) {
			const dateResult = t(() => Temporal.PlainDate.from(certification.expiresAt));

			if (!dateResult.ok) {
				issues.push({
					code: 'invalid-certification-expires-at',
					message: `Certification expiration date is not valid: ${certification.expiresAt}`,
					path: `/mods/${String(index)}/certification/expiresAt`,
					value: certification.expiresAt
				});
			}
		}
	}

	return {
		ok: issues.length === 0,
		issues
	};
};
