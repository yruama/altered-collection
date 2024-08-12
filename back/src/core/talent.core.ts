import Error_talent from "@errors/talent.json";
import { Talent } from "@type/talent";
import { knex } from "../app";

export default class CoreTalent {
	/**
	 * Add a new talent in database
	 * @param {Talent} talent
	 * @returns {*}  {Promise<number[]>}
	 * @memberof CoreTalent
	 */
	async add(talent: Talent): Promise<number[]> {
		try {
			const talentCreated = await knex("TALENT").insert({
				NAME_FR: talent.NAME_FR,
				NAME_EN: talent.NAME_EN,
				DESCRIPTION_FR: talent.DESCRIPTION_FR,
				DESCRIPTION_EN: talent.DESCRIPTION_EN,
				TALENT_ID: talent.TALENT_ID
			});

			return talentCreated;
		} catch (error) {
			console.error("[CORE_TALENT.add] : ", error);
			throw error;
		}
	}

	/**
	 * Get a talent from his english name
	 * @param {string} name
	 * @returns {*}  {Promise<Talent>}
	 * @memberof CoreTalent
	 */
	async getByEnglishName(name: string): Promise<Talent> {
		try {
			const talent = await knex.select("*").from("TALENT").where("NAME_EN", name);

			if (talent.length <= 0) throw new InternalError(Error_talent.READ.NOT_FOUND.single);
			return talent[0];
		} catch (error) {
			console.error("[CORE_TALENT.getByEnglishName] : ", error);
			throw error;
		}
	}

	/**
	 * Get a talent by his id
	 * @param {number} id
	 * @returns {*}  {Promise<Talent>}
	 * @memberof CoreTalent
	 */
	async get(id: number): Promise<Talent> {
		try {
			const talent = await knex.select("*").from("TALENT").where("TALENT_ID", id);

			if (talent.length <= 0) throw new InternalError(Error_talent.READ.NOT_FOUND.single);
			return talent[0];
		} catch (error) {
			console.error("[CORE_TALENT.get] : ", error);
			throw error;
		}
	}

	/**
	 * Get all talents
	 * @returns {*}  {Promise<Talent[]>}
	 * @memberof CoreTalent
	 */
	async getAll(): Promise<Talent[]> {
		try {
			const talent = await knex.select("*").from("TALENT");

			if (talent.length <= 0) throw new InternalError(Error_talent.READ.NOT_FOUND.multiple);
			return talent;
		} catch (error) {
			console.error("[CORE_TALENT.getAll] : ", error);
			throw error;
		}
	}
}