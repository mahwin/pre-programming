import { getByAltText, screen } from "@testing-library/react";
import { Error } from "../Error";
import render from "@utils/test/render";

const mockRouter = jest.fn();

jest.mock("next/router", () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: mockRouter,
    }),
  };
});

describe("Error", () => {
  it('"홈으로 이동"를 클릭하면 "/" 경로로 router함수가 호출된다', async () => {
    const { user } = await render(<Error />);
    await user.click(screen.getByText("홈으로 이동"));

    expect(mockRouter).toHaveBeenNthCalledWith(1, "/");
  });

  it("Error 이미지가 load된다.", async () => {
    await render(<Error />);
    const img = screen.getByAltText("에러 페이지입니다.");

    expect(img.getAttribute("src")).toEqual(
      expect.stringMatching(/^data:image\/gif;base64/)
    );
  });
});
