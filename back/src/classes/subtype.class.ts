import CoreSubTypes from "@core/subtypes.core";
import { Types } from "@type/types";

export default class ClassTypes {
    private readonly coreTypes: CoreSubTypes;

    constructor() {
		this.coreTypes = new CoreSubTypes();
	}

    async getAll(): Promise<Types[]> {
		try {

            return await this.coreTypes.getAll();

		} catch (error) {
			console.error("[CORE_CoreSubTypes.getAll] : ", error);
			throw error;
		}
	}

	async add(faction: Types): Promise<number[]> {
		try {
            return await this.coreTypes.add(faction);
		} catch (error) {
			console.error("[CORE_CoreSubTypes.add] : ", error);
			throw error;
		}
	}
}