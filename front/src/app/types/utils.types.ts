export interface APIResult {
	status: 'success' | 'error'; // can only be one of these
	result: any;
	message: any;
}
