import Error_pokemon from "@errors/pokemon.json";
import { Pokemon } from "@type/pokemon";
import { knex } from "../app";
import { parserObject } from "./utils.core";

export default class CorePokemon {
	/**
	 * Add a pokemon in database
	 * @param {Pokemon} pokemon
	 * @returns {*}  {Promise<number[]>}
	 * @memberof CorePokemon
	 */
	async add(pokemon: Pokemon): Promise<number[]> {
		try {
			const pokemonCreated = await knex("POKEMON").insert({
				POKEMON_ID: pokemon.POKEMON_ID,
				NAME_FR: pokemon.NAME_FR,
				NAME_EN: pokemon.NAME_EN,
				DESCRIPTION_FR: pokemon.DESCRIPTION_FR,
				DESCRIPTION_EN: pokemon.DESCRIPTION_EN,
				CATEGORY: pokemon.CATEGORY,
				TYPE_ID_1: pokemon.TYPE_ID_1,
				TYPE_ID_2: pokemon.TYPE_ID_2,
				TALENT: pokemon.TALENT,
				SHAPE_ID: pokemon.SHAPE_ID,
				GENERATION: pokemon.GENERATION,
				INFORMATIONS: pokemon.INFORMATION,
				EVOLUTION_ID: pokemon.EVOLUTION_ID,
				COLOR: pokemon.COLOR
			});

			return pokemonCreated;
		} catch (error) {
			console.error("[CORE_POKEMON.add] : ", error);
			throw error;
		}
	}

	/**
	 * Get a pokemon from database by his id
	 * @param {string} id
	 * @returns {*}  {Promise<Pokemon>}
	 * @memberof CorePokemon
	 */
	async get(id: string): Promise<Pokemon> {
		try {
			const pokemon = await knex.select("*").from("POKEMON").where("POKEMON_ID", id);

			if (pokemon.length <= 0) throw new InternalError(Error_pokemon.READ.NOT_FOUND.single);
			return parserObject(pokemon[0]);
		} catch (error) {
			console.error("[CORE_POKEMON.get] : ", error);
			throw error;
		}
	}

	/**
	 * Get pokemon by pagination
	 * @param {number} offset
	 * @param {number} limit
	 * @returns {*}  {Promise<Pokemon[]>}
	 * @memberof CorePokemon
	 */
	async getWithPagination(offset: number, limit: number): Promise<Pokemon[]> {
		try {
			const pokemon = await knex.select("*").from("POKEMON").limit(limit).offset(offset).orderBy("POKEMON_ID", "asc");

			if (pokemon.length <= 0) throw new InternalError(Error_pokemon.READ.NOT_FOUND.multiple);

			return parserObject(pokemon);
		} catch (error) {
			console.error("[CORE_POKEMON.getWithPagination] : ", error);
			throw error;
		}
	}

	/**
	 * Get many pokemon from database by their ids
	 * @param {number[]} pokemonIds
	 * @returns {*}  {Promise<Pokemon[]>}
	 * @memberof CorePokemon
	 */
	async getMany(pokemonIds: number[]): Promise<Pokemon[]> {
		try {
			const pokemon = await knex.select("*").from("POKEMON").whereIn("POKEMON_ID", pokemonIds);

			if (pokemon.length <= 0) throw new InternalError(Error_pokemon.READ.NOT_FOUND.multiple);
			return pokemon;
		} catch (error) {
			console.error("[CORE_POKEMON.getMany] : ", error);
			throw error;
		}
	}

	/**
	 * Get all pokémons from user pokedex
	 * @param {number} userId
	 * @returns {*}  {Promise<Pokemon[]>}
	 * @memberof CorePokemon
	 */
	async getUserPokedex(userId: number): Promise<Pokemon[]> {
		try {
			const pokemon = await knex.select("*").from("POKEMON_OWNED").where("USER_ID", userId).orderBy("POKEMON_ID", "asc");

			if (pokemon.length <= 0) throw new InternalError(Error_pokemon.READ.NOT_FOUND.multiple);
			return pokemon;
		} catch (error) {
			console.error("[CORE_POKEMON.getUserPokedex] : ", error);
			throw error;
		}
	}

	/**
	 * Add many pokemons in user pokedex
	 * @param {number} userId
	 * @param {number[]} pokemonIds
	 * @returns {*}  {Promise<boolean>}
	 * @memberof CorePokemon
	 */
	async addManyToUserPokedex(userId: number, pokemonIds: number[]): Promise<boolean> {
		try {
			for (const id of pokemonIds) {
				await knex("POKEMON_OWNED").insert({
					POKEMON_ID: id,
					USER_ID: userId,
					OWNED: 1
				});
			}

			return true;
		} catch (error) {
			console.error("[CORE_POKEMON.addManyToUserPokedex] : ", error);
			throw error;
		}
	}
}
