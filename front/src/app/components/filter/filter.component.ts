import { Component, OnInit, ViewChild } from '@angular/core';

import { FactionsService } from 'src/app/services/factions/factions.service';
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

  

  ngOnInit(): void {
    this.getFactions();
    this.getRarity();
    this.getTypes();
    this.getSubTypes();
  }

  getFactions() {
    this._factionService.getFactions().subscribe({
      next: (data: any) => {
        console.log("getFactions : ", data)

        data = data
        .filter((item: any) => item.SHORT_NAME !== "NE")
        .map((item: any) => ({
          ID: item.ID,
          NAME: item.NAME_FR,
          SHORT_NAME: item.SHORT_NAME,
          isActive: false
        })).sort((a: any, b: any) => a.ID - b.ID);;

        this.factionData.data = data;
        console.log("factionData : ", this.factionData.data)
        
      }, error: (err) => {
        console.log('getCards err : ', err)
      }, complete: () => {
        console.log('getCards complete.')
      }
    })
  }

  getTypes() {
    this._typesService.getTypes().subscribe({
      next: (data: any) => {
        console.log("getTypes : ", data)

        data = data
        .map((item: any) => ({
          ID: item.ID,
          NAME: item.NAME_FR,
          isActive: false
        })).sort((a: any, b: any) => a.ID - b.ID);;

        this.typeData.data = data;
        console.log("typeData : ", this.typeData.data)
        
      }, error: (err) => {
        console.log('getCards err : ', err)
      }, complete: () => {
        console.log('getCards complete.')
      }
    })
  }

  getRarity() {
    this._rarityService.getRarity().subscribe({
      next: (data: any) => {
        console.log("getRarity : ", data)

        data = data
        .map((item: any) => ({
          ID: item.ID,
          NAME: item.NAME_FR,
          isActive: false
        })).sort((a: any, b: any) => a.ID - b.ID);;

        this.rarityData.data = data;
        console.log("rarityData : ", this.rarityData.data)
        
      }, error: (err) => {
        console.log('getCards err : ', err)
      }, complete: () => {
        console.log('getCards complete.')
      }
    })
  }

  getSubTypes() {
    this._typesService.getSubTypes().subscribe({
      next: (data: any) => {
        console.log("getSubTypes : ", data)

        data = data
        .map((item: any) => ({
          ID: item.ID,
          NAME: item.NAME_FR,
          SHORT_NAME: item.SHORT_NAME,
          isActive: false
        })).sort((a: any, b: any) => a.ID - b.ID);;

        this.subTypeData.data = data;
        console.log("subTypeData : ", this.subTypeData.data)
        
      }, error: (err) => {
        console.log('getCards err : ', err)
      }, complete: () => {
        console.log('getCards complete.')
      }
    })
  }

  clickOnElement(element: any) {
    element.isActive = !element.isActive;
  }

  applyFilter() {
    console.log("Faction : ", this.factionData);
    console.log("subTypeData : ", this.subTypeValue)
    console.log("PANEL : ", this.myPanel)
    if (this.myPanel) {
      console.log("SAL")
      this.isCollapsed = true;
    }
  }

  handleToggle() {
    this.isCollapsed = !this.isCollapsed;
  }

}
