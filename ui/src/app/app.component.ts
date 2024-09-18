import { CommonModule } from '@angular/common';
import { Component, Renderer2  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoaderService } from './loader.service';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  isDarkMode = true;

  constructor(private renderer: Renderer2, private loaderService: LoaderService) {
    this.loaderService.isDarkMode$.subscribe((res) => {
      this.isDarkMode = res;
    });
  }

  // toggleDarkMode() {
  //   this.isDarkMode = !this.isDarkMode;

  //   if (this.isDarkMode) {
  //     this.renderer.addClass(document.body, 'dark');  
  //   } else {
  //     this.renderer.removeClass(document.body, 'dark');
  //   }
  // }
}
