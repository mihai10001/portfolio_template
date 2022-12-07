import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEmojisModule } from 'angular-emojis';
import { SwipeModule } from 'ng-swipe';

import { MaterialModule } from '../material.module';
import { ContentComponent } from './content.component';
import { MatCardComponent } from './mat-card/mat-card.component';
import { MatParagraphCardComponent } from './mat-paragraph-card/mat-paragraph-card.component';


@NgModule({
  declarations: [
    ContentComponent,
    MatCardComponent,
    MatParagraphCardComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularEmojisModule,
    SwipeModule,
  ]
})
export class ContentModule { }
