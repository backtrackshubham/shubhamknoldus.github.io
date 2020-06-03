import {Component, OnDestroy, OnInit} from '@angular/core';
import {arrayToMatrix, getDummyData} from '../../utills/generic';
import {Cell, PathFinderResult} from '../../models/models';
import {Subscription} from 'rxjs';
import {getObservable, unsubscribeObservable} from '../../utills/observable';

@Component({
  selector: 'app-union-find',
  templateUrl: './union-find.component.html',
  styleUrls: ['./union-find.component.css']
})
export class UnionFindComponent implements OnInit, OnDestroy {

  gridSize = 10;
  nums: Cell<number>[][];
  answer: PathFinderResult;
  dp: number[][] = [];
  path = '';
  pathCompSub: Subscription;
  isFinished = false;

  // dp: Map<string, number> = new Map<string, number>();

  constructor() {
  }

  ngOnInit() {
    this.nums = arrayToMatrix(getDummyData(this.gridSize * this.gridSize, 10), this.gridSize);
  }

  updateGrid() {
    const nd = getDummyData(this.gridSize * this.gridSize, 10);
    this.nums = arrayToMatrix(nd, this.gridSize);
    this.answer = undefined;
    this.dp = [];
    this.path = '';
  }

  startVisualization() {
    this.isFinished = true;
    // this.answer = this.findMinPath(this.nums, 0, 0, 0, '');
    const res = this.processDp();
    const m = this.dp.length;
    const n = this.dp[0].length;
    let i = 0;
    let j = 0;
    this.pathCompSub = getObservable(1000, 100, i !== m && j !== n)
      .subscribe(_ => {
        if (i < m - 1 && j < n - 1) {
          if (this.dp[i][j + 1] < this.dp[i + 1][j]) {
            this.nums[i][j].showRightArrow = true;
            this.nums[i][j].backgroundColour.color = 'green';
            this.nums[i][j].backgroundColour.background = 'aqua';
            this.path += `${this.nums[i][j].value}-->`;
            j += 1;
          } else {
            this.nums[i][j].showDownArrow = true;
            this.nums[i][j].backgroundColour.color = 'green';
            this.nums[i][j].backgroundColour.background = 'aqua';
            this.path += `${this.nums[i][j].value}-->`;
            i += 1;
          }
        } else {
          if (i < m - 1) {
            this.nums[i][j].showDownArrow = true;
            this.nums[i][j].backgroundColour.color = 'green';
            this.nums[i][j].backgroundColour.background = 'aqua';
            this.path += `${this.nums[i][j].value}-->`;
            i += 1;
          } else if (j < n - 1) {
            this.nums[i][j].showRightArrow = true;
            this.nums[i][j].backgroundColour.color = 'green';
            this.nums[i][j].backgroundColour.background = 'aqua';
            this.path += `${this.nums[i][j].value}-->`;
            j += 1;
          } else {
            i = m;
            j = n;
            this.nums[m - 1][n - 1].backgroundColour.color = 'white';
            this.nums[m - 1][n - 1].backgroundColour.background = 'green';
            unsubscribeObservable(this.pathCompSub);
            this.isFinished = false;
          }
        }
      }, error => {
        unsubscribeObservable(this.pathCompSub);
      });

    this.answer = {cost: res, col: 0, row: 5, minWeightPath: ''};
  }

  processDp() {

    this.dp = [];
    const m = this.nums.length;
    const n = this.nums[0].length;

    // const dp: number[][] = [];
    for (let i = 0; i < m; i++) {
      const dum = Array.from(Array(n)).map(_ => 0);
      this.dp.push(dum);
    }

    this.dp[0][0] = this.nums[0][0].value;

    // initialize top row
    for (let i = 1; i < n; i++) {
      this.dp[0][i] = this.dp[0][i - 1] + this.nums[0][i].value;
    }

    // initialize left column
    for (let j = 1; j < m; j++) {
      this.dp[j][0] = this.dp[j - 1][0] + this.nums[j][0].value;
    }

    // fill up the dp table
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (this.dp[i - 1][j] > this.dp[i][j - 1]) {
          this.dp[i][j] = this.dp[i][j - 1] + this.nums[i][j].value;
        } else {
          this.dp[i][j] = this.dp[i - 1][j] + this.nums[i][j].value;
        }
      }
    }

    return this.dp[m - 1][n - 1];
  }

  private moves(i: number, j: number): { row, column }[] {
    const moves = [
      [i + 1, j],
      [i, j + 1],
    ];
    return moves
      .filter(value => value[0] > -1 && value[0] < this.gridSize && value[1] > -1 && value[1] < this.gridSize)
      .map(re => {
        return {row: re[0], column: re[1]};
      });
  }

  ngOnDestroy(): void {
    if (this.pathCompSub) {
      unsubscribeObservable(this.pathCompSub);
    }
  }
}
