import { Component, Input, OnInit } from '@angular/core';
import { ParagraphCardModel } from '../models/CardModel';

@Component({
  selector: 'app-mat-paragraph-card',
  templateUrl: './mat-paragraph-card.component.html',
  styleUrls: ['./mat-paragraph-card.component.css']
})
export class MatParagraphCardComponent implements OnInit {

  @Input() card: ParagraphCardModel;
  visibleParagraphs: number = 2;
  isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  toggleExpansion = () => this.isExpanded = !this.isExpanded;
}
