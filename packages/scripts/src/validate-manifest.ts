#!/usr/bin/env node

import { parseManifestFile } from '@dockyardmods/core';
import { t } from 'try';

const manifestPath = process.argv[2];

if (!manifestPath || process.argv.length > 3) {
	console.error('Usage: pnpm --filter @dockyardmods/scripts validate-manifest <manifest-path>');
	process.exit(2);
}

const manifestResult = await t(() => parseManifestFile(manifestPath));

if (!manifestResult.ok) {
	console.error('Manifest validation failed.');
	console.error(manifestResult.error);
	process.exit(1);
}

console.log('Manifest validation passed.');
