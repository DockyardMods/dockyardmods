export const zodPathToString = (path: PropertyKey[]): string =>
	path.reduce<string>((current, part) => `${current}/${String(part)}`, '');
