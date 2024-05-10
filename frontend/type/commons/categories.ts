const CATEGORIES = [
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
] as const;

type CategoriesType = (typeof CATEGORIES)[number];

type CategoryItem = {
  category: string;
  available: boolean;
  amount: number;
  install: string;
};

type CategoryItems = CategoryItem[];

export type { CategoryItems, CategoryItem, CategoriesType };
export { CATEGORIES };
