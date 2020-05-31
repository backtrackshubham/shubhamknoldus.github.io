import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BubbleSortComponent} from './sorting-seggregated/bubblesort/bubble-sort.component';
import {InsertionSortComponent} from './sorting-seggregated/insertionsort/insertion-sort.component';
import {QuicksortComponent} from './sorting-seggregated/quicksort/quicksort.component';
import {UnionFindComponent} from './path-algos/union-find/union-find.component';


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
  }, {
    path: 'min-path-finder',
    component: UnionFindComponent
  }
  // ]
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
