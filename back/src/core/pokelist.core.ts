import { Pokelist } from "@type/pokelist";
import { knex } from "../app";
import Error_pokelist from "@errors/pokelist.json";

export default class CorePokelist {
	/**
	 * Add a new pokelist in database
	 * @param {Pokelist} pokelist
	 * @param {number} total
	 * @returns {*}  {Promise<number[]>}
	 * @memberof CorePokelist
	 */
	async add(pokelist: Pokelist, total: number): Promise<number[]> {
		try {
			const newPokelist = await knex.insert({
				NAME: pokelist.NAME,
				IMAGE: pokelist.DESCRIPTION,
				USER_ID: pokelist.USER_ID,
				FILTER: pokelist.FILTER,
				TOTAL: total
			});

			return newPokelist;
		} catch (error) {
			console.error("[CORE_POKELIST.add] : ", error);
			throw error;
		}
	}

	/**
	 * Get a pokelist from database by his id
	 * @param {number} id
	 * @param {number} userId
	 * @returns {*}  {Promise<Pokelist>}
	 * @memberof CorePokelist
	 */
	async get(id: number, userId: number): Promise<Pokelist> {
		try {
			const pokelist = await knex.select("*").from("POKELIST").where("ID", id).andWhere("USER_ID", userId);

			if (pokelist.length > 0) throw new InternalError(Error_pokelist.READ.NOT_FOUND.single);
			return pokelist[0];
		} catch (error) {
			console.error("[CORE_POKELIST.get] : ", error);
			throw error;
		}
	}

	/**
	 * Delete a pokelist from database by his id and userId
	 * @param {number} id
	 * @param {number} userId
	 * @returns {*}  {Promise<number>}
	 * @memberof CorePokelist
	 */
	async delete(id: number, userId: number): Promise<number> {
		try {
			const pokelist = await knex("POKELIST").where("ID", id).andWhere("USER_ID", userId).del();

			return pokelist;
		} catch (error) {
			console.error("[CORE_POKELIST.delete] : ", error);
			throw error;
		}
	}

	/**
	 * Get all pokelists from database by userId
	 * @param {number} userId
	 * @returns {*}  {Promise<Pokelist[]>}
	 * @memberof CorePokelist
	 */
	async getAllByUser(userId: number): Promise<Pokelist[]> {
		try {
			const pokelist = await knex.select("*").from("POKELIST").where("USER_ID", userId);

			if (pokelist.length <= 0) throw new InternalError(Error_pokelist.READ.NOT_FOUND.multiple);
			return pokelist;
		} catch (error) {
			console.error("[CORE_POKELIST.getAll] : ", error);
			throw error;
		}
	}
}
