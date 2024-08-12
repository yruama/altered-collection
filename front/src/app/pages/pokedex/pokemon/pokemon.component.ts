import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CardsService } from 'src/app/services/cards/cards.service';
import { Pokemon } from 'src/app/types/pokemons.types';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  id!: string;
  pokemon!: Pokemon;
  evolutions: Pokemon[] = [];
  env = environment;
  cards: any = [];

  isLoading = true;

  constructor(private route: ActivatedRoute,
              private PokemonService: PokemonService,
              private CardsService: CardsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Vous pouvez maintenant utiliser this.id dans votre composant
      console.log(this.id);
      this.getPokemon()
    });
  }

  getPokemon() {
    this.PokemonService.getPokemon(this.id).subscribe({
      next: (data: any) => {
        console.log("Pokemon : ", data)
        this.pokemon = data;
      }, error: (err) => {
        
      }, complete: () => {
        this.isLoading = false;
        this.getCards();
      }
    })
  }

  getCards() {
    this.CardsService.getCardsByName(this.pokemon.NAME).subscribe({
      next: (data: any) => {
        console.log("Cards : ", data)
        this.cards = data;
      }, error: (err) => {
        
      }, complete: () => {
        this.isLoading = false;
      }
    })
  }

}
