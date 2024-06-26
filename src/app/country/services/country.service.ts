import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

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

    return this.http.get<SmallCountry[]>(`${this.baseUrl}/region/${region}?fields=cca3,name,borders`)
    .pipe(
      tap(countries => console.log(countries))
    )
  }
}
