import CoreRaritys from "@core/rarity.core";
import { Raritys } from "@type/rarity";

export default class ClassRaritys {
    private readonly coreRaritys: CoreRaritys;

    constructor() {
		this.coreRaritys = new CoreRaritys();
	}

    async getAll(): Promise<Raritys[]> {
		try {

            return await this.coreRaritys.getAll();

		} catch (error) {
			console.error("[CORE_FACTIONS.getAll] : ", error);
			throw error;
		}
	}

	async add(rarity: Raritys): Promise<number[]> {
		try {
            return await this.coreRaritys.add(rarity);
		} catch (error) {
			console.error("[CORE_FACTIONS.getWithPagination] : ", error);
			throw error;
		}
	}
}