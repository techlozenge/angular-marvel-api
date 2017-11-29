import { Component, OnInit } from '@angular/core';

// !!!this refers to the service file and http client must be here for service
import { MarvelService } from './marvel.service';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Marvel API';

  // this lets 'characters' be anything!
  characters: any;

  //successMessage: string;
  //errorMessage: string;

  errorMessage: string;
  nameStartsWith: string;

  // !!!Need a constructor definition for the service
  constructor(private MarvelService: MarvelService) {}

  getCharacters() {
       this.MarvelService.getRecords("characters")
       // subscribe says wait until observable is complete
      .subscribe(
        // console.log will run AFTER the call completes - the ; and {} are required!
        characters => { 
          this.characters = characters.data.results; 
          //console.log(this.characters) 
          //this.successMessage = "got something back from marvel"
        },
        error =>  {
          this.errorMessage = <any>error; 
          //console.log(this.errorMessage)
        })     
  }

  getCharactersByName(){
    if (this.nameStartsWith) {
        this.MarvelService.getRecordsByName("characters", this.nameStartsWith)
        // subscribe says wait until observable is complete
        .subscribe(
          // console.log will run AFTER the call completes - the ; and {} are required!
          characters => { 
            this.characters = characters.data.results; 
            //console.log(this.characters) 
          },
          error =>  {
            this.errorMessage = <any>error; 
            //console.log(this.errorMessage)
          })     
    } else {
      this.getCharacters() 
    }
 }

  ngOnInit(){

    this.getCharacters();

    // !!!now we can see what the service provides
    // console.log(this.MarvelService.getRecords("characters"));
  };

}
