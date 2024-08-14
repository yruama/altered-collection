import { Component, OnInit } from '@angular/core';

import { CardsService } from 'src/app/services/cards/cards.service';
import { CollectionsService } from 'src/app/services/collections/collections.service';
import { environment } from 'src/environments/environment';

interface CardCollection {
  NO_CARD: string,
  CARD: any[]
}

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent implements OnInit {

  constructor(private _collectionService: CollectionsService,
              private _cardsService: CardsService) {}
  env = environment;

  myCollections: any;
  allCards: any;
  cards: any;
  finalCards: CardCollection[] = [];

  filter = {
    pagination: {
      offset: 0,
      limit: 200
    },
    faction: [5],
    rarity: []
  }
  
  //   this._collectionService.getOwnCollections().subscribe({

  ngOnInit(): void {
    this.getAllCards();
  }

  finalCardsSetup() {
    for (const card of this.cards) {

      try {
        console.log("CARD : ", card, " ===> ", (/(?<=BTG-)\d{3}(?=-[FCRH]-FR)/g.exec(card.FORMATED_ID)));
        const no = (/(?<=BTG-)\d{3}(?=-[FCRH]-FR)/g.exec(card.FORMATED_ID))![0]
      //  const rarity = (/BTG-\d{3}-([FCRH])-FR/g.exec(card.FORMATED_ID))![1]
      
        const checkIfExist = this.finalCards.find((c: any) => c.NO_CARD == no);



        if (!checkIfExist) {
          this.finalCards.push({
            NO_CARD: no,
            CARD: [{
              NAME: card.NAME,
              NUMBER: card.NUMBER,
              PRIORITY: 0,
              FACTION: card.FACTION
            }]
          })
        } else {
          const c = this.finalCards.find((a: any) => a.NO_CARD === no)
          c?.CARD.push({
            NAME: card.NAME,
            NUMBER: card.NUMBER,
            PRIORITY: 0,
            FACTION: card.FACTION
          });
        }
      } catch (error) {
        
      }

        
      
      
    }

    this.finalCards.sort((a: any, b: any) => a.NO_CARD.localeCompare(b.NO_CARD))

    console.log("FINAL : ", this.finalCards);
  }

  mergeData() {
    this.cards = this.allCards.map((a: any) => {
        const matchingB = this.myCollections.find((b: any) => b.ID === a.ID);
        return matchingB ? { ...a, NUMBER: matchingB.NUMBER } : { ...a, NUMBER: 0 };
    });

    this.finalCardsSetup();
  }

  getMyCollections() {
    this._collectionService.getCollections().subscribe({
      next: (data: any) => {
        console.log("getMyCollectionsT : ", data)
        this.myCollections = data;
      }, error: (err) => {
        console.log('err : ', err)
      }, complete: () => {
        this.mergeData();
      }
    })
  }

  getAllCards() {
    this._cardsService.getCardsWithFilter(this.filter).subscribe({
      next: (data: any) => {
        console.log("getAllCards : ", data)

        data = data.map((item: any) => {
          return {
            ...item, // on garde les autres champs inchangés
            IMAGE: item.IMAGE.replace(/^\"|\"$/g, ''), // remplace les guillemets en début et fin
          };
        });

        data = data.filter((item: any) => !item.ID.includes('NE'))

        this.allCards = data;
      }, error: (err) => {
        console.log('err : ', err)
      }, complete: () => {
        this.getMyCollections();
      }
    })
  }

  generateDocOld() {
    this._collectionService.generateList().subscribe({
      next: (data: any) => {
      
      }, error: (err) => {
        console.log('err : ', err)
      }, complete: () => {
        console.log('complete : ')
      }
    })
  }


  generateDoc(): void {

    const lines: string[] = [];

    for (const card of this.finalCards) {
      if (card.CARD.length === 1 && (3 - card.CARD[0].NUMBER) > 0)
        lines.push(`${3 - card.CARD[0].NUMBER}x :YZMIR: ${card.CARD[0].NAME }`)
      else if (card.CARD.length === 2 && (3 - card.CARD[1].NUMBER) > 0) {
        lines.push(`${3 - card.CARD[1].NUMBER}x :YZMIR: ${card.CARD[1].NAME }`)
      }
    }
    
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `Yzmir.txt`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
