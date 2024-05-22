import { meanConvert } from "./meanConvert";

const lengthTen = "1234567890";

const addStringTenLength = (str1: string) => lengthTen + str1;

describe("meanConvert 스트링 배열의 요소 중 일부로 뽑아 전처리한 후에 스트링으로 반환하는 함수", () => {
  it("요소의 길이가 maxLen 이상이면 ...을 붙인 maxLen 만큼의 스트링을 리턴한다.", () => {
    expect(meanConvert([addStringTenLength("abcav")], 1, 10)).toBe(
      "1. 1234567..."
    );
  });

  it("요소의 길이가 maxLen 이하이면 그대로 나온다.", () => {
    expect(meanConvert(["123456"], 1, 10)).toBe("1. 123456");
  });

  it("입력 배열의 길이보다 큰 값을 뽑도록 입력해도 입력 배열 길이만큼 조절된다", () => {
    expect(meanConvert([addStringTenLength("abcav")], 1, 10)).toBe(
      "1. 1234567..."
    );
  });

  it("입력 배열의 길이보다 작은 값을 뽑도록 입력하면 입력한 값만큼 뽑아나온다.", () => {
    expect(
      meanConvert(
        [
          addStringTenLength("abcav"),
          addStringTenLength("abcav"),
          addStringTenLength("abcav"),
        ],
        1,
        10
      )
    ).toBe("1. 1234567...");
  });

  it("최종 결과본은 사이 간격이 공백인 join 형태이다", () => {
    expect(
      meanConvert(
        [
          addStringTenLength("abcav"),
          addStringTenLength("abcav"),
          addStringTenLength("abcav"),
        ],
        2,
        10
      )
    ).toBe("1. 1234567... 2. 1234567...");
  });
});
