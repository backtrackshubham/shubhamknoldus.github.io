import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {getDummyData} from '../../utills/generic';
import {getObservable, unsubscribeObservable} from '../../utills/observable';

@Component({
  selector: 'app-quicksort',
  templateUrl: './quicksort.component.html',
  styleUrls: ['./quicksort.component.css']
})
export class QuicksortComponent implements OnInit {
  quickSortObservable: Subscription;
  numElements = 100;
  dataToSort = getDummyData(this.numElements, 10000);
  currentIndex = 0;
  lastIndex = this.dataToSort.length;
  charData = {
    comparisons: 0,
    sortingName: 'Quick',
    dataSet: [{
      data: JSON.parse(JSON.stringify(this.dataToSort)),
      label: `Quick`
    }],
    labels: this.dataToSort.map(() => ' '),
    options: {
      animation: {
        duration: 0
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      responsive: true,
    },
    plugins: [],
    legend: true,
    chartType: 'bar',
    finished: true
  };

  constructor() {
  }

  ngOnInit() {
  }

  updateRandomData() {
    const data = getDummyData(this.numElements, 10000);
    this.charData.dataSet[0].data = data;
    this.charData.labels = data.map(_ => ' ');
    this.lastIndex = data.length;
    this.charData.comparisons = 0;
  }

  quick() {
    this.quickSortNew(this.charData.dataSet[0].data, 0, this.lastIndex - 1);
  }

  partition(items: number[], left: number, right: number): Observable<number> {
    const pivot = items[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        const tem = items[i];
        items[i] = items[j];
        items[j] = tem;
        i++;
        j--;
        this.charData.comparisons++;
        this.charData.dataSet = [
          {data: items, label: 'Quick'}
        ];
      }
    }
    return new Observable(subscriber => {
      setTimeout(() => subscriber.next(i), 2);
    });
  }

  quickSortNew(items: number[], left: number, right: number) {
    if (items.length > 1) {
      this.partition(items, left, right).subscribe(value => {
        if (left < value - 1) {
          this.quickSortNew(items, left, value - 1);
        }
        if (value < right) {
          this.quickSortNew(items, value, right);
        }
      });
    }
  }
}
