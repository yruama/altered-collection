import Error_faction from "@errors/types.json";
import { Sub_Types } from "@type/types";
import { knex } from "../app";
import { parserObject } from "./utils.core";

export default class CoreSubTypes {
    async add(subType: Sub_Types) {
        try {
			const subTypeCreated = await knex("SUB_TYPES").insert({
                ID: subType.ID,
                NAME_FR: subType.NAME_FR,
                NAME_EN: subType.NAME_EN
			});

			return subTypeCreated;
		} catch (error) {
			console.error("[CORE_SUB_TYPES.add] : ", error);
			throw error;
		}
    }

    async getAll() {
        try {
			return await knex("SUB_TYPES").orderBy('ID', "desc")
		} catch (error) {
			console.error("[CORE_SUB_TYPES.add] : ", error);
			throw error;
		}
    }

}