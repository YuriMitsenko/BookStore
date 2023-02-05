import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { GenresComponent } from './genres/genres.component';

const routes: Routes = [
  {path:"", component: AuthorComponent, pathMatch:"full"},
  {path:"author", component: AuthorComponent},
  {path:"genres", component: GenresComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
