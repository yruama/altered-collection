import { Pokelist } from "@type/pokelist";
import CorePokelist from "../core/pokelist.core";
import CoreGeneration from "../core/generation.core";
import CorePokemon from "../core/pokemon.core";

export default class ClassPokelist {
	private readonly corePokelist: CorePokelist;
	private readonly corePokemon: CorePokemon;
	private readonly coreGeneration: CoreGeneration;

	constructor() {
		this.corePokelist = new CorePokelist();
		this.coreGeneration = new CoreGeneration();
		this.corePokemon = new CorePokemon();
	}

	/**
	 * Add a new pokelist
	 * @param {Pokelist} pokelist
	 * @returns {*}  {Promise<number[]>}
	 * @memberof ClassPokelist
	 */
	async add(pokelist: Pokelist): Promise<number[] | boolean> {
		try {
			// A Refaire suite aux changements du back
			console.log("pokelist : ", pokelist);
			return true;
		} catch (error) {
			console.error("[CLASS_POKELIST.add] : ", error);
			throw error;
		}
	}

	/**
	 * Get a user pokelist
	 * @returns {*}  {Promise<boolean>}
	 * @memberof ClassPokelist
	 */
	async get(): Promise<boolean> {
		try {
			// A Refaire suite aux changements du back
			return true;
		} catch (error) {
			console.error("[CLASS_POKELIST.get] : ", error);
			throw error;
		}
	}
}
