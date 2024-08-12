import { Ability, Altered, Altered_Effect, Cards, Resistance, Weakness } from "@type/cards";

const puppeteer = require('puppeteer');
const fs = require('fs');
const cheerio = require('cheerio');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const axios = require('axios');
const path = require('path');



export default class ClassTest {

	constructor() {

	}

    async get() {

        console.log("salut")

        const url = "https://api.altered.gg/cards?collection=true&rarity%5B%5D=RARE&itemsPerPage=1000"
        const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDMFo0V3JVWE1xT2JtMy1CTU8xRFV5YktidFA2bldLb2VvWmE1UGJuZHhZIn0.eyJleHAiOjE3MjM0NzUxNzQsImlhdCI6MTcyMzQ3MTU3NCwiYXV0aF90aW1lIjoxNzIzNDcxNTc0LCJqdGkiOiIzMTFjM2VjMC0xNzBmLTQ2MDYtYTlmMC0yOTA1NWQ0NmE3ODIiLCJpc3MiOiJodHRwczovL2F1dGguYWx0ZXJlZC5nZy9yZWFsbXMvcGxheWVycyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyMjc3OWI0NC0xMGM3LTQ5MzItYWU3MS02YzEwMDgxN2NhMzYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3ZWIiLCJzZXNzaW9uX3N0YXRlIjoiYjg5YmZkMTMtMjQ5Ni00MmI5LTljZTItZDNhZmI1MjAyOGYwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2F1dGguYWx0ZXJlZC5nZyIsImh0dHBzOi8vd3d3LmFsdGVyZWQuZ2ciXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtcGxheWVycyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiYjg5YmZkMTMtMjQ5Ni00MmI5LTljZTItZDNhZmI1MjAyOGYwIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJBbWF1cnkgTEFST1pFIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYW1hdXJ5bGFyb3plQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJBbWF1cnkiLCJmYW1pbHlfbmFtZSI6IkxBUk9aRSIsImVtYWlsIjoiYW1hdXJ5bGFyb3plQGdtYWlsLmNvbSJ9.kUU7o9MU5OsnyxLsUAO3TJjyilWuIza9SqqJMGj4Dze_y_APfcc8NevIocYMYJm-gUm9GlLJijircdA60ZgIQZahGBJQyz8nUtZTOXI0IwxXAn2dkVf_AN0WL5zHp_FJXXOH3PoCr5sA-EpNVO_F5tm5HEXbnjn59IbtdohWmOleYiwAMsNLaNX2cLbPN_w1bBjYC5ASl3in-tS8rlvqIhRlNUBj3npvTxvvb5PJgY7aMBtgNpZLpkfZIqWU9nGwXchRphj6PvGP8nR3Fm7V3KkYkz1_oFQWc5-gMJtyufbG9VNfj3HJQvyWA3ktYJQweDoOzaklhB1ibcrP-Gyjqw'
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        const response = await axios.get(url, config)
            .then((response: any) => {
                console.log(response.data);
                return response.data;
            })
            .catch((error: any) => {
                console.error('Erreur:', error);
            });


            return response;
        try {
            console.log("A")
            const files = await fs.readdirSync('src/assets/altered/cards/AX');
            console.log("B")
            const jsonData: any = [];
            files.forEach((file: any) => {
                const fileContent = fs.readFileSync('src/assets/altered/cards/AX/' + file, 'utf8');
                jsonData.push(JSON.parse(fileContent));
            });
            console.log("C")

            console.log("JSON : ", jsonData)

            return jsonData;
        } catch (err) {
            console.log('Unable to scan directory: ' + err);
        }

    }

