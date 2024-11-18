import { CommonModule } from '@angular/common';
import { Component, Input  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  constructor(private router: Router) {}

  @Input() zone: any; 
  @Input() nuggets: any;

  items = [
    { name: 'Monogastric Feed', description: 'Ensure monogastric animals have their special diet today.', value: 57 },
    { name: 'Diet Adjustment', description: 'This is a long piece of text that should be truncated after 150 characters to demonstrate the utility of Tailwind CSS and Angular working together.', value: 147 },
    { name: 'Routine Monitoring', description: 'Monitor the health of monogastric animals.', value: 42 },
    { name: 'Health Check', description: 'Ensure regular health checks are performed for accurate data.', value: 100 },
    { name: 'Nutrient Analysis', description: 'Perform detailed analysis of nutrients for better feed management.', value: 90 },
  ];
  currentIndex = 0;
  startX = 0;
  isDragging = false;

  sendMsg(msg:string) {
    this.router.navigate(['/package_signin'], { queryParams: { zone: this.zone.zone, msg: msg, username:this.zone.username} });
  }


  getItem(position: number) {
    return this.nuggets[(this.currentIndex + position) % this.nuggets.length];
  }

  nextItem() {
    if (this.currentIndex < this.nuggets.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
  }

  prevItem() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.nuggets.length - 1; // Loop back to end
    }
  }

  isFocused(position: number): boolean {
    return position === 1; // Middle div is always the focused one
  }

  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = this.getEventX(event);
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const currentX = this.getEventX(event);
    const diff = this.startX - currentX;

    if (diff > 50) {
      this.nextItem();
      this.endDrag();
    } else if (diff < -50) {
      this.prevItem();
      this.endDrag();
    }
  }

  endDrag() {
    this.isDragging = false;
  }

  getEventX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }
}
