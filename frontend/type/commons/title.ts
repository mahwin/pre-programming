type devType = "web";
type titlesType =
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

const titles = [
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

type titleItemType = {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
};

type titleObjType = {
  [key in devType]: titleItemType[];
};

interface ITitles {
  data: titleObjType;
}

export type { titleObjType, titleItemType, ITitles, titlesType, devType };
export { titles };
