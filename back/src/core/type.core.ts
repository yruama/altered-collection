import Error_type from "@errors/type.json";
import { Type } from "@type/type";
import { knex } from "../app";

export default class CoreType {
	/**
	 * Add a new type in database
	 * @param {Type} type
	 * @returns {*}  {Promise<number[]>}
	 * @memberof CoreType
	 */
	async add(type: Type): Promise<number[]> {
		try {
			const typeCreated = await knex("TYPE").insert({
				NAME: type.NAME
			});

			return typeCreated;
		} catch (error) {
			console.error("[CORE_TYPE.add] : ", error);
			throw error;
		}
	}

	/**
	 * Get a type from database by his id
	 * @param {number} id
	 * @returns {*}  {Promise<Type>}
	 * @memberof CoreType
	 */
	async get(id: string): Promise<Type> {
		try {
			const type = await knex.select("*").from("TYPE").where("ID", id);

			if (type.length <= 0) throw new InternalError(Error_type.READ.NOT_FOUND.single);
			return type[0];
		} catch (error) {
			console.error("[CORE_TYPE.get] : ", error);
			throw error;
		}
	}

	/**
	 * Get a type by his english name
	 * @param {string} name
	 * @returns {*}  {Promise<Type>}
	 * @memberof CoreType
	 */
	async getByEnglishName(name: string): Promise<Type> {
		try {
			const type = await knex.select("*").from("TYPE").where("NAME", name);

			if (type.length <= 0) throw new InternalError(Error_type.READ.NOT_FOUND.single);
			return type[0];
		} catch (error) {
			console.error("[CORE_TYPE.getByEnglishName] : ", error);
			throw error;
		}
	}

	/**
	 * Get all types from database
	 * @returns {*}  {Promise<Type[]>}
	 * @memberof CoreType
	 */
	async getAll(): Promise<Type[]> {
		try {
			const type = await knex.select("*").from("TYPE");

			if (type.length <= 0) throw new InternalError(Error_type.READ.NOT_FOUND.multiple);
			return type;
		} catch (error) {
			console.error("[CORE_TYPE.getAll] : ", error);
			throw error;
		}
	}
}
