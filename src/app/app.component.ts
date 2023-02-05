import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'book-store';

  constructor(private router: Router) {
  }

  getAuthor() {
    this.router.navigateByUrl('author');
  }

  getGenres() {
    this.router.navigateByUrl('genres');
  }

  ngOnInit(): void {

  }
}
