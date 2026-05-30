import { z } from 'zod';

export const gameVersionId = z
	.number()
	.int('game version id must be an integer')
	.positive('game version id must be positive');
