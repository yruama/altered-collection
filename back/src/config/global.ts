class InternalError extends Error {
	errorObj: ErrorObj;
	constructor(errorObj: ErrorObj) {
		super();
		this.errorObj = errorObj;
	}
}

interface Global {
	InternalError: typeof InternalError;
}

export const setGlobals = (): void => {
	(global as unknown as Global).InternalError = InternalError;
};
