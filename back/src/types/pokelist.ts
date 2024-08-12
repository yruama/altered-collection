export interface Pokelist {
	ID?: number;
	NAME: string;
	DESCRIPTION: string;
	USER_ID: number;
	FILTER: string;
	TOTAL: number;
}

export interface Pokemon_Owned {
	ID?: number;
	POKEMON_ID: number;
	USER_ID: number;
	OWNED: number;
	NOTE?: string;
}
