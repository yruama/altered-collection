export enum CardType {
    ATTACK = 0,
    TALENT = 1
}

export interface Cards {
    NAME?: string,
    LEVEL?: string,
    EVOLVE?: string,
    PV?: string,
    TYPE?: string,
    IMAGE?: string,
    ABILITIES?: Ability[],
    WEAKNESS?: Weakness,
    RESISTANCE?: Resistance,
    RETREAT?: string[],
    SET?: string,
    NUMBER?: string,
    ILLUSTRATOR?: string
}

export interface Ability {
    TYPE?: CardType,
    NAME?: string,
    DESCRIPTION?: string,
    POWER?: number,
    COST?: string[]
}

export interface Weakness {
    TYPE?: string,
    MULTIPLIER?: string,
}

export interface Resistance {
    TYPE?: string,
    MULTIPLIER?: string,
}


export interface Altered {
    NAME?: string,
    TYPE?: string,
    SUB_TYPE?: string[],
    ATTRIBUTES?: Altered_Attributes,
    EFECTS?: string,
    ILLUSTRATOR?: string,
    LORE?: string,
    FACTION?: string,
    RARITY?: string,
    CARD_TYPE?: string,
    SET?: string,
    IMAGE?: string,
    UNIQUE_IMAGE?: string,
    NUMBER?: number
}

export interface Altered_Attributes {
    MOUTAIN?: number,
    FOREST?: number,
    OCEAN?: number,
    HAND_COST?: number,
    RESERVE_COST?: number
}

export enum Altered_Effect_Type {
    HAND = 0,
    RESERVE = 1,
    EVERYWHERE = 2,
    DESTROY = 3
}

export interface Altered_Effect {
    TYPE?: string,
    EFFECT?: string
}