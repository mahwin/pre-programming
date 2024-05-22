import { camelToKebab, kebabToCamel, kebabToPascal } from "./stringFormatter";

describe("camelToKebab", () => {
  it("camel 형식을 kebabCase 형식으로 변환한다.", () => {
    expect(camelToKebab("abCdEf")).toBe("ab-cd-ef");
  });

  it("대문자가 없으면 그대로 리턴한다.", () => {
    expect(camelToKebab("abcdef")).toBe("abcdef");
  });
});

describe("kebabToCamel", () => {
  it("kebab 형식을 camelCase 형식으로 변환한다.", () => {
    expect(kebabToCamel("ab-cd-ef")).toBe("abCdEf");
  });

  it("-가 없으면 그대로 리턴한다.", () => {
    expect(kebabToCamel("abcdef")).toBe("abcdef");
  });
});

describe("kebabToPascal", () => {
  it("kebab 형식을 pascalCase 형식으로 변환한다.", () => {
    expect(kebabToPascal("ab-cd-ef")).toBe("AbCdEf");
  });
});
