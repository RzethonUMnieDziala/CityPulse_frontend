import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map as Rmap } from 'ramda';
import { interval, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService, modulesConfig } from '../services/data.service';

export const districts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20, 21];

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.css']
})
export class DataChartsComponent implements OnInit, OnDestroy {
  tempData;
  humData;
  eleData;
  watData;
  polData;
  readonly districts = districts;
  chosenDistrict: FormControl = new FormControl(1);
  modules = modulesConfig;

  private intervalSub: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchData();

    this.intervalSub = interval(2000)
      .pipe(tap(() => this.fetchData()))
      .subscribe();

    this.chosenDistrict.valueChanges
      .pipe(
        tap(() => {
          this.fetchData();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.intervalSub.unsubscribe();
  }

  private fetchData() {
    this.dataService
      .getTemperatureData(this.chosenDistrict.value)
      .pipe(
        map(Rmap(entity => [entity.date, entity.value])),
        tap(res => (this.tempData = res))
      )
      .subscribe();
    this.dataService
      .getHumidityData(this.chosenDistrict.value)
      .pipe(
        map(Rmap(entity => [entity.date, entity.value])),
        tap(res => (this.humData = res))
      )
      .subscribe();
    this.dataService
      .getElectricityData(this.chosenDistrict.value)
      .pipe(
        map(Rmap(entity => [entity.date, entity.value])),
        tap(res => (this.eleData = res))
      )
      .subscribe();
    this.dataService
      .getWaterData(this.chosenDistrict.value)
      .pipe(
        map(Rmap(entity => [entity.date, entity.value])),
        tap(res => (this.watData = res))
      )
      .subscribe();
  }
}
