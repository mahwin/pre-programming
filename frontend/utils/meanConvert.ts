export function meanConvert(arr: string[], cnt: number, maxLen: number) {
  return arr
    .slice(0, cnt)
    .map(
      (mean: string, i: number) =>
        `${i + 1}. ${mean.length > maxLen ? mean.slice(0, maxLen - 3) + "..." : mean}`
    )
    .join(" ");
}
