import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-simple-card',
  templateUrl: './mat-simple-card.component.html',
  styleUrls: ['./mat-simple-card.component.css']
})
export class MatSimpleCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() avatarMatIcon: string = '';

  @Input() hasGradientBorder: boolean = false;
  @Input() isEditEnabled: boolean = false;
  @Input() isPlaceholder: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
