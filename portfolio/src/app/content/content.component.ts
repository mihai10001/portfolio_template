import { Component, OnInit } from '@angular/core';
import { SwipeEvent } from 'ng-swipe';
import { ContentModel } from './models/ContentModel';
import { ContentService } from './services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  content: ContentModel = this.contentService.content;
  activeTabIndex: number = 0;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.contentService.activeTabIndexSubject
      .subscribe(activeTabIndex => this.activeTabIndex = activeTabIndex)
  }

  setTabIndex(index: number) {
    this.contentService.activeTabIndexSubjectValue = index;
  }

  keepOrder = (a, b) => a

  goToNextTab = () => this.activeTabIndex++

  goToTab = (tabIndex: number) => this.activeTabIndex = tabIndex

  onSwipeEnd(event: SwipeEvent) {
    const minimumSwipeDistance = 60;

    if (Math.abs(event.distance) > minimumSwipeDistance && event.direction === 'x') {
      if (event.distance < 0) 
        this.swipeLeft();
      else if (event.distance >= 0) 
        this.swipeRight();
    }
  }

  // Infinite scroll
  swipeLeft() {
    this.activeTabIndex = this.activeTabIndex < this.content.sections.length - 1 ? this.activeTabIndex + 1 : 0;
  }
  swipeRight() {
    this.activeTabIndex = this.activeTabIndex > 0 ? this.activeTabIndex - 1 : this.content.sections.length;  
  }
}
