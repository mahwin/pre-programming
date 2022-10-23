function uniqueArr(arr1: string, arr2: string): string {
  const array1 = JSON.parse(arr1);
  const array2 = JSON.parse(arr2);
  const sortArr = array1.concat(array2).sort();
  const unique = Array.from(new Set(sortArr));
  return JSON.stringify(unique);
}

export default uniqueArr;
