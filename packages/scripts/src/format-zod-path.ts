/**
 * Formats a Zod issue path as a JSON pointer-like path.
 */
export const formatZodPath = (path: PropertyKey[]): string =>
	path.reduce<string>((current, part) => `${current}/${String(part)}`, '');
