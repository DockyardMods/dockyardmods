#!/usr/bin/env node

import { parseRegistryFile } from '@dockyardmods/core/registry';
import { t } from 'try';

const registryPath = process.argv[2];

if (!registryPath || process.argv.length > 3) {
	console.error('Usage: pnpm --filter @dockyardmods/scripts validate-registry <registry-path>');
	process.exit(2);
}

const registryResult = await t(() => parseRegistryFile(registryPath));

if (!registryResult.ok) {
	console.error('Registry validation failed.');
	console.error(registryResult.error);
	process.exit(1);
}

console.log('Registry validation passed.');
