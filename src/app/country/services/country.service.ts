import { Injectable } from '@angular/core';
import { Region } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania]

  get regions(){
    return[ ...this._regions]
  }
}
