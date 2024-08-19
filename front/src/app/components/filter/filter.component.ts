import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { FactionsService } from 'src/app/services/factions/factions.service';
import { Filter } from 'src/app/types/filter.types';
import { Panel } from 'primeng/panel';
import { RarityService } from 'src/app/services/rarity/rarity.service';
import { TypeService } from 'src/app/services/types/type.service';
import { environment } from 'src/environments/environment';

interface FilterData {
  title: string,
  data: {ID: string, NAME: string, SHORT_NAME?:string, isActive: boolean}[]
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  //@ts-ignoreElements
  @ViewChild('myPanel') myPanel: Panel;
  @Output() applyFilter = new EventEmitter<Filter>();

  constructor(private _factionService: FactionsService,
              private _rarityService: RarityService,
              private _typesService: TypeService) {}

  env = environment;
  isCollapsed = true;

  factionData: FilterData = {
    title: "Factions",
    data: []
  }

  rarityData: FilterData = {
    title: "Rareté",
    data: []
  }

  typeData: FilterData = {
    title: "Type",
    data: []
  }

  subTypeData: FilterData = {
    title: "Sous type",
    data: []
  }
  subTypeValue: any;

  search = '';

  

  ngOnInit(): void {
    this.getFactions();
    this.getRarity();
    this.getTypes();
    this.getSubTypes();
  }

  getFactions() {
    this._factionService.getFactions().subscribe({
      next: (data: any) => {
        data = data
        .filter((item: any) => item.SHORT_NAME !== "NE")
        .map((item: any) => ({
          ID: item.ID,
          NAME: item.NAME_FR,
          SHORT_NAME: item.SHORT_NAME,
          isActive: false
        })).sort((a: any, b: any) => a.ID - b.ID);;

        this.factionData.data = data;
        
      }, error: (err) => {
        console.log('getCards err : ', err)
      }, complete: () => {
      }
    })
  }

  getTypes() {
    this._typesService.getTypes().subscribe({
      next: (data: any) => {
        data = data
        .map((item: any) => ({
          ID: item.ID,
          NAME: item.NAME_FR,
          isActive: false
        })).sort((a: any, b: any) => a.ID - b.ID);;

        this.typeData.data = data;
      }, error: (err) => {
        console.log('getCards err : ', err)
      }, complete: () => {
      }
    })
  }

  getRarity() {
    this._rarityService.getRarity().subscribe({
      next: (data: any) => {
        data = data
        .map((item: any) => ({
          ID: item.ID,
          NAME: item.NAME_FR,
          isActive: false
        })).sort((a: any, b: any) => a.ID - b.ID);;

        this.rarityData.data = data;
      }, error: (err) => {
        console.log('getCards err : ', err)
      }, complete: () => {
      }
    })
  }

  getSubTypes() {
    this._typesService.getSubTypes().subscribe({
      next: (data: any) => {
        data = data
        .map((item: any) => ({
          ID: item.ID,
          NAME: item.NAME_FR,
          SHORT_NAME: item.SHORT_NAME,
          isActive: false
        })).sort((a: any, b: any) => a.ID - b.ID);;

        this.subTypeData.data = data;
      }, error: (err) => {
        console.log('getCards err : ', err)
      }, complete: () => {
      }
    })
  }

  clickOnElement(element: any) {
    element.isActive = !element.isActive;
  }

  sendFilter() {
    // console.log("Faction : ", this.factionData);
    // console.log("subTypeData : ", this.subTypeValue)
    // console.log("rarity : ", this.rarityData)
    // console.log("type : ", this.typeData)

    if (this.myPanel) {
      this.isCollapsed = true;
    }

    const factions = this.factionData.data.filter((f: any) => f.isActive == true).map((f: any) =>  f.ID );
    const type = this.typeData.data.filter((t: any) => t.isActive == true).map((t: any) =>  t.ID );
    const rarity = this.rarityData.data.filter((r: any) => r.isActive == true).map((r: any) =>  r.ID );
    const subType = this.subTypeValue?.map((t: any) => t.ID );
 
    this.applyFilter.emit({
      pagination: {
        offset: 0,
        limit: 25,
        max: 1040
      },
      factions: factions,
      rarity: rarity,
      subType: subType,
      type: type,
      search: this.search
    });
  }

}
