import httpCommon from "@errors/http.json";
import { FastifyReply } from "fastify";

/**
 * Reply to the client with success result
 * @param {*} result
 * @param {FastifyReply} replyObj
 * @param {string} restVerb
 * @returns {*}  {Promise<void>}
 */
const replySuccess = async (result: any, replyObj: FastifyReply, restVerb: string): Promise<void> => {
	try {
		let code = httpCommon.SUCCESS.ok.code;

		switch (restVerb) {
			case "post":
				code = httpCommon.SUCCESS.created.code;
				break;
			case "put":
				code = httpCommon.SUCCESS.created.code;
				break;
			case "patch":
				code = httpCommon.SUCCESS.created.code;
			case "delete":
				code = httpCommon.SUCCESS.no_content.code;
				break;
			default:
				code = httpCommon.SUCCESS.ok.code;
				break;
		}

		replyObj.statusCode = code;
		await replyObj.send(result);
	} catch (error) {
		console.error("[CORE_ROUTE.replySuccess] : ", error);
		await replyError(httpCommon.SERVER_ERROR.internal_server_error, replyObj);
	}
};

/**
 * Reply to the client with error result
 * @param {*} error
 * @param {FastifyReply} replyObj
 * @returns {*}  {Promise<void>}
 */
const replyError = async (error: any, replyObj: FastifyReply): Promise<void> => {
	if (error instanceof InternalError) {
		let { errorObj } = error;

		if (!errorObj) {
			errorObj = httpCommon.SERVER_ERROR.internal_server_error;
		}

		replyObj.statusCode = errorObj.code;
		await replyObj.send({
			message: errorObj.message,
			description: errorObj.description
		});
	}
};

export { replySuccess, replyError };
