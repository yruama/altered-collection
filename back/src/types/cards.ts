export interface CardsParsed {
    UUID?: string,
    ID: string,
    FORMATED_ID: string,
    NO: string,
    TYPE: number,
    SUB_TYPE: number[],
    ASSETS: string[],
    FACTION: number,
    RARITY: number,
    NAME: string[],
    IMAGE: string[],
    ELEMENTS: Elements,
    EXTENSION: number
}

export interface Cards {
    UUID?: string,
    ID: string,
    FORMATED_ID: string,
    NO: string,
    TYPE: number,
    SUB_TYPE: string,
    ASSETS: string,
    FACTION: number,
    RARITY: number,
    NAME: string,
    IMAGE: string,
    ELEMENTS: string,
    EXTENSION: number
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