export interface PokeInfos {
	height: number;
	statistics: string;
	weight: number;
}

export interface Pokemon {
	ID?: number;
	POKEMON_ID: number;
	NAME_FR: string;
	NAME_EN: string;
	DESCRIPTION_FR: string;
	DESCRIPTION_EN: string;
	CATEGORY: string;
	TYPE_ID_1: string;
	TYPE_ID_2: string;
	TALENT: string;
	SHAPE_ID: number;
	GENERATION: number;
	INFORMATIONS: PokeInfos;
	EVOLUTION_ID: string;
	COLOR: string;
	artwork: string;
	miniature: string;
}

export interface PokemonWithTypeData extends Pokemon {
	TYPE_1_NAME?: string;
	TYPE_2_NAME?: string;
  }

export interface PokemonParsed {
	ID?: number;
	POKEMON_ID?: number;
	NAME?: string;
	DESCRIPTION?: string;
	CATEGORY?: string;
	TALENT?: PokeTalent[];
	SHAPE?: string;
	GENERATION?: number;
	INFORMATIONS?: PokeInformations;
	EVOLUTION?: PokemonEvolve[];
	COLOR?: string;
	TYPE?: PokeType[];
}

export interface PokemonEvolve {
	ID?: number;
	POKEMON_ID: number;
	NAME: string;
	TYPE: PokeType[];
}

export interface PokeInformations {
	height: number;
	weight: number;
	statistics: string;
}

export interface PokeTalent {
	name: string,
	description: string,
	hidden: boolean
}

export interface PokeType {
	id: string,
	name: string
}