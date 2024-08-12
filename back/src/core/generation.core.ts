import { Generation } from "@type/generation";
import { knex } from "../app";
import Error_generation from "@errors/generation.json";

export default class CoreGeneration {

	/**
	 * Get a generation from database by his number
	 * @param {number} no
	 * @returns {*}  {Promise<Generation>}
	 * @memberof CoreGeneration
	 */
	async get(no: number): Promise<Generation> {
		try {
			const generation: any[] = [];

			if (generation.length <= 0) throw new InternalError(Error_generation.READ.NOT_FOUND.single);
			return generation[0];
		} catch (error) {
			console.error("[CORE_GENERATION.get] : ", error);
			throw error;
		}
	}

	/**
	 * Get all generations from database
	 * @returns {*}  {Promise<Generation[]>}
	 * @memberof CoreGeneration
	 */
	async getAll(): Promise<Generation[]> {
		try {
			const generation = await knex.select("*").from("GENERATION");

			if (generation.length <= 0) throw new InternalError(Error_generation.READ.NOT_FOUND.multiple);
			return generation;
		} catch (error) {
			console.error("[CORE_GENERATION.getAll] : ", error);
			throw error;
		}
	}
}
