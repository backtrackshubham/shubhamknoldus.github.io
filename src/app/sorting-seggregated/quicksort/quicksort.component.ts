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
    sortingName: 'Bubble',
    dataSet: [{
      data: JSON.parse(JSON.stringify(this.dataToSort)),
      label: `Bubble`
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

  quickSort() {
    this.charData.finished = false;
    this.quickSortObservable = getObservable(0, 1, this.currentIndex < this.lastIndex).subscribe(_ => {
      const newDta = this.charData.dataSet[0].data;
      let j = this.currentIndex;
      while (j > 0) {
        this.charData.comparisons += 1;
        if (newDta[j] < newDta[j - 1]) {
          const t = newDta[j - 1];
          newDta[j - 1] = newDta[j];
          newDta[j] = t;
        }
        j -= 1;
      }
      this.charData.dataSet = [
        {data: newDta, label: 'Insertion'}
      ];
      this.currentIndex++;
      if (this.currentIndex >= this.lastIndex) {
        this.charData.finished = true;
        this.currentIndex = 0;
        unsubscribeObservable(this.quickSortObservable);
      }
    }, error => {
      unsubscribeObservable(this.quickSortObservable);
    });
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
      setTimeout(() => subscriber.next(i), 500);
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