    async get0() {
        const FACTIONS = ['AX' , 'BR', 'LY', 'MU', 'OR', 'YZ']
        const RARITY = ['C', 'R1', 'R2']
        const BASE = 'https://www.altered.gg/fr-fr/cards/ALT_CORE_B_';
        const NB_CARD = 32;


        for (const faction of FACTIONS) {
            let i = 1;
            while (i < NB_CARD) {
                for (const rarity of RARITY) {
                    const url = `${BASE}${faction}_${this.formatNumberWithLeadingZero(i)}_${rarity}`;
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    
                    await page.goto(url, { waitUntil: 'domcontentloaded' });

                    // Attendre un court instant pour permettre à la traduction de s'effectuer
                    await this.waitForTranslationCompletion(750);

                    const content = await page.content();

                    await browser.close();

                    try {
                        this.getAlteredCard(content, faction, i.toString(), rarity);
                    } catch (error) {
                        console.error('NoData on : ', url)
                    }
                    
                }
                i++;
            }
            
        }

    }


    formatNumberWithLeadingZero(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }

    async waitForTranslationCompletion(timeout: any) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    async getAlteredCard(data: any, faction: string, number: string, rarity: string) {
            try {
                const $ = cheerio.load(data);
            const scriptContent = $('#__NEXT_DATA__').html();
            const jsonData = JSON.parse(scriptContent);

            // fs.writeFile('altered-json.html', JSON.stringify(jsonData), (err: any) => {
            //     if (err) {
            //         console.error("Error writing to file:", err);
            //     } else {
            //         console.log("Content successfully written to response.data.html");
            //     }
            // });

            const d = jsonData.props.pageProps.dehydratedState.queries[1].state.data;

            const card: Altered = {
                NAME: d.card.name,
                TYPE: d.card.cardType.reference,
                SUB_TYPE: d.card.cardSubTypes.map((c: any) => c.name),
                ATTRIBUTES: {
                    MOUTAIN: d.card.elements.MOUNTAIN_POWER,
                    FOREST: d.card.elements.FOREST_POWER,
                    OCEAN: d.card.elements.OCEAN_POWER,
                    HAND_COST: d.card.elements.MAIN_COST,
                    RESERVE_COST: d.card.elements.RECALL_COST
                },
                EFECTS: d.card.elements.MAIN_EFFECT ? d.card.elements.MAIN_EFFECT : '' + ' ' + d.card.elements.ECHO_EFFECT ? d.card.elements.ECHO_EFFECT : '',
                ILLUSTRATOR: '',
                LORE: d.lore.flavorText,
                FACTION: d.card.mainFaction.name,
                RARITY: d.card.rarity.name,
                CARD_TYPE: d.card.cardProduct.name,
                SET: d.card.cardSet.name,
                IMAGE: d.card.imagePath,
                NUMBER: parseInt(number)
            }

            if (!fs.existsSync(`src/assets/altered/cards/${faction}/`)) {
                fs.mkdirSync(`src/assets/altered/cards/${faction}/`, { recursive: true });
            }
    
           fs.writeFile(`src/assets/altered/cards/${faction}/${number}_${rarity}.json`, JSON.stringify(card, null, 4), 'utf8', (err:any) => {
               if (err) {
                   console.error('Une erreur est survenue lors de l\'écriture du fichier JSON:', err);
                   return;
               }
               console.log('Fichier JSON a été écrit avec succès : ' + `${faction}/${number}.json`);
           });
            } catch (error) {
                console.log("No result on : ", faction + "_" + number);
            }
            
    }

    parseEffects(effectString: string): Altered_Effect[] {
        console.log("===> ", effectString)
        if (effectString.length < 5) return [];
        const trimmedString = effectString.trim(); // Trim leading/trailing whitespace
    
        // Initialize an array to store parsed effects
        const parsedEffects: Altered_Effect[] = [];
    
        // Regular expression to match text within curly braces
        const regex = /\{([A-Za-z])\}(.*?)(?=\{[A-Za-z]\}|$)/gs;

        let match;

        // Iterate through matches in the string
        while ((match = regex.exec(trimmedString)) !== null) {
            // match[1] contains the text inside the curly braces (type)
            const type = match[1]?.trim();
            // match[2] contains the text after the type (effect)
            const effect = match[2]?.trim();

            // Push the parsed effect into the array
            parsedEffects.push({
                TYPE: type,
                EFFECT: effect
            });
        }

        return parsedEffects;
    }

