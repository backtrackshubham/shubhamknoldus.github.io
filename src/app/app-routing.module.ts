import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BubbleSortComponent} from './sorting-seggregated/bubblesort/bubble-sort.component';
import {InsertionSortComponent} from './sorting-seggregated/insertionsort/insertion-sort.component';
import {QuicksortComponent} from './sorting-seggregated/quicksort/quicksort.component';


const appRoutes: Routes = [
  // children: [
  {
    path: 'bubble',
    component: BubbleSortComponent
  }, {
    path: 'insertion',
    component: InsertionSortComponent
  }, {
    path: 'quick',
    component: QuicksortComponent
  }
  // ]
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
