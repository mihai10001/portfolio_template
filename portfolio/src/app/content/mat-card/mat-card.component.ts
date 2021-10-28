import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-card',
  templateUrl: './mat-card.component.html',
  styleUrls: ['./mat-card.component.css']
})
export class MatCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() avatarMatIcon: string = '';
  @Input() content: string = '';
  @Input() imgSrc: string = '';

  @Input() gitButtonLink: string = '';
  @Input() demoButtonLink: string = '';
  @Input() customButtonLink: string = '';
  @Input() customButtonText: string = '';

  @Input() tags: string[] = [];

  @Input() hasGradientBorder: boolean = false;
  @Input() disabled: boolean = false;

  expanded: boolean = false;

  constructor() { }

  ngOnInit() { }

  toggleExpandedContent = () => this.expanded = !this.expanded;
}
