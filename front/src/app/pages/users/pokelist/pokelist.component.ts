import { Component, OnInit } from '@angular/core';

import TCGdex from '@tcgdex/sdk'

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss']
})
export class PokelistComponent implements OnInit {
 
  ngOnInit(): void {
    const tcgdex = new TCGdex('fr');

    (async () => {
      // Card will be Furret from the Darkness Ablaze Set
      const card = await tcgdex.fetch('series');

      console.log(card);

      const res = await tcgdex.fetch('cards', 'arcanin')

      console.log(res)
    })();
  }

}
