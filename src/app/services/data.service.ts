import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { replace } from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getTemperatureData(
    districtNumber: number
  ): Observable<
    Array<{
      value: number;
      date: Date;
      place: string;
    }>
  > {
    return this.sendRequest('temperature', districtNumber);
  }

  public getHumidityData(
    districtNumber: number
  ): Observable<
    Array<{
      value: number;
      date: Date;
      place: string;
    }>
  > {
    return this.sendRequest('humidity', districtNumber);
  }

  public getElectricityData(
    districtNumber: number
  ): Observable<
    Array<{
      value: number;
      date: Date;
      place: string;
    }>
  > {
    return this.sendRequest('electricity', districtNumber);
  }

  public getWaterData(
    districtNumber: number
  ): Observable<
    Array<{
      value: number;
      date: Date;
      place: string;
    }>
  > {
    return this.sendRequest('water', districtNumber);
  }

  private sendRequest(
    endpoint: string,
    districtNumber: number
  ): Observable<
    Array<{
      value: number;
      date: Date;
      place: string;
    }>
  > {
    return this.http.get<
      Array<{
        value: number;
        date: Date;
        place: string;
      }>
    >(
      `http://192.168.0.108:8000/api/${endpoint}/?date__gte=${replace(
        /:/g,
        '%3A',
        new Date(Date.now() - 1000000).toISOString()
      )}`,
      {
        params: new HttpParams()
          .set('format', 'json')
          .set('place__icontains', `Osiedle+${districtNumber.toString()}`)
      }
    );
  }
}
