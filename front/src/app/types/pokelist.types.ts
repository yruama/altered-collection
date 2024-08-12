export interface Pokelist {
	ID?: number;
	NAME: string;
	IMAGE: string;
	GENERATION_ID: number;
	USER_ID?: number;
	user?: any;
	generation?: any;
}

export interface PokelistData {
	ID?: number;
	POKEMON_ID: number;
	USER_ID: number;
	POKELIST_ID: number;
	OWNED: number;
	NOTE?: string;
}
