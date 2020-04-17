import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {SortingsComponent} from "./sortings/sortings.component";


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'sortings', component: SortingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
