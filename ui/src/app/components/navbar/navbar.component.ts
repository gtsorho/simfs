import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../loader.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  isDarkMode: boolean = false
  menuToggle: any;

  constructor( private loaderService: LoaderService) {
    this.loaderService.isDarkMode$.subscribe((res) => {
      this.isDarkMode = res;
    });
  }

toggleDarkMode(): void {
  this.loaderService.setDarkMode(!this.isDarkMode);
}

}
