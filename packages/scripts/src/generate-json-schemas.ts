#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	modManifestSchema,
	registrySchema,
	resolvedEcosystemSchema
} from '@dockyardmods/core/schemas';
import { format, resolveConfig } from 'prettier';
import { t } from 'try';
import { z } from 'zod';

const scriptsRootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspacePackagesDirectory = resolve(scriptsRootDirectory, '..');
const schemaDirectory = resolve(workspacePackagesDirectory, 'core', 'schemas');

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const normalizeJsonSchema = (value: JsonValue): JsonValue => {
	if (Array.isArray(value)) {
		return value.map((item) => normalizeJsonSchema(item));
	}

	if (value && typeof value === 'object') {
		const normalized: { [key: string]: JsonValue } = {};

		for (const [key, item] of Object.entries(value)) {
			normalized[key] = normalizeJsonSchema(item);
		}

		if (normalized.type === 'number' && Number.isInteger(normalized.const)) {
			normalized.type = 'integer';
		}

		return normalized;
	}

	return value;
};

const writeSchema = async (fileName: string, schema: z.ZodType): Promise<void> => {
	const jsonSchema = normalizeJsonSchema(
		z.toJSONSchema(schema, { target: 'draft-07' }) as JsonValue
	);
	const outputPath = resolve(schemaDirectory, fileName);
	const configResult = await t(() => resolveConfig(outputPath));

	if (!configResult.ok) {
		throw new Error(`Failed to load Prettier config for "${outputPath}".`, {
			cause: configResult.error
		});
	}

	const formatResult = await t(() =>
		format(`${JSON.stringify(jsonSchema, null, 2)}\n`, {
			...configResult.value,
			filepath: outputPath
		})
	);

	if (!formatResult.ok) {
		throw new Error(`Failed to format JSON Schema "${outputPath}".`, { cause: formatResult.error });
	}

	const writeResult = await t(async () => {
		await mkdir(schemaDirectory, { recursive: true });
		await writeFile(outputPath, formatResult.value);
	});

	if (!writeResult.ok) {
		throw new Error(`Failed to write JSON Schema "${outputPath}".`, { cause: writeResult.error });
	}
};

const result = await t(async () => {
	await writeSchema('registry.schema.json', registrySchema);
	await writeSchema('mod-manifest.schema.json', modManifestSchema);
	await writeSchema('ecosystem-snapshot.schema.json', resolvedEcosystemSchema);
});

if (!result.ok) {
	console.error('Unable to generate JSON Schemas.');
	console.error(result.error);
	process.exit(1);
}
