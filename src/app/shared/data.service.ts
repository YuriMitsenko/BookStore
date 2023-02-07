import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {of} from 'rxjs'

import { TAuthorWitBooks } from '../shared/interfaces.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getauthorWitBooks():Observable<TAuthorWitBooks[]> {
    return of(JSON.parse(localStorage['arAuthor']));

  }

  setauthorWitBooks(arrayAuthor:any){
    localStorage['arAuthor'] = JSON.stringify(arrayAuthor);

  }
}
