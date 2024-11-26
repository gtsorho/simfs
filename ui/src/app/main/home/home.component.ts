import { Component } from '@angular/core';
import { CountersComponent } from "./counters/counters.component";
import { HomeSliderComponent } from './slider/slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountersComponent, HomeSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
