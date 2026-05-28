import { z } from 'zod';

export const certificationSchema = z
	.strictObject({
		expiresAt: z.iso.date()
	})
	.meta({ title: 'Certification' });
