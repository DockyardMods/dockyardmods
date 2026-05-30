#!/usr/bin/env node

import { writeFile } from 'node:fs/promises';
import { parseRegistryFile } from '@dockyardmods/core/registry';
import { t } from 'try';
import { formatRegistry } from './format-registry-content.ts';

const inputPath = process.argv[2];
const outputPath = process.argv[3] ?? inputPath;

if (!inputPath || process.argv.length > 4) {
	console.error(
		'Usage: pnpm --filter @dockyardmods/scripts format-registry <registry-path> [output-path]'
	);
	process.exit(2);
}

const registryResult = await t(() => parseRegistryFile(inputPath));

if (!registryResult.ok) {
	console.error('Registry validation failed.');
	console.error(registryResult.error);
	process.exit(1);
}

const formatted = formatRegistry(registryResult.value);
const writeResult = await t(() => writeFile(outputPath, formatted));

if (!writeResult.ok) {
	console.error('Unable to write formatted registry.');
	console.error(writeResult.error);
	process.exit(2);
}

console.log(`Formatted registry written to ${outputPath}`);
