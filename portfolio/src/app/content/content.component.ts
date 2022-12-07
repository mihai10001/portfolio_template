import { Component, OnInit } from '@angular/core';
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
}
