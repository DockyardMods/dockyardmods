export class RegistryReadError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'RegistryReadError';
	}
}

export class RegistryParseError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'RegistryParseError';
	}
}

export class ManifestReadError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'ManifestReadError';
	}
}

export class ManifestParseError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'ManifestParseError';
	}
}

export class MediaResolutionError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'MediaResolutionError';
	}
}

export class SnapshotReadError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'SnapshotReadError';
	}
}

export class SnapshotParseError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'SnapshotParseError';
	}
}

export class ResolvedEcosystemParseError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'ResolvedEcosystemParseError';
	}
}
