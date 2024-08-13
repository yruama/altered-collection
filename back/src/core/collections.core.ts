import { Collections } from "@type/collections";
import Error_collections from "@errors/collections.json";
import { knex } from "../app";
import { parserObject } from "./utils.core";
const axios = require('axios')
const fs = require('fs');

export default class CoreCollections {
    
    async getCollections() {
        try {
            return await knex('COLLECTIONS')
            .join('CARDS', 'COLLECTIONS.ID', '=', 'CARDS.ID')
            .select('COLLECTIONS.*', 'CARDS.*')
            .orderBy('CARDS.FORMATED_ID');

        } catch (error) {
            console.log("error : ", error)
        }
    }

    async generateList() {
        try {
            console.log("COUCOU je suis bien là")

            let cards = await knex('COLLECTIONS')
            .join('CARDS', 'COLLECTIONS.ID', '=', 'CARDS.ID')
            .select('COLLECTIONS.*', 'CARDS.*')
            .where('CARDS.RARITY', 1)
            .orderBy('CARDS.FORMATED_ID');

            cards = cards.filter((item: any) => !item.ID.includes('NE'))

            const lines: string[] = []
            lines.push("Je recherche :")
            let c = [...cards];
            console.log(cards.length)
            const yzmir = c.filter((item: any) => item.FACTION === 5)

            for (const yz of yzmir) {
                if (yz.FACTION == 5 && yz.NUMBER < 3) {
                    lines.push(`${3 - yz.NUMBER}x :YZMIR: ${yz.NAME}`)
                }
            }
            lines.push(" ")
            lines.push("Disponible en échange :")
            console.log(cards.length)

            c = [...cards];
            const axiom = c.filter((item: any) => item.FACTION === 0)
            for (const ax of axiom) {
                if (ax.FACTION == 0 && ax.NUMBER > 1) {
                    lines.push(`${ax.NUMBER - 1}x :AXIOM: ${ax.NAME}`)
                }
            }

            c = [...cards];
            const bravos = c.filter((item: any) => item.FACTION === 1)
            for (const br of bravos) {
                if (br.FACTION == 1 && br.NUMBER > 1) {
                    lines.push(`${br.NUMBER - 1}x :BRAVOS: ${br.NAME}`)
                }
            }

            fs.writeFile('altered-change.txt', lines.join('\n'), (err: any) => {
                if (err) {
                    console.error("Error writing to file:", err);
                } else {
                    console.log("Content successfully written to response.data.html");
                }
            });
        } catch (error) {
            console.log("Error : ", error)
        }
    }

    normalizeId(id: string): string {
        return id.replace("KS_", "_");
      }

    async getCollectionsFromAltered(language: string) {
        try {

            const response = await fs.readFile('altered-brut.json', 'utf8', async (err: any, data: any) => {
                if (err) {
                  console.error('Erreur lors de la lecture du fichier:', err);
                  return;
                }
                console.log("========")
                data = JSON.parse(data);

                let cardsToAdd = data["hydra:member"].map((card: any) => {
                    return {
                        ID: card.reference,
                        NUMBER: card.inMyCollection
                    }
                });

                const aggregated: { [key: string]: number } = {};

                for (const obj of cardsToAdd) {
                    const normalizedId = this.normalizeId(obj.ID);

                    if (aggregated[normalizedId] !== undefined) {
                    aggregated[normalizedId] += obj.NUMBER;
                    } else {
                    aggregated[normalizedId] = obj.NUMBER;
                    }
                }

                cardsToAdd = Object.keys(aggregated).map((ID) => ({
                    ID: ID,
                    NUMBER: aggregated[ID],
                  }));
    
    
                for (const card of cardsToAdd) {
                    const collectionsCreated = await knex("COLLECTIONS").insert({
                        ID: card.ID,
                        NUMBER: card.NUMBER,
                        IS_FOIL: 0
                    });
                }
    
                
    
                console.log("=== TERMINE ===")
    
                
                return response;
              });
            
            
        } catch (error) {
            console.log("error : ", error)
        }
        
    }
}