import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material.module';
import { ContentComponent } from './content.component';
import { MatCardComponent } from './mat-card/mat-card.component';


@NgModule({
  declarations: [
    ContentComponent,
    MatCardComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule
  ]
})
export class ContentModule { }
