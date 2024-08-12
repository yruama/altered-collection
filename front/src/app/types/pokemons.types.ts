export interface Pokemon {
	ID?: number;
	POKEMON_ID: number;
	NAME: string;
	DESCRIPTION: string;
	CATEGORY: string;
	TALENT: PokeTalent[];
	SHAPE: string;
	GENERATION: number;
	INFORMATIONS: PokeInformations;
	EVOLUTION: PokemonEvolve[];
	COLOR: string;
	TYPE: PokeType[];
	owned: boolean;
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
	statistics: { value: number, name:any }[];
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