import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from '../models/CardModel';

@Component({
  selector: 'app-mat-card',
  templateUrl: './mat-card.component.html',
  styleUrls: ['./mat-card.component.css']
})
export class MatCardComponent implements OnInit {

  @Input() card: CardModel;
  isExpanded: boolean = false;

  constructor() { }

  ngOnInit() { }

  toggleExpansion = () => this.isExpanded = !this.isExpanded;
}
