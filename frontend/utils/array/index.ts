export function ObjectKeys<T extends Object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}