    async get2() {
       
        const url = 'https://www.altered.gg/fr-fr/cards/ALT_CORE_B_AX_07_R1';
        const response = await axios.get(url);
        
       
        fs.writeFile('altered.html', response.data, (err: any) => {
            if (err) {
                console.error("Error writing to file:", err);
            } else {
                console.log("Content successfully written to response.data.html");
            }
        });

    }


    async Secondget() {
        fs.readFile('getCards.html', 'utf8', async (err: any, data: any) => {
            // Select all <a> tags within the specified section
            const $ = cheerio.load(data);
            var cardInfoArray: any = [];

            $('#trading-card-slider ul.slider a').each(function() {
                // Get the href attribute
                //@ts-ignore
                var href = $(this).attr('href');
        
                // Use a regular expression to extract the series and number from the URL
                var regex = /series\/(.*?)\/(\d+)\//;
                var match = href.match(regex);

                if (match) {
                    var series = match[1];
                    var number = match[2];

                    // Push the extracted information as an object into the array
                    cardInfoArray.push({ url: href, series: series, number: number });
                }
            });

            // Log the array to the console to see the result
            console.log(cardInfoArray);

            let i = 0;

            for (const card of cardInfoArray) {
                console.log(i);
                console.log(card)
                

                const url = `https://www.pokemon.com/fr/jcc-pokemon/cartes-pokemon/series/dp5/21/`;

                
                try {
                    const response = await axios.get(url);
                    fs.writeFile('CAMILLLLLE.html', response.data, (err: any) => {
                        if (err) {
                            console.error("Error writing to file:", err);
                        } else {
                            console.log("Content successfully written to response.data.html");
                        }
                    });
                    
    
                    await this.getPokemonData(response.data, card.series, card.number);
                    i++;
                } catch (error) {
                    console.error('Erreur lors de la récupération de la page :', error);
                }


            }
        });
        
    }

