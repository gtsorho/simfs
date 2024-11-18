import { Injectable } from '@angular/core';
import { LoaderService } from '../../loader.service';
import { Observable, BehaviorSubject } from 'rxjs';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  constructor(private loaderService:LoaderService) { }
  private baseUrl = this.loaderService.baseUrl()
  
  getCountries(): Observable<any> {
    const url = `${this.baseUrl}/zone/countries`;
    return new Observable((observer) => {
      axios.get(url)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    })
  }

  getRegions(id:number): Observable<any> {
    const url = `${this.baseUrl}/zone/regions/${id}`;
    return new Observable((observer) => {
      axios.get(url)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    })
  }

  getCrops(): Observable<any> {
    const url = `${this.baseUrl}/crops`;
    return new Observable((observer) => {
      axios.get(url)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    })
  }

  getAnimals(): Observable<any> {
    const url = `${this.baseUrl}/animals`;
    return new Observable((observer) => {
      axios.get(url)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    })
  }

}
