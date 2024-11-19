import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  baseUrl() {
    // return 'http://localhost:3000/api';
    return 'https://mfs.miphost.com/api';
  }

  aghubUrl() {
    return 'https://aghub.miphost.com/api';
  }

  constructor( ) { }

  private darkMode = new BehaviorSubject<boolean>(false); 
  isDarkMode$ = this.darkMode.asObservable();

  setDarkMode(isDark: boolean): void {
    this.darkMode.next(isDark);
  }

  getDarkMode(): boolean {
    return this.darkMode.value;
  }
}
