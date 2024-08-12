import Error_shape from "@errors/shape.json";
import { Shape } from "@type/shape";
import { knex } from "../app";

export default class CoreShape {
	/**
	 * Add a new shape in database
	 * @param {Shape} shape
	 * @returns {*}  {Promise<number[]>}
	 * @memberof CoreShape
	 */
	async add(shape: Shape): Promise<number[]> {
		try {
			const shapeCreated = await knex("POKEMON").insert({
				NAME: shape.NAME
			});

			return shapeCreated;
		} catch (error) {
			console.error("[CORE_SHAPE.add] : ", error);
			throw error;
		}
	}

	/**
	 * Get a shape from database by his id
	 * @param {number} id
	 * @returns {*}  {Promise<Shape>}
	 * @memberof CoreShape
	 */
	async get(id: number): Promise<Shape> {
		try {
			const shape = await knex.select("*").from("SHAPE").where("ID", id);

			if (shape.length <= 0) throw new InternalError(Error_shape.READ.NOT_FOUND.single);
			return shape[0];
		} catch (error) {
			console.error("[CORE_SHAPE.get] : ", error);
			throw error;
		}
	}

	/**
	 * Get a shape by his english name
	 * @param {string} name
	 * @returns {*}  {Promise<Shape>}
	 * @memberof CoreShape
	 */
	async getByEnglishName(name: string): Promise<Shape> {
		try {
			const shape = await knex.select("*").from("SHAPE").where("NAME", name);

			if (shape.length <= 0) throw new InternalError(Error_shape.READ.NOT_FOUND.single);
			return shape[0];
		} catch (error) {
			console.error("[CORE_SHAPE.getByEnglishName] : ", error);
			throw error;
		}
	}

	/**
	 * Get all shape from database
	 * @returns {*}  {Promise<Shape[]>}
	 * @memberof CoreShape
	 */
	async getAll(): Promise<Shape[]> {
		try {
			const shape = await knex.select("*").from("SHAPE");

			if (shape.length <= 0) throw new InternalError(Error_shape.READ.NOT_FOUND.multiple);
			return shape;
		} catch (error) {
			console.error("[CORE_SHAPE.getAll] : ", error);
			throw error;
		}
	}
}
