import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mfs-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mfs-info.component.html',
  styleUrl: './mfs-info.component.scss'
})
export class MfsInfoComponent {

}
