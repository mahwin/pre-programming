/**
 * 배열을 size 크기로 나누어 반환합니다.
 */
export function chunk<T>(data: T[], size: number) {
  let result = [];

  for (let i = 0; i < data.length; i += size) {
    result.push(data.slice(i, i + size));
  }

  return result;
}
