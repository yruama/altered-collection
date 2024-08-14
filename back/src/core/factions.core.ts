import Error_faction from "@errors/factions.json";
import { Factions } from "@type/factions";
import { knex } from "../app";
import { parserObject } from "./utils.core";

export default class CoreFactions {
    
    async add(faction: Factions) {
        try {
			const factionCreated = await knex("FACTIONS").insert({
                ID: faction.ID,
                SHORT_NAME: faction.SHORT_NAME,
                NAME_FR: faction.NAME_FR,
                NAME_EN: faction.NAME_EN
			});

			return factionCreated;
		} catch (error) {
			console.error("[CORE_FACTIONS.add] : ", error);
			throw error;
		}
    }

    async getAll() {
        try {
			return await knex("FACTIONS").orderBy('ID', "desc")
		} catch (error) {
			console.error("[CORE_FACTIONS.add] : ", error);
			throw error;
		}
    }

}