import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private darkMode = new BehaviorSubject<boolean>(false); 
  isDarkMode$ = this.darkMode.asObservable();

  setDarkMode(isDark: boolean): void {
    this.darkMode.next(isDark);
  }

  getDarkMode(): boolean {
    return this.darkMode.value;
  }
}
