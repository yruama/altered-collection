import { Sub_Types, Types } from "@type/types";

import Error_faction from "@errors/types.json";
import { knex } from "../app";
import { parserObject } from "./utils.core";

export default class CoreTypes {
    
    async add(type: Types) {
        try {
			const typeCreated = await knex("TYPES").insert({
                ID: type.ID,
                NAME_FR: type.NAME_FR,
                NAME_EN: type.NAME_EN
			});

			return typeCreated;
		} catch (error) {
			console.error("[CORE_TYPES.add] : ", error);
			throw error;
		}
    }

    async getAll() {
        try {
			return await knex("TYPES").orderBy('ID', "desc")
		} catch (error) {
			console.error("[CORE_TYPES.add] : ", error);
			throw error;
		}
    }

}