#!/usr/bin/env node

import { lintRegistry, loadDataFile } from '@dockyardmods/core';
import { t } from 'try';

const registryPath = process.argv[2];

if (!registryPath || process.argv.length > 3) {
	console.error('Usage: pnpm --filter @dockyardmods/scripts lint-registry <registry-path>');
	process.exit(2);
}

const registryResult = await t(() => loadDataFile(registryPath));

if (!registryResult.ok) {
	console.error('Unable to load registry.');
	console.error(registryResult.error);
	process.exit(2);
}

const lintResult = t(() => lintRegistry(registryResult.value));

if (!lintResult.ok) {
	console.error('Unable to lint registry.');
	console.error(lintResult.error);
	process.exit(2);
}

if (!lintResult.value.ok) {
	console.error('Registry validation failed:');

	for (const issue of lintResult.value.issues) {
		console.error(`${issue.path || '/'}: ${issue.message}`);
	}

	process.exit(1);
}

console.log('Registry validation passed.');
