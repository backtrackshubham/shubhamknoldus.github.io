export function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const getDummyData = (elements: number) => Array.from(Array(elements).keys()).map(_ => getRndInteger(0, 10000));
