import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { filter, switchMap, tap } from 'rxjs';
import { SmallCountry } from '../../interfaces/country';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent {
  constructor(
    private fb: FormBuilder,
    private countryService: CountryService
  ) {}

  countriesByRegion: SmallCountry[] = []
  borders: SmallCountry[] =[]

  form: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  get regions() {
    return this.countryService.regions;
  }

  //listener cuando la region cambia implementando onInit
  ngOnInit(): void {
    this.onRegionChanged(),
    this.onCountryChange()
  }
  onRegionChanged(){
    this.form.get('region')?.valueChanges
    .pipe(
      tap(()=>this.form.get('country')?.setValue('')),
      tap(()=>this.borders = []),

      //operador que permite recibir el valor de un observable y suscribirme a otro observable
      switchMap(region => this.countryService.getCountriesByRegion(region)),

    )
    .subscribe( countries => {
      this.countriesByRegion = countries
    })
  }

  onCountryChange(){
    this.form.get('country')?.valueChanges
    .pipe(
      tap(()=>this.form.get('borders')?.setValue('')),
      filter((value:string) => value.length > 0), //validamos que el código llegue con valor
      switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode)),
      switchMap(country => this.countryService.getCountryBordersByCodes(country.borders))
    )
    .subscribe( countries => {
      this.borders = countries
    })
  }
}
