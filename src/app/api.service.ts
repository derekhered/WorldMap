import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchCountryData(code: string) {
    let api = `http://api.worldbank.org/v2/country/${code}?format=JSON&per_page=300`;
    console.log(api);

    return this.http.get(api)
  }

  setCountryData(code: string) {
    let subject = new Subject();

    this.fetchCountryData(code).subscribe((data: any) => {
      const countryData = data[1][0];
        subject.next({
        capital: countryData.capitalCity,
        income: countryData.incomeLevel.value,
        region: countryData.region.value,
        countryLatitude: countryData.latitude,
        countryLongitude: countryData.longitude
      })
    })

    return subject.asObservable();
  }
}
