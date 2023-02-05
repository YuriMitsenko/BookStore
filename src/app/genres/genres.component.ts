import { Component, OnInit } from '@angular/core';
import { TBooks3, TAuthorWitBooks } from '../shared/interfaces.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  arrayAuthor: TAuthorWitBooks[] = [];
  tmpGen: string[] = [];
  books3: TBooks3[] = [];
  books4: any = {};


  ngOnInit(): void {
    this.arrayAuthor = JSON.parse(localStorage['arAuthor']);
    console.log(this.arrayAuthor);
    let books2: { genres: string, nameBook: string, amountPages: number, lastName: string; }[] = [];

    this.arrayAuthor.map(function (elem) {
      elem.books.forEach((element: { genre: string, nameBook: any; amountPages: any; }) => {

        let book_auth = {
          genres: element.genre,
          nameBook: element.nameBook,
          amountPages: element.amountPages,
          lastName: elem.author.lastName,
        };
        books2.push(book_auth);
      });
    })

    books2.forEach((element) => {
      let index = element.genres;
      if (!this.tmpGen.includes(index)) {
        this.books4 =
        {
          gener: element.genres,
          booksList: [{
            lastName: element.lastName,
            nameBook: element.nameBook,
            amountPages: element.amountPages
          }]
        }
        this.books3.push(this.books4);
        this.tmpGen.push(element.genres);
      }
      else {
        this.books3.forEach((element2) => {
          if (element2.gener == element.genres) {
            element2.booksList.push({
              lastName: element.lastName,
              nameBook: element.nameBook,
              amountPages: element.amountPages
            });
          }
        })
      }
    });
  }
}

