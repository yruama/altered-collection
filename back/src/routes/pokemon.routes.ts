import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import ClassPokemon from "src/classes/pokemon.class";
import CorePokemon from "../core/pokemon.core";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const corePokemon = new CorePokemon();
const classPokemon = new ClassPokemon();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {
	/**
	 * Get all pokemons route
	 * @memberof PokemonRoutes
	 * @description Get all pokemons route
	 * @path {GET} /pokemon
	 * @query {number} [offset] - Offset
	 * @query {number} [limit] - Limit
	 * @example_success
	 * // returns an array of pokemons
	 * {
	 * 		"statusCode": 200,
	 * 		"data": [
	 * 			{
	 * 				"ID": 1,
	 * 				"POKEMON_ID": 1,
	 * 				"NAME_EN": "Bulbasaur",
	 * 				"TYPE_1_ID": "Grass",
	 * 				"SHAPE": 3,
	 * 				"GENERATION": 1,
	 * 				...
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
			const offset = request.query.offset ? parseInt(request.query.offset) : 1;
			const limit = request.query.limit ? parseInt(request.query.limit) : 25;
			const max = request.query.limit ? parseInt(request.query.max) : null;
			const language = request.headers['accept-language'] || 'en-GB';

			const pokemons = await classPokemon.getWithPagination(offset, limit, max, language);
			await replySuccess(pokemons, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	/**
	 * Get user pokedex route
	 * @memberof PokemonRoutes
	 * @description Get user pokedex route
	 * @path {GET} /pokemon/user-pokedex
	 * @example_success
	 * // returns an array of pokemons
	 * {
	 * 		"statusCode": 200,
	 * 		"data": [
	 * 			{
	 * 				"ID": 1,
	 * 				"POKEMON_ID": 1,
	 * 				"NAME_EN": "Bulbasaur",
	 * 				"TYPE_1_ID": "Grass",
	 * 				"SHAPE": 3,
	 * 				"GENERATION": 1,
	 * 				...
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
	fastify.get("/user-pokedex", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokemons = await corePokemon.getUserPokedex(request.user.id);
			await replySuccess(pokemons, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	/**
	 * Add pokemon to user pokedex route
	 * @memberof PokemonRoutes
	 * @description Add pokemon to user pokedex route
	 * @path {POST} /pokemon/user-pokedex
	 * @body {number[]} pokemonIds - Pokemon ids
	 * @example_success
	 * // returns an array of pokemons
	 * {
	 * 		"statusCode": 200,
	 * 		"data": [
	 * 			{
	 * 				"ID": 1,
	 * 				"POKEMON_ID": 1,
	 * 				"NAME_EN": "Bulbasaur",
	 * 				"TYPE_1_ID": "Grass",
	 * 				"SHAPE": 3,
	 * 				"GENERATION": 1,
	 * 				...
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
	fastify.post("/user-pokedex", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokemon = await corePokemon.addManyToUserPokedex(request.user.id, request.body.pokemonIds);
			await replySuccess(pokemon, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	/**
	 * Get many pokemons route
	 * @memberof PokemonRoutes
	 * @description Get many pokemons route
	 * @path {POST} /pokemon/getMany
	 * @body {number[]} pokemonIds - Pokemon ids
	 * @example_success
	 * // returns an array of pokemons
	 * {
	 * 		"statusCode": 200,
	 * 		"data": [
	 * 			{
	 * 				"ID": 1,
	 * 				"POKEMON_ID": 1,
	 * 				"NAME_EN": "Bulbasaur",
	 * 				"TYPE_1_ID": "Grass",
	 * 				"SHAPE": 3,
	 * 				"GENERATION": 1,
	 * 				...
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
	fastify.post("/getMany", async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokemons = await corePokemon.getMany(request.body.pokemonIds);
			await replySuccess(pokemons, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	/**
	 * Get pokemon evolutions by chainid route
	 * @memberof PokemonRoutes
	 * @description Get pokemon by chainid route
	 * @path {GET} /pokemon/evolution/:id
	 * @param {number} id - Pokemon id
	 * @example_success
	 * // returns a pokemon
	 * {
	 * 		"statusCode": 200,
	 * 		"data": {
	 * 			"ID": 1,
	 * 			"POKEMON_ID": 1,
	 * 			"NAME_EN": "Bulbasaur",
	 * 			"TYPE_1_ID": "Grass",
	 * 			"SHAPE": 3,
	 * 			"GENERATION": 1,
	 * 			...
	 * 		}
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
	fastify.get("/evolutions/:id", async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokemons = await classPokemon.getEvolutionsOfPokemon(request.params.id);
			await replySuccess(pokemons, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	/**
	 * Get pokemon by id route
	 * @memberof PokemonRoutes
	 * @description Get pokemon by id route
	 * @path {GET} /pokemon/:id
	 * @param {number} id - Pokemon id
	 * @example_success
	 * // returns a pokemon
	 * {
	 * 		"statusCode": 200,
	 * 		"data": {
	 * 			"ID": 1,
	 * 			"POKEMON_ID": 1,
	 * 			"NAME_EN": "Bulbasaur",
	 * 			"TYPE_1_ID": "Grass",
	 * 			"SHAPE": 3,
	 * 			"GENERATION": 1,
	 * 			...
	 * 		}
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
	fastify.get("/:id", async (request: RequestType, reply: FastifyReply) => {
		try {
			const language = request.headers['accept-language'] || 'en-GB';
			const pokemon = await classPokemon.get(request.params.id, language);

			await replySuccess(pokemon, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
