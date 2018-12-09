import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map as Rmap } from 'ramda';
import { Observable, interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../services/data.service';

export const districts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.css']
})
export class DataChartsComponent implements OnInit {
  tempData$: Observable<Array<[string, number]>>;
  humData$: Observable<Array<[string, number]>>;
  eleData$: Observable<Array<[string, number]>>;
  watData$: Observable<Array<[string, number]>>;
  readonly districts = districts;
  chosenDistrict: FormControl = new FormControl(1);

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.tempData$ = this.dataService
      .getTemperatureData(this.chosenDistrict.value)
      .pipe(map(Rmap(entity => [entity.date, entity.value])));
    this.humData$ = this.dataService
      .getHumidityData(this.chosenDistrict.value)
      .pipe(map(Rmap(entity => [entity.date, entity.value])));
    this.eleData$ = this.dataService
      .getElectricityData(this.chosenDistrict.value)
      .pipe(map(Rmap(entity => [entity.date, entity.value])));
    this.watData$ = this.dataService
      .getWaterData(this.chosenDistrict.value)
      .pipe(map(Rmap(entity => [entity.date, entity.value])));

    this.chosenDistrict.valueChanges
      .pipe(
        tap(val => {
          this.tempData$ = this.dataService
            .getTemperatureData(this.chosenDistrict.value)
            .pipe(map(Rmap(entity => [entity.date, entity.value])));
          this.humData$ = this.dataService
            .getHumidityData(this.chosenDistrict.value)
            .pipe(map(Rmap(entity => [entity.date, entity.value])));
          this.eleData$ = this.dataService
            .getElectricityData(this.chosenDistrict.value)
            .pipe(map(Rmap(entity => [entity.date, entity.value])));
          this.watData$ = this.dataService
            .getWaterData(this.chosenDistrict.value)
            .pipe(map(Rmap(entity => [entity.date, entity.value])));
        })
      )
      .subscribe();
  }
}
