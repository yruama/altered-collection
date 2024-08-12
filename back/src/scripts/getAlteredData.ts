import { Cards, Statistics } from "@type/cards";

import CoreCards from "@core/cards.core";
import axios from "axios";

async function start() {
    console.log("=== START ===")

    const url = "https://api.altered.gg/cards?&itemsPerPage=1050"
    const config = {
        headers: { 'Accept-Language': `fr-fr` }
    };
            
    const response = await axios.get(url, config);

   const coreCards = new CoreCards();

    for (const card of response.data['hydra:member']) {
        if (card) {
            const cardToAdd: Cards = {
                ID: card.collectorNumberFormatted,
                IMAGE: card.imagePath,
                SUB_TYPE: card.cardSubTypes.map((subtype: any) => subtype.reference),
                TYPE: card.cardType.reference,
                STATISTICS: GetStatistics(card.elements),
                FACTION: TransformFactionToNumber(card.mainFaction.reference),
                NAME: card.name,
                RARITY: TransformRarityToNumber(card.rarity.reference),
                EXTENSION: 0
            }
    
            coreCards.add(cardToAdd);
        }
    }
}

function GetStatistics(data: any) {
    const statistics: Statistics = {
        MAIN_COST: data.MAIN_COST,
        RECALL_COST: data.RECALL_COST,
        FOREST_POWER: data.FOREST_POWER,
        MOUNTAIN_POWER: data.MOUNTAIN_POWER,
        OCEAN_POWER: data.OCEAN_POWER,
        MAIN_EFFECT: data.MAIN_EFFECT,
        ECHO_EFFECT: data.ECHO_EFFECT
    }

    return statistics
}

function TransformRarityToNumber(rarity: string) {
    switch(rarity) {
        case 'COMMON': { 
            return 0; 
            break; 
         } 
         case 'RARE': { 
            return 1; 
            break; 
         } 
         default: { 
            return 2; 
            break; 
         } 
    }
}


function TransformFactionToNumber(faction: string) {
    switch(faction) {
        case 'AX': { 
            return 0; 
            break; 
         } 
         case 'BR': { 
            return 1; 
            break; 
         }
         case 'LY': { 
            return 2; 
            break; 
         } 
         case 'MU': { 
            return 3; 
            break; 
         } 
         case 'OR': { 
            return 4; 
            break; 
         } 
         case 'YZ': { 
            return 5; 
            break; 
         } 
         default: { 
            return 2; 
            break; 
         } 
    }
}

export default start;