    async getPokemonData(content:string, series: string, number: string): Promise<any> {
       // Charger le contenu HTML avec Cheerio
       const $ = cheerio.load(content);

       //Name
       const NAME = $('.color-block h1').text();

       //Level
       console.log("$('.card-type h2').text() => ", $('.card-type h2').text())
       const LEVEL = $('.card-type h2').text().match(/\d+/)[0];

       //Evolve
       const EVOLVE = $('.card-type h4 a').text().replace(/[\n\s]+/g, '');

       //PV
       const PV = $('.card-hp').text().match(/\d+/)[0];

       //TYPE
       const TYPE = $('a i').attr('class').match(/icon-([\w-]+)/)?.[1];

       //IMAGE
       const IMAGE = '';

       //ABILITIES
       var ABILITIES: any = [];

       // Sélection des éléments ability
       $('.ability').each(function() {

           //@ts-ignore
           var lines = $(this).html().split('<br>');
           
           lines = lines.map(function(line: any) {
               return line.replace(/\s+/g, ' ').trim();
           }).filter(function(line: any) {
               return line.length > 0;
           });
           //console.log("LINE : ", lines)
       
           for (const line of lines) {
               const jQuery = cheerio.load(line);
               let ability: Ability = {};

               if (jQuery('.poke-ability').length) {
                   ability.TYPE = 1;
                   ability.NAME = jQuery('h3 div:nth-child(2)').text().trim()
                   ability.DESCRIPTION = jQuery('p').text();
               } else {
                   ability.TYPE = 0;
                   ability.NAME = jQuery('h4').text().trim();
                   ability.DESCRIPTION = jQuery('pre').text();
                   ability.POWER = parseInt(jQuery('span.right.plus').text().trim());
                   
                   let energyTypes: string[] = [];

                   // Parcourir chaque élément <a> dans la liste
                   jQuery('ul.left li a').each((index: any, element: any) => {
                       // Récupérer la valeur de l'attribut data-energy-type
                       const energyType = $(element).attr('data-energy-type');
                       // Ajouter la valeur au tableau energyTypes
                       energyTypes.push(energyType);
                   });

                   ability.COST = energyTypes
               }

               ABILITIES.push(ability);
           }

       });

       //WEAKNESS
       let WEAKNESS: Weakness = {};
       WEAKNESS.TYPE = $('.pokemon-stats .stat h4:contains("Faiblesse")').next('.card-energies').find('li[rel="tooltip"] a i').attr('class').replace('energy icon-', '');
       WEAKNESS.MULTIPLIER = $('.pokemon-stats .stat h4:contains("Faiblesse")').next('.card-energies').text().trim();

       //RESISTANCE
       let RESISTANCE: Resistance = {}
       RESISTANCE.TYPE = $('.pokemon-stats .stat h4:contains("Résistance")').next('.card-energies').find('li[rel="tooltip"] a i').attr('class')?.replace('energy icon-', '');
       RESISTANCE.MULTIPLIER = $('.pokemon-stats .stat h4:contains("Résistance")').next('.card-energies').text().trim();

       //RETREAT
       let RETREAT: string[] = []
       let energyTypes: string[] = [];

       // Parcourir chaque élément <a> dans la liste
       $('div.stat.last ul.card-energies li a i').each((index: any, element: any) => {
           const iconClass = $(element).attr('class').replace('energy icon-', '');
           energyTypes.push(iconClass);
       });
       RETREAT = energyTypes

       //SET
       let SET = $('.stats-footer h3').text();

       //NUMBER
       let NUMBER = $('.stats-footer span').text();

       //ILLUSTRATOR
       let ILLUSTRATOR = $('.illustrator .highlight a').text();

       const card: Cards = {
           NAME: NAME,
           LEVEL: LEVEL,
           EVOLVE: EVOLVE,
           PV: PV,
           TYPE: TYPE,
           IMAGE: IMAGE,
           ABILITIES: ABILITIES,
           WEAKNESS: WEAKNESS,
           RESISTANCE: RESISTANCE,
           RETREAT: RETREAT,
           SET: SET,
           NUMBER: NUMBER,
           ILLUSTRATOR: ILLUSTRATOR
       }

       console.log("EXIST ? : ", fs.existsSync(`src/assets/cards/${series}/`))
       if (!fs.existsSync(`src/assets/cards/${series}/`)) {
            fs.mkdirSync(`src/assets/cards/${series}/`, { recursive: true });
        }

       fs.writeFile(`src/assets/cards/${series}/${number}.json`, JSON.stringify(card, null, 4), 'utf8', (err:any) => {
           if (err) {
               console.error('Une erreur est survenue lors de l\'écriture du fichier JSON:', err);
               return;
           }
           console.log('Fichier JSON a été écrit avec succès');
       });
    }

