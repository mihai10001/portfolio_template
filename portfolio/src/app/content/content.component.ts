import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  contentSections: { [sectionName: string]: string } = {
    'Personal projects': 'Some personal projects',
    'Side projects': 'Projects I\'ve been part of',
    'About me': 'General information',
    'Coding': 'I like coding',
  };

  projects: { [sectionName: string]: any[] } = {
    personalProjects: [
    ],

    'sideProjects': [
    ]
  };

  projectsPerTab: number = 5;
  activeTabIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  keepOrder = (a, b) => a

  projectTabsIterator = () => { 
    let maxTabs = Math.ceil(this.projects.personalProjects.length / this.projectsPerTab);
    return Array(maxTabs).fill(0);
  }

  goToNextTab = () => { this.activeTabIndex++ }
}
