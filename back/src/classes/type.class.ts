import CoreTypes from "@core/types.core";
import { Types } from "@type/types";

export default class ClassTypes {
    private readonly coreTypes: CoreTypes;

    constructor() {
		this.coreTypes = new CoreTypes();
	}

    async getAll(): Promise<Types[]> {
		try {

            return await this.coreTypes.getAll();

		} catch (error) {
			console.error("[CORE_FACTIONS.getAll] : ", error);
			throw error;
		}
	}

	async add(faction: Types): Promise<number[]> {
		try {
            return await this.coreTypes.add(faction);
		} catch (error) {
			console.error("[CORE_FACTIONS.getWithPagination] : ", error);
			throw error;
		}
	}
}