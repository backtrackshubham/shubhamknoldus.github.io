import {Component, OnDestroy, OnInit} from '@angular/core';
import {getDummyData} from '../../utills/generic';
import {getObservable, unsubscribeObservable} from '../../utills/observable';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-bubblesort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})
export class BubbleSortComponent implements OnInit, OnDestroy {
  bubbleSortObservable: Subscription;
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

  bubbleSort() {
    this.charData.finished = false;
    this.bubbleSortObservable = getObservable(0, 1, this.currentIndex < this.lastIndex).subscribe(_ => {
      const newDta = this.charData.dataSet[0].data;
      for (let j = 0; j < newDta.length; j++) {
        this.charData.comparisons += 1;
        if (newDta[j] > newDta[this.currentIndex]) {
          const t = newDta[this.currentIndex];
          newDta[this.currentIndex] = newDta[j];
          newDta[j] = t;
        }
      }
      this.charData.dataSet = [
        {data: newDta, label: 'Bubble'}
      ];
      this.currentIndex++;
      if (this.currentIndex >= this.lastIndex) {
        this.charData.finished = true;
        this.currentIndex = 0;
        unsubscribeObservable(this.bubbleSortObservable);
      }
    }, error => {
      unsubscribeObservable(this.bubbleSortObservable);
    });
  }

  ngOnDestroy(): void {
    if (this.bubbleSortObservable) { unsubscribeObservable(this.bubbleSortObservable); }
  }
}
