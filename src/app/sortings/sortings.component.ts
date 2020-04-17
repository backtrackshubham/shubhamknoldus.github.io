import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";

@Component({
  selector: 'app-sortings',
  templateUrl: './sortings.component.html',
  styleUrls: ['./sortings.component.css']
})
export class SortingsComponent implements OnInit {



  numElements = 1000;
  comparision = 0;

  public barChartOptions2: ChartOptions = {
    animation:{
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
  };

  someDumData = Array.from(Array(this.numElements).keys()).map(value => this.getRndInteger(0, 10000))
  public barChartLabels2: Label[] = this.someDumData.map(value => " ");
  // public barChartLabels2: Label[] = ['65', '59', '80', '81', '56', '55', '40'];
  public barChartType2: ChartType = 'bar';
  public barChartLegend2 = true;
  public barChartPlugins2 = [];

  // barChartData2: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series B' }
  // ];

  show = true;

  barChartData2: ChartDataSets[] = [
    { data: this.someDumData.map(value => this.getRndInteger(0, 10000)), label: 'Series B' }
  ];

  getRndInteger(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  updateAll(){
    if(this.numElements < 100 || this.numElements > 5001){

      this.numElements = 100
    }
    this.someDumData = Array.from(Array(this.numElements).keys()).map(value => this.getRndInteger(0, 10000))

    this.barChartData2 = [    { data: this.someDumData.map(value => this.getRndInteger(0, 10000)), label: 'Series B' }
    ];

    this.barChartLabels2 = this.someDumData.map(value => " ");

  }

  bubbleSort(){
    this.updateAll();
    this.show = false;
    this.comparision = 0;
    let newDta = this.barChartData2[0].data;
    let j;
    for (let i = 0; i < newDta.length; i++){
      setTimeout(() => {
        for (j = 0; j < newDta.length; j++) {
          this.comparision += 1;
          if(newDta[j] > newDta[i]){
            let t = newDta[i];
            newDta[i] = newDta[j];
            newDta[j] = t;
          }
        }
        if(i == newDta.length - 1 && j == newDta.length){
          this.show = true;
        }
        this.barChartData2 =  [
          { data: newDta, label: 'Series B' }
        ];
      }, i * Math.abs(this.numElements / 10))
    }
  }

  dummyData = [65, 59, 80, 81, 56, 55, 40];

  sortings = ["insertion", "bubble"];

  charData = {};

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  barChartLegends = true;
  barChartType = 'bar';


  constructor() { }



  ngOnInit() {
    this.sortings.forEach(key => {
      this.charData[key] = {
        labels : this.barChartLabels2,
        data : [{
          data : [65, 59, 80, 81, 56, 55, 40],
          label: `${key} Sort`,
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: '#04aefb',
          hoverBackgroundColor: '#05aefbb8'
        }],
      }
    });

    console.log(this.charData);

  }

}
