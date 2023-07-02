type categoriesType =
  | "next"
  | "react"
  | "reactHookForm"
  | "reactQuery"
  | "reactRedux"
  | "reactRouter"
  | "recoil"
  | "styledComponents"
  | "tailwindcss"
  | "axios";

const categories = [
  "next",
  "react",
  "reactHookForm",
  "reactQuery",
  "reactRedux",
  "reactRouter",
  "recoil",
  "styledComponents",
  "tailwindcss",
  "axios",
];

type devCategoryType = "web";

type titleItemType = {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
};

interface ITitle {
  [key: string]: titleItemType[];
}

interface ITitles {
  data: ITitle;
}

export type { categoriesType, devCategoryType, titleItemType, ITitle, ITitles };
export { categories };
