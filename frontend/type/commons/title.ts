type DevType = "web";
type TitlesType =
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

const TITLES = [
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

type TitleItem = {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
};

type TitleItems = TitleItem[];

type TitleInfo = Record<string, TitleItem[]>;

export type { TitleItems, TitleItem, DevType, TitlesType, TitleInfo };
export { TITLES };
