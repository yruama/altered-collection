export interface Cards {
    UUID?: string,
    ID: string,
    FORMATED_ID: string,
    IMAGE: string,
    SUB_TYPE: string[],
    TYPE: string,
    STATISTICS: Statistics,
    FACTION: number,
    NAME: string,
    RARITY: number,
    EXTENSION: number
}

export interface Statistics {
    MAIN_COST: string,
    RECALL_COST: string,
    FOREST_POWER: string,
    MOUNTAIN_POWER: string,
    OCEAN_POWER: string,
    MAIN_EFFECT: string,
    ECHO_EFFECT: string
}