import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// must have this for request
import {HttpModule} from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';

import { MarvelService } from './marvel.service';
import { CharacterListComponent } from './character-list/character-list.component';
import { StatusMessageComponent } from './status-message/status-message.component';


@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    StatusMessageComponent
  ],

  // NEED TO INCUDE IMPORTS
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],

  // MUST INCLUDE SERVICE IN PROVIDERS
  providers: [MarvelService, Md5],
  bootstrap: [AppComponent]
})
export class AppModule { }
