import { Cards, Elements } from "@type/cards";

import CoreCards from "@core/cards.core";
import CoreFactions from "@core/factions.core";
import CoreRarity from "@core/rarity.core";
import CoreSubTypes from "@core/subtypes.core";
import CoreTypes from "@core/types.core";
import { Factions } from "@type/factions";
import { Rarity } from "@type/rarity";
import { Sub_Types } from "@type/types";
import { join } from 'path';
import { readFileSync } from 'fs';

async function start() {

    // createRarity();
    // createFactions();
    // createTypes();
    // creatpeSubType();

    // return;

    
    const coreCards = new CoreCards();

    const filePath = join(__dirname, '../assets/db/cards.json'); // Construisez le chemin du fichier
    const fileContent = readFileSync(filePath, 'utf-8'); // Lire le fichier en tant que chaîne de caractères
    const cadJson = JSON.parse(fileContent); // Parser la chaîne JSON en objet


    for (const cards in cadJson) {
        const cardData = cadJson[cards];


        if (cardData.rarity !== "UNIQUE") {
            const card: Cards = {
                ID: cardData.id,
                FORMATED_ID: cardData.collectorNumberFormatted.fr,
                NO: getNumberCard(cardData.collectorNumberFormatted.fr),
                TYPE: cardData.type,
                SUB_TYPE: JSON.stringify(await getCardSubType(cardData.subtypes)),
                ASSETS: JSON.stringify(cardData.assets.WEB),
                FACTION: TransformFactionToNumber(cardData.mainFaction),
                RARITY: TransformRarityToNumber(cardData.rarity),
                NAME: JSON.stringify(cardData.name),
                IMAGE: JSON.stringify(cardData.imagePath),
                ELEMENTS: JSON.stringify(cardData.elements),
                EXTENSION: cardData.id.includes('KS') ? 0 : 1
            }

            coreCards.add(card);
        }

    }

    console.log("END")

}

async function createFactions() {
    const filePath = join(__dirname, '../assets/db/factions.json'); // Construisez le chemin du fichier
    const fileContent = readFileSync(filePath, 'utf-8'); // Lire le fichier en tant que chaîne de caractères
    const factions = JSON.parse(fileContent); // Parser la chaîne JSON en objet

    const coreRarity = new CoreFactions();
    let i = 0;
    const rarities: any[] = [];

    for (const faction in factions) {
        const rarity: Factions = {
            ID: i,
            SHORT_NAME: faction,
            NAME_EN: factions[faction].en,
            NAME_FR: factions[faction].fr,
        }
        rarities.push(rarity)

        coreRarity.add(rarity);

        i++;
    }

    console.log(rarities)
}

async function createRarity() {
    const filePath = join(__dirname, '../assets/db/rarities.json'); // Construisez le chemin du fichier
    const fileContent = readFileSync(filePath, 'utf-8'); // Lire le fichier en tant que chaîne de caractères
    const rarity = JSON.parse(fileContent); // Parser la chaîne JSON en objet

    const coreRarity = new CoreRarity();
    let i = 0;
    const rarities: any[] = [];

    for (const r in rarity) {
        const rObject: Rarity = {
            ID: i,
            NAME_EN: rarity[r].en,
            NAME_FR: rarity[r].fr,
        }
        rarities.push(rObject)

        coreRarity.add(rObject);

        i++;
    }

    console.log(rarities)
}

async function createTypes() {
    const filePath = join(__dirname, '../assets/db/types.json'); // Construisez le chemin du fichier
    const fileContent = readFileSync(filePath, 'utf-8'); // Lire le fichier en tant que chaîne de caractères
    const factions = JSON.parse(fileContent); // Parser la chaîne JSON en objet

    const coreRarity = new CoreTypes();
    let i = 0;
    const rarities: any[] = [];

    for (const faction in factions) {
        const rarity: Rarity = {
            ID: i,
            NAME_EN: factions[faction].en,
            NAME_FR: factions[faction].fr,
        }
        rarities.push(rarity)

        coreRarity.add(rarity);

        i++;
    }

    console.log(rarities)
}

async function creatpeSubType() {
    const filePath = join(__dirname, '../assets/db/subtypes.json'); // Construisez le chemin du fichier
    const fileContent = readFileSync(filePath, 'utf-8'); // Lire le fichier en tant que chaîne de caractères
    const factions = JSON.parse(fileContent); // Parser la chaîne JSON en objet

    const coreRarity = new CoreSubTypes();
    let i = 0;
    const rarities: any[] = [];

    for (const faction in factions) {
        const rarity: Rarity = {
            ID: i,
            NAME_EN: factions[faction].en,
            NAME_FR: factions[faction].fr,
        }
        rarities.push(rarity)

        coreRarity.add(rarity);

        i++;
    }

    console.log(rarities)
}

async function getCardSubType(subtypes: string[]): Promise<number[]> {

    const coreSubType = new CoreSubTypes();
    const number: number[] = [];
    const allSubTypes =  await coreSubType.getAll();

    for (const subtype of subtypes) {
        
        const no = allSubTypes.find((item: Sub_Types) => capitalizeFirstLetter(subtype) == item.NAME_EN)
        if (no) number.push(no.ID);
    }

    return number;
}

function capitalizeFirstLetter(str: string): string {
    if (str.length === 0) return str; // Vérifiez si la chaîne n'est pas vide
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

function getNumberCard(id: string) {
    return id.match(/\d+/) ? id.match(/\d+/)![0] : "-1"
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