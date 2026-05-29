#!/usr/bin/env node

import { parseJsonFile, registrySchema } from '@dockyardmods/core';
import { t } from 'try';
import { formatZodPath } from './format-zod-path.ts';

const registryPath = process.argv[2];

if (!registryPath || process.argv.length > 3) {
	console.error('Usage: pnpm --filter @dockyardmods/scripts validate-registry <registry-path>');
	process.exit(2);
}

const registryResult = await t(() => parseJsonFile(registryPath));

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

console.log('Registry validation passed.');
