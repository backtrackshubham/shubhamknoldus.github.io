import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {getDummyData} from '../../utills/generic';
import {getObservable, unsubscribeObservable} from '../../utills/observable';

@Component({
  selector: 'app-insertionsort',
  templateUrl: './insertion-sort.component.html',
  styleUrls: ['./insertion-sort.component.css']
})
export class InsertionSortComponent implements OnInit, OnDestroy {
  insertionSortObservable: Subscription;
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

  insertionSort() {
    this.charData.finished = false;
    this.insertionSortObservable = getObservable(0, 1, this.currentIndex < this.lastIndex).subscribe(_ => {
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
        unsubscribeObservable(this.insertionSortObservable);
      }
    }, error => {
      unsubscribeObservable(this.insertionSortObservable);
    });
  }

  ngOnDestroy(): void {
    if (this.insertionSortObservable) {
      unsubscribeObservable(this.insertionSortObservable);
    }
  }
}
