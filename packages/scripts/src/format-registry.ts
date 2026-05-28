#!/usr/bin/env node

import { writeFile } from 'node:fs/promises';
import { formatRegistry, lintRegistry, parseRegistry, loadDataFile } from '@dockyardmods/core';
import { t } from 'try';

const inputPath = process.argv[2];
const outputPath = process.argv[3] ?? inputPath;

if (!inputPath || process.argv.length > 4) {
	console.error(
		'Usage: pnpm --filter @dockyardmods/scripts format-registry <registry-path> [output-path]'
	);
	process.exit(2);
}

const registryResult = await t(() => loadDataFile(inputPath));

if (!registryResult.ok) {
	console.error('Unable to load registry.');
	console.error(registryResult.error);
	process.exit(2);
}

const lintResult = t(() => lintRegistry(registryResult.value));

if (!lintResult.ok) {
	console.error('Unable to validate registry.');
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

const parseResult = t(() => parseRegistry(registryResult.value));

if (!parseResult.ok) {
	console.error('Unable to parse registry.');
	console.error(parseResult.error);
	process.exit(2);
}

const formatted = formatRegistry(parseResult.value);
const writeResult = await t(() => writeFile(outputPath, formatted));

if (!writeResult.ok) {
	console.error('Unable to write formatted registry.');
	console.error(writeResult.error);
	process.exit(2);
}

console.log(`Formatted registry written to ${outputPath}`);
