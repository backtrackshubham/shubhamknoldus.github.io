export interface Cell<T> {
  row: number;
  col: number;
  value: T;
  backgroundColour: CellColour;
}

export interface CellColour {
  color: string;
}

export interface PathFinderResult {
  cost: number;
  minWeightPath: string;
}
