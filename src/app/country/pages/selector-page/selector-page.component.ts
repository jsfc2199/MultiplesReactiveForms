import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent {
  constructor(
    private fb: FormBuilder,
    private countryService: CountryService
  ) {}

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
    this.onRegionChanged()
  }
  onRegionChanged(){
    this.form.get('region')?.valueChanges
    .pipe(
      //operador que permite recibir el valor de un observable y suscribirme a otro observable
      switchMap(region => this.countryService.getCountriesByRegion(region))
    )
    .subscribe( region => {
      console.log(region)
    })
  }
}
