import { z } from 'zod';
import { sha256Regex } from './constants/sha256-regex.ts';

export const modPackageSchema = z
	.strictObject({
		url: z.url().min(1),
		sha256: z.string().regex(sha256Regex)
	})
	.meta({ title: 'Dockyard Mod Package' });
