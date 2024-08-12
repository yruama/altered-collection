import { PokeTalent, PokeType, Pokemon, PokemonEvolve, PokemonParsed, PokemonWithTypeData } from "@type/pokemon";

import CoreEvolution from "@core/evolution.core";
import CoreGeneration from "../core/generation.core";
import CorePokemon from "../core/pokemon.core";
import CoreShape from "@core/shape.core";
import CoreTalent from "@core/talent.core";
import CoreType from "@core/type.core";
import { parserObject } from "@core/utils.core";

export default class ClassPokemon {
	private readonly corePokemon: CorePokemon;
	private readonly coreGeneration: CoreGeneration;
    private readonly coreType: CoreType;
	private readonly coreEvolution: CoreEvolution;
	private readonly coreTalent: CoreTalent;
	private readonly coreShape: CoreShape;

	constructor() {
		this.corePokemon = new CorePokemon();
		this.coreGeneration = new CoreGeneration();
        this.coreType = new CoreType();
		this.coreEvolution = new CoreEvolution();
		this.coreTalent = new CoreTalent();
		this.coreShape = new CoreShape();
	}

	/**
	 * Add a new pokemon
	 * @param {Pokemon} pokelist
	 * @returns {*}  {Promise<number[]>}
	 * @memberof ClassPokemon
	 */
	async add(pokelist: Pokemon): Promise<number[] | boolean> {
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
	 * Get pokemon by pagination
	 * @param {number} offset
	 * @param {number} limit
	 * @returns {*}  {Promise<PokemonParsed[]>}
	 * @memberof CorePokemon
	 */
	async getWithPagination(offset: number, limit: number, max: number | null, language: string): Promise<PokemonParsed[]> {
		try {
			// Dans le cas ou on veut une seule génération par exemple
			if (max && offset + limit > max) limit = max - offset;

            let pokemons: Pokemon[] = await this.corePokemon.getWithPagination(offset, limit) as Pokemon[];
            const pokemonParsed: PokemonParsed[] = [];
			
			for (let index = 0; index < pokemons.length; index++) {
				const pokemonData = await this.transformPokemonToPokemonParsed(pokemons[index], language, ['TYPE']);
				pokemonParsed.push(parserObject(pokemonData));
			}
           
			return pokemonParsed;
		} catch (error) {
			console.error("[CORE_POKEMON.getWithPagination] : ", error);
			throw error;
		}
	}

	/**
	 * Get a pokemon
	 * @returns {*}  {Promise<PokemonParsed>}
	 * @memberof ClassPokemon
	 */
	async get(id: string, language: string): Promise<PokemonParsed> {
		try {
			let pokemon: Pokemon = await this.corePokemon.get(id) as Pokemon;
            const pokemonParsed: PokemonParsed = await this.transformPokemonToPokemonParsed(pokemon, language, ['TYPE', 'TALENT', 'SHAPE', 'EVOLUTION']);
           
            return parserObject(pokemonParsed);
		} catch (error) {
			console.error("[CLASS_POKELIST.get] : ", error);
			throw error;
		}
	}

	async getEvolutionsOfPokemon(chainId: string): Promise<Pokemon[]> {
		try {
			
			const evolutions = await this.coreEvolution.getByChainID(chainId);
			const pokemons: Pokemon[] = [];

			for (const evolution of evolutions) {
				const pokemon = await this.corePokemon.get(evolution.POKEMON_ID.toString());

				if (pokemon) pokemons.push(pokemon);
			}
			
			return pokemons;
		} catch (error) {
			console.error("[CLASS_POKELIST.get] : ", error);
			throw error;
		}
	}

	async transformPokemonToPokemonParsed(pokemon: Pokemon, language: string, custom?: string[]): Promise<PokemonParsed> {
		// Parsing NAME & DESCRIPTION
		const nameKey = language === 'fr-FR' ? 'NAME_FR' : 'NAME_EN';
		const descriptionKey = language === 'fr-FR' ? 'DESCRIPTION_FR' : 'DESCRIPTION_EN';

		// Parsing Type
		const type: PokeType[] = []
		if (custom && custom.includes('TYPE')) {
			if (pokemon.TYPE_ID_1) type.push( { id: pokemon.TYPE_ID_1, name : (await this.coreType.get(pokemon.TYPE_ID_1)).NAME })
			if (pokemon.TYPE_ID_2) type.push( { id: pokemon.TYPE_ID_2, name : (await this.coreType.get(pokemon.TYPE_ID_2)).NAME })
		}

		// Parsing Talent
		const talents: PokeTalent[] = [];
		if (custom && custom.includes('TALENT')) {
			for (let talent of pokemon.TALENT) {
				const talentParsed = talent as any;
				const t = await this.coreTalent.get(talentParsed.id)

				const talentNameKey = language === 'fr-FR' ? 'NAME_FR' : 'NAME_EN';
				const talentDescriptionKey = language === 'fr-FR' ? 'DESCRIPTION_FR' : 'DESCRIPTION_EN';

				talents.push({
					name: t[talentNameKey],
					description: t[talentDescriptionKey],
					hidden: talentParsed.hidden
				})
			}
		}

		// Parsing shape
		const shape = (custom && custom.includes('SHAPE')) ? (await this.coreShape.get(pokemon.SHAPE_ID)).NAME : "";

		// ParsingEvolution
		const pokemons: PokemonEvolve[] = [];

		if (custom && custom.includes('EVOLUTION')) {
			const evolutions = await this.coreEvolution.getByChainID(pokemon.EVOLUTION_ID);
			

			for (const evolution of evolutions) {
				const pokemon = await this.corePokemon.get(evolution.POKEMON_ID.toString());

				// Parsing NAME
				const nameKey = language === 'fr-FR' ? 'NAME_FR' : 'NAME_EN';

				// Parsing Type
				const type: PokeType[] = []
				if (custom && custom.includes('TYPE')) {
					if (pokemon.TYPE_ID_1) type.push( { id: pokemon.TYPE_ID_1, name : (await this.coreType.get(pokemon.TYPE_ID_1)).NAME })
					if (pokemon.TYPE_ID_2) type.push( { id: pokemon.TYPE_ID_2, name : (await this.coreType.get(pokemon.TYPE_ID_2)).NAME })
				}

				if (pokemon) pokemons.push({
					POKEMON_ID: pokemon.POKEMON_ID,
					NAME: pokemon[nameKey],
					TYPE: type
				});
			}
		}
			

		return {
		  ID: pokemon.ID,
		  POKEMON_ID: pokemon.POKEMON_ID,
		  NAME: pokemon[nameKey],
		  DESCRIPTION: pokemon[descriptionKey],
		  CATEGORY: pokemon.CATEGORY,
		  TALENT: talents,
		  SHAPE: shape,
		  GENERATION: pokemon.GENERATION,
		  INFORMATIONS: pokemon.INFORMATIONS,
		  EVOLUTION: pokemons,
		  COLOR: pokemon.COLOR,
		  TYPE: type
		};
	}
}
