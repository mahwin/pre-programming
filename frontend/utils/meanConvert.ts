import { map, join, take, pipe, range, zip } from "@fxts/core";

const applyEllipsis = (str: string, len: number) =>
  str.length > len ? str.slice(0, len - 3) + "..." : str;

const addHeadIndex = (str: string, i: number) => `${++i}. ${str}`;

const applyEllipsisAndHeadIndex = (str: string, i: number, len: number) =>
  addHeadIndex(applyEllipsis(str, len), i);

export const meanConvert = (arr: string[], cnt: number, maxLen: number) => {
  return pipe(
    zip(arr, [...range(arr.length)]),
    map(([str, index]) => applyEllipsisAndHeadIndex(str, index, maxLen)),
    take(cnt),
    join(" ")
  );
};
