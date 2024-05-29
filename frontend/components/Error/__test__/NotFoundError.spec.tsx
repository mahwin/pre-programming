import { screen } from "@testing-library/react";
import { NotFoundError } from "../NotFoundError";
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

describe("NotFoundError", () => {
  it('"홈으로 이동"를 클릭하면 "/" 경로로 router함수가 호출된다', async () => {
    const { user } = await render(<NotFoundError />);
    await user.click(screen.getByText("홈으로 이동"));

    expect(mockRouter).toHaveBeenNthCalledWith(1, "/");
  });

  it("Not Found Error 이미지가 load된다.", async () => {
    await render(<NotFoundError />);
    const img = screen.getByAltText("에러 페이지입니다.");

    expect(img.getAttribute("src")).toEqual(
      expect.stringMatching(/^data:image\/gif;base64/)
    );
  });
});