import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CardsService } from 'src/app/services/cards/cards.service';
import { Pokemon } from 'src/app/types/pokemons.types';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { environment } from 'src/environments/environment';

interface PokemonWithCards extends Pokemon {
  cards?: any[]
}

@Component({
  selector: 'app-tcg',
  templateUrl: './tcg.component.html',
  styleUrls: ['./tcg.component.scss']
})
export class TcgComponent implements OnInit {
  sets: any = [];
  pagination = {
    offset: 0,
    limit: 0,
    max: 0
  }
  pokemons: PokemonWithCards[] = [];
  cards = [];
  env = environment;

  constructor(private CardsService: CardsService,
              private PokemonService: PokemonService) {}

  ngOnInit() {
    this.CardsService.getSets().subscribe({
      next: (data: any) => {
        console.log("Sets : ", data)
        this.sets = data;
      }, error: (err) => {
        
      }, complete: () => {
        this.setPagination(0, 25, 25);
      }
    })
  }

  getPokemons() {
    this.PokemonService.getPokemons(this.pagination.offset, this.pagination.limit, this.pagination.max).subscribe({
      next: (data: any) => {
       this.pokemons = data;

       console.log("Pokemons : ", data)
      }, error: (err) => {
        
      }, complete: () => {
        this.getCards();
      }
    })
  }

  setPagination(offset: number, limit: number, max: number) {
    this.pagination = {
      offset: offset,
      limit: limit,
      max: max
    }

    this.getPokemons();
  }

  async getCards() {
    for (const pokemon of this.pokemons) {
      this.CardsService.getCardsByName(pokemon.NAME).subscribe({
        next: (data: any) => {
         pokemon.cards = data;
         console.log("Pokemons : ", pokemon)
        }, error: (err) => {
          
        }, complete: () => {
        }
      })
    }
    
  }
}
