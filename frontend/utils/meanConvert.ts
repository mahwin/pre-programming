const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

export function meanConvert(
  arr: string,
  cnt: number = MAX_SAFE_INTEGER,
  maxLen: number = MAX_SAFE_INTEGER
) {
  const means: string[] = [];

  eval(arr).forEach((mean: string, i: number) => {
    let string = `${i + 1}. ${mean}`;
    if (string.length > maxLen) string = string.slice(0, maxLen - 3) + "...";
    means.push(string);
  });

  return means.slice(0, cnt).join(" ");
}
