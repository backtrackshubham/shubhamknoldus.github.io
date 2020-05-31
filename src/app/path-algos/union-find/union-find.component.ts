import {Component, OnInit} from '@angular/core';
import {arrayToMatrix, getDummyData} from '../../utills/generic';
import {Cell, PathFinderResult} from '../../models/models';

@Component({
  selector: 'app-union-find',
  templateUrl: './union-find.component.html',
  styleUrls: ['./union-find.component.css']
})
export class UnionFindComponent implements OnInit {

  gridSize = 10;
  nums: Cell<number>[][];
  answer: PathFinderResult;
  dp: Map<string, number> = new Map<string, number>();
  constructor() { }

  ngOnInit() {
    this.nums = arrayToMatrix(getDummyData(this.gridSize * this.gridSize, 10), this.gridSize);
  }

  updateGrid() {
    const nd = getDummyData(this.gridSize * this.gridSize, 10);
    this.nums = arrayToMatrix(nd, this.gridSize);
    this.answer = undefined;
  }

  startVisualization() {
    this.answer = this.findMinPath(this.nums, 0, 0, 0, '');
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

  private findMinPath(mat: Cell<number>[][], row: number, col: number, weight: number, path: string): PathFinderResult {
    const currentCell = mat[row][col];
    currentCell.backgroundColour = {color : 'red'};
    if (row === this.gridSize - 1 && col === this.gridSize - 1) {
      return {cost : weight + currentCell.value, minWeightPath : path};
    } else {
      const getMoves = this.moves(row, col);
      console.log(getMoves);
      return  getMoves
        .map(value => {
          return this.findMinPath(mat,
            value.row,
            value.column,
            weight + currentCell.value,
            `${path} --> [Cell ${value.row}, ${value.row}]`);
        })
        .reduce(((previousValue, currentValue) => previousValue.cost < currentValue.cost ? previousValue : currentValue));
    }
  }

}
