import Error_faction from "@errors/rarity.json";
import { Rarity } from "@type/rarity";
import { knex } from "../app";
import { parserObject } from "./utils.core";

export default class CoreRarity {
    
    async add(type: Rarity) {
        try {
			const typeCreated = await knex("RARITY").insert({
                ID: type.ID,
                NAME_FR: type.NAME_FR,
                NAME_EN: type.NAME_EN
			});

			return typeCreated;
		} catch (error) {
			console.error("[CORE_RARITY.add] : ", error);
			throw error;
		}
    }

    async getAll() {
        try {
			return await knex("RARITY").orderBy('ID', "desc")
		} catch (error) {
			console.error("[CORE_RARITY.add] : ", error);
			throw error;
		}
    }

}