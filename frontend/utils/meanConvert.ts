export default function meanConvert(arr: string, cnt: number, len: number) {
  const means: string[] = [];
  eval(arr).forEach((mean: string, i: number) => {
    let string = `${i + 1}. ${mean}`;
    if (string.length > len) string = string.slice(0, len - 3) + "...";
    means.push(string);
  });

  return means.slice(0, cnt).join("\n");
}
