import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class MaterialModule {}