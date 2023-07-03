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

type devCategoryType = "web" | string;

type titleItemType = {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
};

type titlesType = {
  [key: string]: titleItemType[];
};

interface ITitles {
  data: titlesType;
}

export type {
  categoriesType,
  devCategoryType,
  titleItemType,
  ITitles,
  titlesType,
};
export { categories };
