import { Header } from "../Header";
import { screen } from "@testing-library/react";
import render from "@utils/test/render";
import { pageRoutes } from "apiRouters";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "/",
    reload: jest.fn(),
  }),
}));

describe("유저 정보가 없을 경우", () => {
  it('메인 페이지로 이동할 수 있는 "pre-programming" 버튼이 있다.', async () => {
    await render(<Header />);
    const btn = screen.getByText("pre-programming");
    expect(btn).toBeInTheDocument();
  });

  it('로그인 페이지로 이동할 수 있는 "로그인" 버튼이 있다.', async () => {
    await render(<Header />);
    const btn = screen.getByText("pre-programming");
    expect(btn).toBeInTheDocument();
  });

  it(`"로그인" 버튼은 singIn 페이지로 연결되어 있다.`, async () => {
    await render(<Header />);
    const a = screen.getByText("로그인");
    console.log(a);
  });

  it("내정보 페이지로 이동할 수 있는 버튼이 없다.");

  it("로그아웃 버튼이 없다.");
});

describe("유저 정보가 있을 경우", () => {
  it("메인 페이지로 이동할 수 있는 버튼이 있다.");

  it("내정보 페이지로 이동할 수 있는 버튼이 있다.");

  it("로그인 페이지로 이동할 수 있는 버튼이 없다.");

  it("로그아웃 버튼이 없다.");
});
