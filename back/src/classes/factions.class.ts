import CoreFactions from "@core/factions.core";
import { Factions } from "@type/factions";

export default class ClassFactions {
    private readonly coreFactions: CoreFactions;

    constructor() {
		this.coreFactions = new CoreFactions();
	}

    async getAll(): Promise<Factions[]> {
		try {

            return await this.coreFactions.getAll();

		} catch (error) {
			console.error("[CORE_FACTIONS.getAll] : ", error);
			throw error;
		}
	}

	async add(faction: Factions): Promise<number[]> {
		try {
            return await this.coreFactions.add(faction);
		} catch (error) {
			console.error("[CORE_FACTIONS.getWithPagination] : ", error);
			throw error;
		}
	}
}