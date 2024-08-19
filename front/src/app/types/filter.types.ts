export interface Filter {
    pagination: {
        offset: number,
        limit: number,
        max: number 
    },
    factions?: string[],
    rarity?: number[],
    type?: number[],
    subType?: [],
    search?: string
}