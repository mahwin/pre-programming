function getNumber() {
  return Math.floor(10 * Math.random());
}

export function getRandomNumber(numberLength: number) {
  let result = '';
  for (let i = 0; i < numberLength; i++) {
    result += getNumber();
  }
  return result;
}
