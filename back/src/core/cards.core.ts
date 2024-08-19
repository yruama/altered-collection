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

        const cardsBuilder = knex.from("CARDS")
                                  .where("EXTENSION", 1)
                                  .andWhereNot("NO", "-1")
                                  .orderBy("NO", "asc");

        if (filter.factions && filter.factions.length > 0) {
          cardsBuilder.whereIn("FACTION", filter.factions)
        }                             

        if (filter.rarity && filter.rarity.length > 0) {
          
          cardsBuilder.whereIn("RARITY", filter.rarity)
          
        }                                

        if (filter.type && filter.type.length > 0) {
          cardsBuilder.whereIn("TYPES", filter.type)
        }
                                        
        if (filter.subType && filter.subType.length > 0) {
          cardsBuilder.where(function() {
            this.where('SUB_TYPE', 'like', `%${filter.subType[0]}%`);
            for (let i = 1; i < filter.subType.length; i++) {
              this.orWhere('SUB_TYPE', 'like', `%${filter.subType[i]}%`);
            }
          })
        }

        if (filter.search && filter.search.length > 3) {
          cardsBuilder.andWhere('NAME', 'like', `%${filter.search}%`)
                      .orWhere('ID', 'like', `%${filter.search}%`)
        }

        const totalBuilder = cardsBuilder.clone();
        const total = await totalBuilder.count({ total: '*' });
        const cards = await cardsBuilder.select("*").limit(limit)
        .offset(offset);

        //const total = 10;
        if (cards.length <= 0) throw new InternalError(Error_card.READ.NOT_FOUND.single);
        return { total: total[0].total, data: parserObject(cards) };
      } catch (error) {
        console.error("[CORE_CARDS.get] : ", error);
        throw error;
      }
    }
}