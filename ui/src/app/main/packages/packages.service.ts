import { Injectable } from '@angular/core';
import { LoaderService } from '../../loader.service';
import { Observable, BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

constructor(private loaderService:LoaderService) { }
private baseUrl = this.loaderService.baseUrl()
private aghubUrl = this.loaderService.aghubUrl()


getRegions(): Observable<any> {
  const url = `${this.baseUrl}/zone/regions`;
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

getDistricts(id:number): Observable<any> {
  const url = `${this.baseUrl}/zone/districts/${id}`;
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

getDistrict(id:number): Observable<any> {
  const url = `${this.baseUrl}/zone/district/${id}`;
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

getZoneSystems(id:number): Observable<any> {
  const url = `${this.baseUrl}/zone/zone_sys/${id}`;
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

getActivities_per_System(id:number): Observable<any> {
  const url = `${this.baseUrl}/activity/${id}`;
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

getNuggets_per_Activity(id:number): Observable<any> {
  const url = `${this.baseUrl}/nuggets/${id}`;
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
