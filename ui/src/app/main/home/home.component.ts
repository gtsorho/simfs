import { Component } from '@angular/core';
import { CountersComponent } from "./counters/counters.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
