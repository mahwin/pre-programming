import { pipe, reduce } from "@fxts/core";

function splitBySep(str: string, sep: string) {
  return str.split(sep);
}

function toHeadUpper(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function toHeadLower(str: string) {
  return str[0].toLowerCase() + str.slice(1);
}

export const kebabToCamel = (name: string) =>
  toHeadLower(
    pipe(
      splitBySep(name, "-"),
      reduce((a, c) => a + toHeadUpper(c))
    )
  );

export const camelToKebab = (name: string) =>
  name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

export function kebabToPascal(name: string) {
  return toHeadUpper(kebabToCamel(name));
}
