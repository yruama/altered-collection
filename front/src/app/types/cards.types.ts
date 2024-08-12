export interface cards {
    UUID: string,
    ID: string,
    CARDS_LINK: string[],
    SUB_TYPE: string[],
    TYPE: string,
    STATISTICS: Statistics,
    FACTION: number,
    NAME: string,
    DESCRIPTION: string,
    RARITY: number
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