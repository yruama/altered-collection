import { Cards } from "@type/cards";
import Error_card from "@errors/card.json";
import { knex } from "../app";
import { parserObject } from "./utils.core";

export default class CoreCards {
    
    async add(card: Cards) {
        try {
			const cardCreated = await knex("CARDS").insert({
                ID: card.ID,
                IMAGE: JSON.stringify(card.IMAGE),
                SUB_TYPE: JSON.stringify(card.SUB_TYPE),
                TYPE: card.TYPE,
                STATISTICS: JSON.stringify(card.STATISTICS),
                FACTION: card.FACTION,
                NAME: card.NAME,
                RARITY: card.RARITY,
                EXTENSION: card.EXTENSION
			});

			return cardCreated;
		} catch (error) {
			console.error("[CORE_CARDS.add] : ", error);
			throw error;
		}
    }

    async getWithPagination(offset: number, limit: number) {
        try {
			const cards = await knex.select("*").from("CARDS").limit(limit).offset(offset).orderBy("ID", "asc");

			if (cards.length <= 0) throw new InternalError(Error_card.READ.NOT_FOUND.single);
			return parserObject(cards);
		} catch (error) {
			console.error("[CORE_CARDS.get] : ", error);
			throw error;
		}
    }
}