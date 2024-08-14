import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Cards } from 'src/app/types/cards.types';
import { CardsService } from 'src/app/services/cards/cards.service';
import { Pokemon } from 'src/app/types/pokemons.types';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { environment } from 'src/environments/environment';

interface PokemonWithCards extends Pokemon {
  cards?: any[]
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  sets: any = [];
  
  cards: Cards[] = [];
  env = environment;

  buttonLoading = false;

  filter = {
    pagination: {
      offset: 0,
      limit: 200,
      max: 1040
    },
    faction: [],
    rarity: []
  }


  constructor(private CardsService: CardsService,
              private _cardService: CardsService) {}

  ngOnInit() {
    this.setPagination(0, 50, 1041);
  }

  getCards() {
    this._cardService.getCardsWithFilter(this.filter).subscribe({
      next: (data: any) => {
        this.cards = [... this.cards, ...data];
        console.log("getCards : ", this.cards)
      }, error: (err) => {
        console.log('getCards err : ', err)
      }, complete: () => {
        console.log('getCards complete.')
        this.buttonLoading = false;
      }
    })
  }

  loadMore() {
    if (this.buttonLoading) return;
    this.buttonLoading = true;
    this.setPagination(this.filter.pagination.offset + 50, this.filter.pagination.limit, this.filter.pagination.max);
  }

  setPagination(offset: number, limit: number, max: number) {
    this.filter.pagination = {
      offset: offset,
      limit: limit,
      max: max
    }

    this.getCards();
  }

}
