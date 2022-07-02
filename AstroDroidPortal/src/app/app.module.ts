import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditBotBlocklyComponent } from './edit-bot-blockly/edit-bot-blockly.component';

@NgModule({
  declarations: [
    AppComponent,
    EditBotBlocklyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[
    NO_ERRORS_SCHEMA 
  ]
})
export class AppModule { }
