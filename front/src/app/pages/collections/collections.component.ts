import { Component, OnInit } from '@angular/core';

import { CardsService } from 'src/app/services/cards/cards.service';
import { CollectionsService } from 'src/app/services/collections/collections.service';
import { Filter } from 'src/app/types/filter.types';
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
  cards: any = [];
  filter: Filter = {
    pagination: {
      offset: 0,
      limit: 25,
      max: 1040
    }
  }

  imageHover = '';

  showCommon = false;
  limitToGet = 3;
  showOnlyMissing = false;

  
  ngOnInit(): void {
    // this._collectionService.getOwnCollections().subscribe({
    //   next: (data: any) => {
    //     console.log("getMyCollectionsT : ", data)
    //     this.myCollections = data;
    //   }, error: (err) => {
    //     console.log('err : ', err)
    //   }, complete: () => {
        
    //   }
    // });
    // return;

    this.getMyCollections();
  }


  mergeData(cards: any) {
    const allCards = cards.map((a: any) => {
        const matchingB = this.myCollections.find((b: any) => b.ID === a.ID);
        return matchingB ? { ...a, NUMBER: matchingB.NUMBER } : { ...a, NUMBER: 0 };
    });

    const finalCards: any[] = []

    for (const card of allCards) {
      try {
        const no = (/(?<=BTG-)\d{3}(?=-[FCRH]-FR)/g.exec(card.FORMATED_ID))![0]

        const checkIfExist = finalCards.find((c: any) => c.NO_CARD == no);

        if (!checkIfExist) {
          finalCards.push({
            NO_CARD: no,
            CARD: [{
              NAME: card.NAME,
              NUMBER: card.NUMBER,
              PRIORITY: 0,
              FACTION: card.FACTION,
              RARITY: card.RARITY,
              IMAGE: card.IMAGE,
              BG: `${this.env.assetsURL}/factions/${card.FACTION}.webp`
            }]
          })
        } else {
          const c = finalCards.find((a: any) => a.NO_CARD === no)
          c?.CARD.push({
            NAME: card.NAME,
            NUMBER: card.NUMBER,
            PRIORITY: 0,
            FACTION: card.FACTION,
            RARITY: card.RARITY,
            IMAGE: card.IMAGE,
            BG: `${this.env.assetsURL}/factions/${card.FACTION}.webp`
          });
        }
      } catch (error) {
        
      }
    }

    finalCards.sort((a: any, b: any) => a.NO_CARD.localeCompare(b.NO_CARD))

    console.log("FINALCARD : ", finalCards)

    for (const card of finalCards) {
      if (card) card.CARD = this.customSort(card.CARD);
    }

    return finalCards;
  }

  getMyCollections() {
    this._collectionService.getCollections().subscribe({
      next: (data: any) => {
        console.log("getMyCollectionsT : ", data)
        this.myCollections = data;
      }, error: (err) => {
        console.log('err : ', err)
      }, complete: () => {
        this.getCards();
      }
    })
  }


  // generateDoc(): void {

  //   const lines: string[] = [];

  //   for (const card of finalCards) {
  //     if (card.CARD.length === 1 && (3 - card.CARD[0].NUMBER) > 0)
  //       lines.push(`${3 - card.CARD[0].NUMBER}x :YZMIR: ${card.CARD[0].NAME }`)
  //     else if (card.CARD.length === 2 && (3 - card.CARD[1].NUMBER) > 0) {
  //       lines.push(`${3 - card.CARD[1].NUMBER}x :YZMIR: ${card.CARD[1].NAME }`)
  //     }
  //   }
    
  //   const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8;' });
  //   const link = document.createElement('a');
  //   const url = URL.createObjectURL(blob);

  //   link.setAttribute('href', url);
  //   link.setAttribute('download', `Yzmir.txt`);
  //   link.style.visibility = 'hidden';

  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  getCards() {
    this.filter.pagination.limit = this.filter.pagination.limit == 25 ? 75 : this.filter.pagination.limit;
    this._cardsService.getCardsWithFilter(this.filter).subscribe({
      next: (data: any) => {
        console.log("DATA : ", data)
        const cardsToAdd = this.mergeData(data.data)
        this.cards = [... this.cards, ...cardsToAdd];
        this.filter.pagination.max = data.total;
        console.log("getCards : ", this.cards)
      }, error: (err) => {
        console.log('getCards err : ', err)
      }, complete: () => {
      }
    })
  }

  applyFilter(filter: any) {
    console.log("Filter : ", filter);
    this.cards = [];
    this.filter = filter;
    this.getCards();
  }

  customSort(cards: any[]) {
    //On récupère la CARD commune (0)
    const common = cards.find((c: any) => c.RARITY == 0);
    // On cherche la CARD rare de la même faction
    const rare = cards.find((c: any) => c.RARITY == 1 && c.FACTION == common.FACTION);
    const transfuge = cards.find((c: any) => c.RARITY == 1 && c.FACTION != common.FACTION);

    return [common, rare, transfuge];

  }

  hoveredImage(card: any) {
    this.imageHover = card.IMAGE.fr;
  }

  setPagination(offset: number, limit: number, max: number) {
    this.filter.pagination = {
      offset: offset,
      limit: limit,
      max: max
    }

    this.getCards();
  }
  
  loadMore() {
    this.setPagination(this.filter.pagination.offset + 75, this.filter.pagination.limit, this.filter.pagination.max);
  }

}



    // this._collectionService.getOwnCollections().subscribe({
    //   next: (data: any) => {
    //     console.log("getMyCollectionsT : ", data)
    //     this.myCollections = data;
    //   }, error: (err) => {
    //     console.log('err : ', err)
    //   }, complete: () => {
    //     this.mergeData();
    //   }
    // });
    // return;