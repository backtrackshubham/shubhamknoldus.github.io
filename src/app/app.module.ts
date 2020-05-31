import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {InsertionSortComponent} from './sorting-seggregated/insertionsort/insertion-sort.component';
import {BubbleSortComponent} from './sorting-seggregated/bubblesort/bubble-sort.component';
import {QuicksortComponent} from './sorting-seggregated/quicksort/quicksort.component';
import { UnionFindComponent } from './path-algos/union-find/union-find.component';

@NgModule({
  declarations: [
    AppComponent,
    InsertionSortComponent,
    BubbleSortComponent,
    QuicksortComponent,
    UnionFindComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
