#!/usr/bin/env node

import { writeFile } from 'node:fs/promises';
import { parseJsonFile, registrySchema } from '@dockyardmods/core';
import { t } from 'try';
import { formatRegistry } from './format-registry-content.ts';
import { formatZodPath } from './format-zod-path.ts';

const inputPath = process.argv[2];
const outputPath = process.argv[3] ?? inputPath;

if (!inputPath || process.argv.length > 4) {
	console.error(
		'Usage: pnpm --filter @dockyardmods/scripts format-registry <registry-path> [output-path]'
	);
	process.exit(2);
}

const registryResult = await t(() => parseJsonFile(inputPath));

if (!registryResult.ok) {
	console.error('Unable to load registry.');
	console.error(registryResult.error);
	process.exit(2);
}

const validationResult = registrySchema.safeParse(registryResult.value);

if (!validationResult.success) {
	console.error('Registry validation failed:');

	for (const issue of validationResult.error.issues) {
		console.error(`${formatZodPath(issue.path) || '/'}: ${issue.message}`);
	}

	process.exit(1);
}

const formatted = formatRegistry(validationResult.data);
const writeResult = await t(() => writeFile(outputPath, formatted));

if (!writeResult.ok) {
	console.error('Unable to write formatted registry.');
	console.error(writeResult.error);
	process.exit(2);
}

console.log(`Formatted registry written to ${outputPath}`);
