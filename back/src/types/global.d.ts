interface ErrorObj {
	message: string;
	code: number;
	description: string;
}

class InternalError extends Error {
	errorObj: ErrorObj;
	constructor(errorObj: ErrorObj) {
		super();
		this.errorObj = errorObj;
	}
}

declare global {
	interface globalThis {
		InternalError: typeof InternalError;
	}
}

// Extend the NodeJS.Global interface to include the InternalError property
declare global {
	namespace NodeJS {
		interface Global {
			InternalError: typeof InternalError;
		}
	}
}
