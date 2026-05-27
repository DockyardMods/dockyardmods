import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import ts from 'typescript-eslint';
import websiteSvelteConfig from './apps/website/svelte.config.js';
import uiSvelteConfig from './packages/ui/svelte.config.js';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

const svelteParserOptions = (svelteConfig) => ({
	projectService: {
		allowDefaultProject: ['*.js', 'apps/website/*.js', 'packages/ui/*.js']
	},
	extraFileExtensions: ['.svelte'],
	parser: ts.parser,
	tsconfigRootDir: import.meta.dirname,
	svelteConfig
});

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.strictTypeChecked,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ['*.js', 'apps/website/*.js', 'packages/ui/*.js']
				},
				tsconfigRootDir: import.meta.dirname
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'no-undef': 'off'
		}
	},
	{
		files: ['eslint.config.js'],
		rules: {
			'@typescript-eslint/no-unsafe-assignment': 'off'
		}
	},
	{
		files: ['apps/website/**/*.{svelte,svelte.ts,svelte.js}'],
		languageOptions: {
			parserOptions: svelteParserOptions(websiteSvelteConfig)
		}
	},
	{
		files: ['packages/ui/**/*.{svelte,svelte.ts,svelte.js}'],
		languageOptions: {
			parserOptions: svelteParserOptions(uiSvelteConfig)
		}
	}
);
