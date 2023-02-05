import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfacesService {

  constructor() { }
}

export interface IAuthor {
  lastName: string;
  firstName: string;
  secondName?: string;
  birthDate: Date;
  }

export interface IBook {
  nameBook: string;
  amountPages: number;
  genre: string;
  length?: number;
}

export interface TAuthorWitBooks {
  author: IAuthor;
  books: IBook[];
}

export interface TBooks3{
  gener:string,
  booksList:[TBooksList]
}

export interface TBooksList{
  lastName: string,
  nameBook: string,
  amountPages: number
}
