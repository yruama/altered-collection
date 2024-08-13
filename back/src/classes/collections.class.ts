import { Collections } from "@type/collections";
import CoreCollections from "@core/collections.core";
import { knex } from "../app";

export default class ClassCollections {
    private readonly coreCollections: CoreCollections;

    constructor() {
		this.coreCollections = new CoreCollections();
	}

	async getCollections() {
		try {
			const collection = await this.coreCollections.getCollections();
           
			return collection;
		} catch (error) {
			console.error("[CLASS_COLLECTIONS.getCollections] : ", error);
			throw error;
		}
	}

	async generateList() {
		try {
			const collection = await this.coreCollections.generateList();
           
			return collection;
		} catch (error) {
			console.error("[CLASS_COLLECTIONS.generateList] : ", error);
			throw error;
		}
	}

    async getCollectionsFromAltered(language: string) {
        try {
			const collection = await this.coreCollections.getCollectionsFromAltered(language);
           
			return collection;
		} catch (error) {
			console.error("[CLASS_COLLECTIONS.getCollectionsFromAltered] : ", error);
			throw error;
		}
    }
}