import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective
} from '@coreui/angular';

@Component({
  selector: 'home-slider',
  standalone: true,
  imports: [ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselCaptionComponent, CarouselControlComponent, RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class HomeSliderComponent  implements OnInit  {
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: '../../../assets/1.jpg',
      title: 'Run successful Full and Hybrid Farming Systems',
      subtitle: 'Run your crops farming systems and connect to extensions officers for advisories'
    };
    this.slides[1] = {
      id: 1,
      src: '../../../assets/2.jpg',
      title: 'Run successful Full and Hybrid Farming Systems',
      subtitle: 'You are a crop farmer with poultry, get information of how to seamlessly manage both crops and birds.'
    };
    this.slides[2] = {
      id: 2,
      src: '../../../assets/3.jpg',
      title: 'Run successful Full and Hybrid Farming Systems',
      subtitle: 'Also with ruminant animals we have got your covered with plans that support your systems'
    };
  }
}