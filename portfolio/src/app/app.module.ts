import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularEmojisModule } from 'angular-emojis';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { LayoutComponent } from './layout/layout.component';
import { ContentModule } from './content/content.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ContentModule,
    MaterialModule,
    AngularEmojisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
