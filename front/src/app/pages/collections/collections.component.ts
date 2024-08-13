import { Component, OnInit } from '@angular/core';

import { CollectionsService } from 'src/app/services/collections/collections.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent implements OnInit {

  constructor(private _collectionService: CollectionsService) {}
  env = environment;
  cards: any;

  // ngOnInit(): void {
  //   this._collectionService.getOwnCollections().subscribe({
  //     next: (data: any) => {
  //       console.log("Data TEST : ", data)

  //       data = data.map((item: any) => {
  //         return {
  //           ...item, // on garde les autres champs inchangés
  //           IMAGE: item.IMAGE.replace(/^\"|\"$/g, ''), // remplace les guillemets en début et fin
  //         };
  //       });

  //       this.cards = data;
  //     }, error: (err) => {
  //       console.log('err : ', err)
  //     }, complete: () => {
  //       console.log('complete : ')
  //     }
  //   })
  // }

  ngOnInit(): void {
    this._collectionService.getCollections().subscribe({
      next: (data: any) => {
        console.log("Data TEST : ", data)

        data = data.map((item: any) => {
          return {
            ...item, // on garde les autres champs inchangés
            IMAGE: item.IMAGE.replace(/^\"|\"$/g, ''), // remplace les guillemets en début et fin
          };
        });

        data = data.filter((item: any) => !item.ID.includes('NE'))

        this.cards = data;
      }, error: (err) => {
        console.log('err : ', err)
      }, complete: () => {
        console.log('complete : ')
      }
    })
  }

  generateDoc() {
    this._collectionService.generateList().subscribe({
      next: (data: any) => {
      
      }, error: (err) => {
        console.log('err : ', err)
      }, complete: () => {
        console.log('complete : ')
      }
    })
  }

}
