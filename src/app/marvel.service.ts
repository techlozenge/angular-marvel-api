import { Injectable } from '@angular/core';

// in here only care about request and response from http not the entire module
import {Http, Response} from '@angular/http';

// needed for md5 hash
import { Md5 } from 'ts-md5/dist/md5';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class MarvelService {

  private baseUrl: string = 'http://gateway.marvel.com/v1/public/';
  private publicKey: string = '8e772030b79a222c38c4d89b084bcfa2';
  private privateKey: string = 'd9aa560764906a23b5d0f1212c78ea3b33a25bbc';
  private timeStamp = +new Date();
  private hash: string;
  private credentials: string;

  // npm install --save ts-md5 & add it to the constructor
  constructor(private http: Http, private Md5: Md5) { 
  
    // each time this service is started credentials will be built
    this.generateCredentials();
  }

  generateCredentials(): void {
    this.hash = String(Md5.hashStr(`${this.timeStamp}${this.privateKey}${this.publicKey}`));
    this.credentials = `?ts=${this.timeStamp}&apikey=${this.publicKey}&hash=${this.hash}`;
  }

  // Almost identical to almost every api call: get, extract, and handleError
  getRecords(endpoint: string): Observable<any> {
    let apiUrl = `${this.baseUrl}${endpoint}${this.credentials}`
    console.log(apiUrl)
    return this.http.get(apiUrl)
    // map is for success
      .map(this.extractData)
    // catch is for failure
      .catch(this.handleError);
  }

    // Almost identical to almost every api call: get, extract, and handleError
  getRecordsByName(endpoint: string, name: string): Observable<any> {
    let apiUrl = `${this.baseUrl}${endpoint}${this.credentials}&nameStartsWith=${name}`
    console.log(apiUrl)
    return this.http.get(apiUrl)
    // map is for success
      .map(this.extractData)
    // catch is for failure
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let results = res.json();
    return results;
  }

  private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if(error.status === 0){
                errMsg = "Error connecting to API"
            }else{
                const errorJSON = error.json();
                errMsg = `${errorJSON.code} - ${errorJSON.message}`;
            } 
        }
        
        return Observable.throw(errMsg);
    }

  getStuff() {
    return this.credentials;
  }

}
