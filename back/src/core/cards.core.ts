import { Cards } from "@type/cards";
import Error_card from "@errors/card.json";
import { knex } from "../app";
import { parserObject } from "./utils.core";

export default class CoreCards {
    
    async add(card: Cards) {
        try {
        const cardCreated = await knex("CARDS").insert({
            ID: card.ID,
            FORMATED_ID: card.FORMATED_ID,
            NO: card.NO,
            TYPE: card.TYPE,
            SUB_TYPE: card.SUB_TYPE,
            ASSETS: card.ASSETS,
            FACTION: card.FACTION,
            RARITY: card.RARITY,
            NAME: card.NAME,
            IMAGE: card.IMAGE,
            ELEMENTS: card.ELEMENTS,
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
        const cards = await knex.select("*").from("CARDS").where("EXTENSION", 1).limit(limit).offset(offset).orderBy("ID", "asc");

        if (cards.length <= 0) throw new InternalError(Error_card.READ.NOT_FOUND.single);
        return parserObject(cards);
      } catch (error) {
        console.error("[CORE_CARDS.get] : ", error);
        throw error;
      }
    }

    async getWithFilter(filter: any) {
      try {
        console.log("FILTER : ", filter);
        const limit = filter.pagination.limit;
        const offset = filter.pagination.offset;

        const cardsBuilder = knex.select("*").from("CARDS").where("EXTENSION", 0).andWhereNot("NO", "-1").limit(limit).offset(offset).orderBy("NO", "asc");

        if (filter.faction.length > 0) {
          cardsBuilder.where("FACTION", filter.faction[0])
        }

        const cards = await cardsBuilder;

        if (cards.length <= 0) throw new InternalError(Error_card.READ.NOT_FOUND.single);
        return parserObject(cards);
      } catch (error) {
        console.error("[CORE_CARDS.get] : ", error);
        throw error;
      }
    }
}