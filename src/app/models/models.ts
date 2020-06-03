export interface Cell<T> {
  row: number;
  col: number;
  value: T;
  backgroundColour: CellColour;
  showRightArrow: boolean;
  showDownArrow: boolean;
}

export interface CellColour {
  color: string;
  background?: string;
}

export interface PathFinderResult {
  cost: number;
  minWeightPath: string;
  row: number;
  col: number;
}