    async getPokemonOld() {
        fs.readFile('pageContent2.html', 'utf8', (err: any, data: any) => {
            if (err) {
                console.error("Error reading the file:", err);
                return;
            }

            // Charger le contenu HTML avec Cheerio
            const $ = cheerio.load(data);

            //Name
            const NAME = $('.color-block h1').text();

            //Level
            const LEVEL = $('.card-type h2').text().match(/\d+/)[0];

            //Evolve
            const EVOLVE = $('.card-type h4 a').text().replace(/[\n\s]+/g, '');

            //PV
            const PV = $('.card-hp').text().match(/\d+/)[0];

            //TYPE
            const TYPE = $('a i').attr('class').match(/icon-([\w-]+)/)?.[1];

            //IMAGE
            const IMAGE = '';

            //ABILITIES
            var ABILITIES: any = [];

            // Sélection des éléments ability
            $('.ability').each(function() {

                //@ts-ignore
                var lines = $(this).html().split('<br>');
                
                lines = lines.map(function(line: any) {
                    return line.replace(/\s+/g, ' ').trim();
                }).filter(function(line: any) {
                    return line.length > 0;
                });
                //console.log("LINE : ", lines)
            
                for (const line of lines) {
                    const jQuery = cheerio.load(line);
                    let ability: Ability = {};

                    if (jQuery('.poke-ability').length) {
                        ability.TYPE = 1;
                        ability.NAME = jQuery('h3 div:nth-child(2)').text().trim()
                        ability.DESCRIPTION = jQuery('p').text();
                    } else {
                        ability.TYPE = 0;
                        ability.NAME = jQuery('h4').text().trim();
                        ability.DESCRIPTION = jQuery('pre').text();
                        ability.POWER = parseInt(jQuery('span.right.plus').text().trim());
                        
                        let energyTypes: string[] = [];

                        // Parcourir chaque élément <a> dans la liste
                        jQuery('ul.left li a').each((index: any, element: any) => {
                            // Récupérer la valeur de l'attribut data-energy-type
                            const energyType = $(element).attr('data-energy-type');
                            // Ajouter la valeur au tableau energyTypes
                            energyTypes.push(energyType);
                        });

                        ability.COST = energyTypes
                    }

                    ABILITIES.push(ability);
                }

            });

            //WEAKNESS
            let WEAKNESS: Weakness = {};
            WEAKNESS.TYPE = $('.pokemon-stats .stat h4:contains("Faiblesse")').next('.card-energies').find('li[rel="tooltip"] a i').attr('class').replace('energy icon-', '');
            WEAKNESS.MULTIPLIER = $('.pokemon-stats .stat h4:contains("Faiblesse")').next('.card-energies').text().trim();

            //RESISTANCE
            let RESISTANCE: Resistance = {}
            RESISTANCE.TYPE = $('.pokemon-stats .stat h4:contains("Résistance")').next('.card-energies').find('li[rel="tooltip"] a i').attr('class')?.replace('energy icon-', '');
            RESISTANCE.MULTIPLIER = $('.pokemon-stats .stat h4:contains("Résistance")').next('.card-energies').text().trim();

            //RETREAT
            let RETREAT: string[] = []
            let energyTypes: string[] = [];

            // Parcourir chaque élément <a> dans la liste
            $('div.stat.last ul.card-energies li a i').each((index: any, element: any) => {
                const iconClass = $(element).attr('class').replace('energy icon-', '');
                energyTypes.push(iconClass);
            });
            RETREAT = energyTypes

            //SET
            let SET = $('.stats-footer h3').text();

            //NUMBER
            let NUMBER = $('.stats-footer span').text();

            //ILLUSTRATOR
            let ILLUSTRATOR = $('.illustrator .highlight a').text();

            const card: Cards = {
                NAME: NAME,
                LEVEL: LEVEL,
                EVOLVE: EVOLVE,
                PV: PV,
                TYPE: TYPE,
                IMAGE: IMAGE,
                ABILITIES: ABILITIES,
                WEAKNESS: WEAKNESS,
                RESISTANCE: RESISTANCE,
                RETREAT: RETREAT,
                SET: SET,
                NUMBER: NUMBER,
                ILLUSTRATOR: ILLUSTRATOR
            }

            console.log("Cards : ", card)


    
            fs.writeFile(NAME + '.json', JSON.stringify(card), 'utf8', (err:any) => {
                if (err) {
                    console.error('Une erreur est survenue lors de l\'écriture du fichier JSON:', err);
                    return;
                }
                console.log('Fichier JSON a été écrit avec succès');
            });
    
        });
    }

    async old() {
        const url = "https://www.pokemon.com/fr/jcc-pokemon/cartes-pokemon/series/dp1/29/";

        const browser = await puppeteer.launch({
            headless: true, // Change to false if you want to see the browser in action
        });
        const page = await browser.newPage();
        
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Optionally, wait for a specific selector if you know what element you want
        // await page.waitForSelector('.specific-selector');

        const content = await page.content();
        console.log("Page content: ", content);

        // Write content to a file
    fs.writeFile('pageContent2.html', content, (err: any) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log("Content successfully written to pageContent.html");
        }
    });

        await browser.close();
    }

    async delay(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getRandomUserAgent() {
        const userAgents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/91.0",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.67 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Brave Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 YaBrowser/21.6.3.757 Yowser/2.5 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Whale/2.10.123.42 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 QuteBrowser/1.14.0 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Cliqz/1.44.1 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Vivaldi/4.1.2369.11 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 URBrowser/7.0.2395.0 Safari/537.36"
        ];
    
        const randomIndex = Math.floor(Math.random() * userAgents.length);
        return userAgents[randomIndex];
    }
    
}