import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import CoreType from "../core/type.core";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const coreType = new CoreType();


async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	/**
	 * Get all types route
	 * @memberof TypeRoutes
	 * @description Get all types route
	 * @path {GET} /type
	 * @example_success
	 * // returns an array of types
	 * {
	 * 		"statusCode": 200,
	 * 		"data": [
	 * 			{
	 * 				"ID": 1,
	 * 				"NAME": "Kanto",
	 * 				"DESCRIPTION": "Kanto region",
	 * 				"GENERATION_NO": 1,
	 * 				"MIN": 1,
	 * 				"MAX": 151,
	 * 			}
	 * 		]
	 * }
	 * @example_error
	 * // returns an error
	 * {
	 * 		"statusCode": 500,
	 * 		"error": {
	 * 			"message": "Internal Server Error",
	 * 			"description": "Error description"
	 * 		}
	 * 	}
	 */
	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const typesData = await coreType.getAll();
			await replySuccess(typesData, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
