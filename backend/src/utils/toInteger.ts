export function toInteger(num: number | string) {
  const parsedNum = parseInt(String(num), 10);
  return isNaN(parsedNum) ? -1 : parsedNum;
}
