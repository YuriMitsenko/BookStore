import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { TAuthorWitBooks } from '../shared/interfaces.service';
import { nameFunc } from './custom-validators';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor(private dataService: DataService) { }

  addMenuAuthor: boolean = false;
  addDetMenu: boolean = false;
  saveEdit: boolean = true;
  btnMenuAuthor: boolean = true;
  idAuthor: number = 0;
  authorWitBooks!: FormGroup;
  arrayAuthor: TAuthorWitBooks[] = [];
  books!: FormArray;
  author!: FormGroup;
  detAutor!: TAuthorWitBooks;
  filterArrayAuthor: TAuthorWitBooks[] = [];
  amount: number = 0;


  ngOnInit() {
    console.log(this.arrayAuthor);
    this.dataService.getauthorWitBooks().subscribe((res: TAuthorWitBooks[]) => {
      console.log(res),
        this.arrayAuthor = res
    });

    // if (localStorage['arAuthor'] != undefined)
    //   this.arrayAuthor = JSON.parse(localStorage['arAuthor']);
    // console.log(this.arrayAuthor);


    this.author = new FormGroup({
      lastName: new FormControl('', [Validators.required, nameFunc]),
      firstName: new FormControl('', [Validators.required, nameFunc]),
      secondName: new FormControl('', [Validators.required, nameFunc]),
      birthDate: new FormControl(),
    });

    this.books = new FormArray([
      new FormGroup({
        nameBook: new FormControl(),
        amountPages: new FormControl(),
        genre: new FormControl()
      })
    ])

    this.authorWitBooks = new FormGroup({
      author: this.author,
      books: this.books
    })

    console.log(this.authorWitBooks)
  }

  addBook() {
    this.books.push(new FormGroup({
      nameBook: new FormControl(),
      amountPages: new FormControl(),
      genre: new FormControl(),
    }))
  }

  addMenuAuthorAll() {
    this.addMenuAuthor = !this.addMenuAuthor;
  }

  addAuthorWitBooks(form: any) { // сохранить автора и книги в мас и в localSt
    console.log(form.value);
    this.arrayAuthor.push(form.value);
    // localStorage['arAuthor'] = JSON.stringify(this.arrayAuthor);
    this.dataService.setauthorWitBooks(this.arrayAuthor);
    this.addMenuAuthor = !this.addMenuAuthor;
    this.authorWitBooks.reset();
    this.books.removeAt(form);
  }

  delBook(index: number) {  // удалить один arrayinput книга
    console.log(index);
    this.books.removeAt(index);
  }

  delAuthor(index: number) { // удалить автора с общей таблицы и перезап
    this.arrayAuthor.splice(index, 1);
    this.dataService.setauthorWitBooks(this.arrayAuthor);
    // localStorage['arAuthor'] = JSON.stringify(this.arrayAuthor);
  }

  detailsAutor(author: any) { // открыть меню детали
    if (author == this.detAutor) { this.addDetMenu = false }
    else { this.detAutor = author };
    this.addDetMenu = !this.addDetMenu;
  }

  closeDetMenu() {  // закрыть меню детали
    this.addDetMenu = !this.addDetMenu;
  }

  editAuthorWitBooks(author: TAuthorWitBooks, amount: number, index: number) {
    this.saveEdit = false;
    this.idAuthor = index;
    console.log(author);
    this.addMenuAuthor = true;
    this.amount = amount;
    this.btnMenuAuthor = false;


    console.log(this.authorWitBooks.value)

    this.author.patchValue({
      lastName: author.author.lastName,
      firstName: author.author.firstName,
      secondName: author.author.secondName,
      birthDate: author.author.birthDate
    });

    console.log(this.books.value.length)

    for (let i = 0; i < this.amount - 1; i++) {
      this.addBook()
    }

    for (let i = 0; i < this.amount; i++) {
      console.log(i)
      this.books.controls[i].patchValue({
        nameBook: author.books[i].nameBook,
        amountPages: author.books[i].amountPages,
        genre: author.books[i].genre,

      })
      console.log(this.books.controls[i])
    }

  }

  saveAuthorWitBooks(form: any) { // сохранить после изменения автора
    console.log(form, this.idAuthor);
    this.arrayAuthor.push(form.value);
    // this.dataService.setauthorWitBooks(this.arrayAuthor);
    // localStorage['arAuthor'] = JSON.stringify(this.arrayAuthor);
    // this.arrayAuthor.splice(this.idAuthor, 1);
    this.dataService.setauthorWitBooks(this.arrayAuthor);
    // localStorage['arAuthor'] = JSON.stringify(this.arrayAuthor);
    this.authorWitBooks.reset();
    this.addMenuAuthor = !this.addMenuAuthor;
    this.idAuthor = 0;
    this.btnMenuAuthor = true;
    this.books.removeAt(form);

  }

  exitEdit() {
    this.authorWitBooks.reset();
    this.addMenuAuthor = false;
    for (let i = 0; i < this.amount; i++) {
      this.books.removeAt(i);
    }
    this.amount = 0;
    this.btnMenuAuthor = true;
    this.saveEdit = !this.saveEdit;
  }

  sort(property: string): void {
    console.log(property);
    this.filterArrayAuthor = this.arrayAuthor.sort((a, b) =>
      getDescendantProp(a, property) > getDescendantProp(b, property) ? 1 : -1
    )
    this.arrayAuthor = this.filterArrayAuthor
  }


}

export function getDescendantProp(object: any, property: string): any {
  return property.split(".").reduce((a, b) => a[b], object);
}
