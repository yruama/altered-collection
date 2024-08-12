import { replySuccess, replyError } from "@core/route.core";
import CorePokelist from "../core/pokelist.core";
import { Pokelist } from "../types/pokelist";
import ClassPokelist from "../classes/pokelist.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import { FastifyInstanceDecorated, RequestType } from "@type/route";

const corePokelist = new CorePokelist();
const classPokelist = new ClassPokelist();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {
	/**
	 * Add a new pokelist route
	 * @memberof PokelistRoutes
	 * @description Add a new pokelist route
	 * @path {POST} /pokelist
	 * @body {Pokelist} - Pokelist object
	 * @example_success
	 * // returns the pokelist affected rows
	 * {
	 * 			"statusCode": 200,
	 * 			"data": 3
	 * 	}
	 * @example_error
	 * // returns an error
	 * {
	 * 		"statusCode": 500,
	 * 		"error": {
	 * 			"message": "Internal Server Error",
	 * 			"description": "Error description"
	 * 	}
	 */	
	fastify.post("/", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const list: Pokelist = {
				NAME: request.body.pokelist.NAME,
				DESCRIPTION: request.body.pokelist.DESCRIPTION,
				USER_ID: request.user.id,
				FILTER: request.body.filter,
				TOTAL: 0
			};

			const pokelistData = await classPokelist.add(list);
			await replySuccess(pokelistData, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	/**
	 * Get all pokelists route
	 * @memberof PokelistRoutes
	 * @description Get all pokelists route
	 * @path {GET} /pokelist
	 * @example_success
	 * // returns an array of pokelists
	 * {
	 * 		"statusCode": 200,
	 * 		"data": [
	 * 			{
	 * 				"ID": 1,
	 * 				"NAME": "My pokelist",
	 * 				"DESCRIPTION": "My pokelist description",
	 * 				"USER_ID": 1,
	 * 				"FILTER": "all",
	 * 				"TOTAL": 0
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
	 * }
	 */
	fastify.get("/", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokelistData = await corePokelist.getAllByUser(request.user.id);
			await replySuccess(pokelistData, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	/**
	 * Get a pokelist route
	 * @memberof PokelistRoutes
	 * @description Get a pokelist route
	 * @path {GET} /pokelist/:id
	 * @param {number} id - Pokelist id
	 * @example_success
	 * // returns a pokelist
	 * {
	 * 		"statusCode": 200,
	 * 		"data": {
	 * 			"ID": 1,
	 * 			"NAME": "My pokelist",
	 * 			"DESCRIPTION": "My pokelist description",
	 * 			"USER_ID": 1,
	 * 			"FILTER": "all",
	 * 			"TOTAL": 0
	 * 		}
	 * }
	 * @example_error
	 * // returns an error
	 * {
	 * 		"statusCode": 500,
	 * 		"error": {
	 * 			"message": "Internal Server Error",
	 * 			"description": "Error description"
	 * 	}
	 */
	fastify.get("/:id", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokelistData = await classPokelist.get();
			await replySuccess(pokelistData, reply, "get");
		} catch (error) {
			await replyError(error, reply);		}
	});

	fastify.delete("/:id", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const id = typeof request.params.id === "string" ? parseInt(request.params.id) : request.params.id;
			const pokelistData = await corePokelist.delete(id, request.user.id);
			await replySuccess(pokelistData, reply, "delete");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
