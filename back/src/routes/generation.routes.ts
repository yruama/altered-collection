import { replySuccess, replyError } from "@core/route.core";
import CoreGeneration from "../core/generation.core";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import { FastifyInstanceDecorated, RequestType } from "@type/route";

const coreGeneration = new CoreGeneration();


async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	/**
	 * Get all generations route
	 * @memberof GenerationRoutes
	 * @description Get all generations route
	 * @path {GET} /generation
	 * @example_success
	 * // returns an array of generations
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
			const generationsData = await coreGeneration.getAll();
			await replySuccess(generationsData, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
