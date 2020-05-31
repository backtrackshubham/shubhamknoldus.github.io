import {Cell} from '../models/models';

export function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getDummyData = (elements: number, range: number) => Array.from(Array(elements).keys()).map(_ => getRndInteger(0, range));

export function arrayToMatrix(num: number[], gridSize: number): Cell<number>[][] {
  const toRet: Cell<number>[][] = [];
  let r = 0;
  for (let i = 0; i < num.length; i += gridSize) {
    const a = [];
    for (let j = 0; j < gridSize; j++) {
      a.push({row : r, col : j, value : num[j + i], backgroundColour : {color : 'red'}, showDownArrow: false, showRightArrow: false});
    }
    toRet.push(a);
    r++;
  }
  return toRet;
}
