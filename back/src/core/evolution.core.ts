import Error_evolution from "@errors/evolution.json";
import { Evolution } from "@type/evolution";
import { knex } from "../app";

export default class CoreEvolution {
	/**
	 * Add a new evolution to database
	 * @param {Evolution} evolution
	 * @returns {*}  {Promise<number[]>}
	 * @memberof CoreEvolution
	 */
	async add(evolution: Evolution): Promise<number[]> {
		try {
			const evolutionCreated = await knex("EVOLUTION").insert({
				GENDER: evolution.GENDER,
				HELD_ITEM: evolution.HELD_ITEM,
				ITEM: evolution.ITEM,
				KNOW_MOVE: evolution.KNOW_MOVE,
				KNOW_MOVE_TYPE: evolution.KNOW_MOVE_TYPE,
				LOCATION: evolution.LOCATION,
				MIN_AFFECTION: evolution.MIN_AFFECTION,
				MIN_BEAUTY: evolution.MIN_BEAUTY,
				MIN_HAPPINESS: evolution.MIN_HAPPINESS,
				MIN_LEVEL: evolution.MIN_LEVEL,
				NEEDS_OVERWORLDS_RAIN: evolution.NEEDS_OVERWORLDS_RAIN,
				PARTY_SPECIES: evolution.PARTY_SPECIES,
				PARTY_TYPE: evolution.PARTY_TYPE,
				RELATIVE_PHYSICAL_STATS: evolution.RELATIVE_PHYSICAL_STATS,
				TIME_OF_DAY: evolution.TIME_OF_DAY,
				TRADE_SPECIES: evolution.TRADE_SPECIES,
				TRIGGER: evolution.TRIGGER,
				POKEMON_ID: evolution.POKEMON_ID,
				CHAIN_ID: evolution.CHAIN_ID,
				LEVEL: evolution.LEVEL
			});

			return evolutionCreated;
		} catch (error) {
			console.error("[CORE_EVOLUTION.add] : ", error);
			throw error;
		}
	}

	/**
	 * Get an evolution from database by his id
	 * @param {number} id
	 * @returns {*}  {Promise<Evolution>}
	 * @memberof CoreEvolution
	 */
	async get(id: number): Promise<Evolution> {
		try {
			const evolution = await knex.select("*").from("EVOLUTION").where("ID", id);

			if (evolution.length <= 0) throw new InternalError(Error_evolution.READ.NOT_FOUND.multiple);
			return evolution[0];
		} catch (error) {
			console.error("[CORE_EVOLUTION.get] : ", error);
			throw error;
		}
	}

	/**
	 * Get evolution by chain id
	 * @param {string} chainId
	 * @returns {*}  {Promise<Evolution[]>}
	 * @memberof CoreEvolution
	 */
	async getByChainID(chainId: string): Promise<Evolution[]> {
		try {
			const evolution = await knex.select("*").from("EVOLUTION").where("CHAIN_ID", chainId);

			if (evolution.length <= 0) throw new InternalError(Error_evolution.READ.NOT_FOUND.multiple);
			return evolution;
		} catch (error) {
			console.error("[CORE_EVOLUTION.getEvolutionByChainID] : ", error);
			throw error;
		}
	}
}
