export interface Cards {
    UUID?: string,
    ID: string,
    FORMATED_ID: string,
    NO: string,
    TYPE: number,
    SUB_TYPE: number[],
    ASSETS: string[],
    FACTION: number,
    RARITY: number,
    NAME: {
        en: string,
        fr: string
    },
    IMAGE: {
        en: string,
        fr: string
    },
    ELEMENTS: Elements
}

export interface Elements {
    MAIN_COST?: string,
    RECALL_COST?: string,
    FOREST_POWER?: string,
    MOUNTAIN_POWER?: string,
    OCEAN_POWER?: string,
    MAIN_EFFECT?: string[],
    ECHO_EFFECT?: string[],
    PERMANENT?: number,
    RESERVE?: number
}