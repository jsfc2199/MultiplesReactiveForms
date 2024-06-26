import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania]

  get regions(){
    return[ ...this._regions]
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]>{
    if(!region) return of([])

    return this.http.get<Country[]>(`${this.baseUrl}/region/${region}?fields=cca3,name,borders`)
    .pipe(
      map(countries => {
        return countries.map(country => {
          return {
            name: country.name.common,
            cca3: country.cca3,
            borders: country.borders ?? [] //mientras el valor de borders sea nulo o indefinido se usara [], pero cuando no lo sea, será country.borders
          }
        })
      }),
    )
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    return this.http.get<Country>(`${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`)
    .pipe(
      map(country => {
        return {
          name: country.name.common,
          cca3:country.cca3,
          borders:country.borders ?? []
        }
      } )
    )
  }
}
