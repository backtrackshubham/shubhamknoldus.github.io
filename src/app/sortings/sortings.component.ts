import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sortings',
  templateUrl: './sortings.component.html',
  styleUrls: ['./sortings.component.css']
})
export class SortingsComponent implements OnInit {


  sortings = ['bubble', 'insertion', 'quickSort'];

  charData = {};


  numElements = 100;
  comparision = 0;

  someDumData = Array.from(Array(this.numElements).keys()).map(value => this.getRndInteger(0, 10000));

  show = true;

  getRndInteger(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  sort() {
    this.updateAll();

    this.charData['bubble'].finished = false;
    this.charData['insertion'].finished = false;
    this.sortings.forEach(key => {
      if (key === 'bubble') {
        setTimeout(() => {
          this.bubbleSort();
        }, 0)
      } else if (key === 'insertion') {
        setTimeout(() => {
          this.insertionSort();
        }, 0)
      } else if (key === 'quickSort') {
        setTimeout(() => {
          this.quickSort();
        }, 0)
      }
    })
  }


  updateAll() {
    if (this.numElements < 100 || this.numElements > 5001) {

      this.numElements = 100
    }
    this.someDumData = Array.from(Array(this.numElements).keys()).map(() => this.getRndInteger(0, 200000));


    this.sortings.forEach(key => {
      console.log(key);
      this.charData[key] = {
        comparisons: 0,
        sortingName: key,
        dataSet: [{
          data: JSON.parse(JSON.stringify(this.someDumData)),
          label: `${key}`
        }],
        labels: this.someDumData.map(() => " "),
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
      }
    });
  }

  insertionSort() {
    let newDta = this.charData['insertion'].dataSet[0].data;
    let j;
    for (let i = 0; i < newDta.length; i++) {
      setTimeout(() => {
        let j = i;
        while (j > 0) {
          this.charData['insertion'].comparisons += 1;
          if (newDta[j] < newDta[j - 1]) {
            let t = newDta[j - 1];
            newDta[j - 1] = newDta[j];
            newDta[j] = t;
          }
          j -= 1;
        }
        if (i == newDta.length - 1) {
          this.charData['insertion'].finished = true;
        }
        this.charData['insertion'].dataSet = [
          {data: newDta, label: newDta.sortingName}
        ];
      // }, i * Math.ceil(this.numElements / 10))
      }, 10)
    }
  }

  bubbleSort() {
    let newDta = this.charData['bubble'].dataSet[0].data;
    let j;
    for (let i = 0; i < newDta.length; i++) {
      setTimeout(() => {
        for (j = 0; j < newDta.length; j++) {
          this.charData['bubble'].comparisons += 1;
          if (newDta[j] > newDta[i]) {
            let t = newDta[i];
            newDta[i] = newDta[j];
            newDta[j] = t;
          }
        }
        if (i == newDta.length - 1 && j == newDta.length) {
          this.charData['bubble'].finished = true;
        }
        this.charData['bubble'].dataSet = [
          {data: newDta, label: newDta.sortingName}
        ];
      }, 10)
    }
  }

  quickSort() {
    let newDta = this.charData['quickSort'].dataSet[0].data.slice(0, 99);
    console.log(newDta.filter(value => value === 0).length)
    this.quick_sort_helper(0, newDta.length - 1, newDta);
    console.log(newDta.filter(value => value === 0).length)
    console.log(newDta)
    this.charData['quickSort'].labels = this.someDumData.map(() => " ").slice(0,99);
    this.charData['quickSort'].dataSet = [{data : newDta , label : "insertionSort"}];
  }


  quick_sort_helper(l: number, h: number, lis: number[]) {

    if (l < h) {
      let j = this.partition(l, h, lis);
      this.quick_sort_helper(l, j, lis);
      this.quick_sort_helper(j + 1, h, lis)
    }
  }

  partition(l: number, h: number, lis: number[]) {
    let pivot = lis[l];
    let i = l;
    let j = h;
    while (i < j) {
      while (lis[i] <= pivot) {
        i += 1
      }
      while (lis[j] > pivot) {
        j -= 1
      }
      if (i < j) {
        let t = lis[i];
        lis[i] = lis[j]
        lis[j] = t
      }
    }

    let t = lis[l];
    lis[l] = lis[j]
    lis[j] = t
    return j

  }

  constructor() {
  }


  ngOnInit() {
    this.updateAll();
  }

}
