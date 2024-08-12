import { Cards } from "@type/cards";
import CoreCards from "@core/cards.core";
import { knex } from "../app";

export default class ClassCards {
    private readonly coreCards: CoreCards;

    constructor() {
		this.coreCards = new CoreCards();
	}

    async getWithPagination(offset: number, limit: number, max: number | null, language: string): Promise<any[]> {
		try {
			if (max && offset + limit > max) limit = max - offset;

            let cards: Cards[] = await this.coreCards.getWithPagination(offset, limit) as Cards[];
           
			return cards;
		} catch (error) {
			console.error("[CORE_CARDS.getWithPagination] : ", error);
			throw error;
		}
	}
}