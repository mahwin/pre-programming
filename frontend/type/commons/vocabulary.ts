import { AxiosError } from "axios";

type CategoriesType =
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

interface VocabularyItem {
  frequency: string;
  word: string;
  mean: string[];
  category: CategoriesType;
  level: string;
}

type VocabularyItems = VocabularyItem[];

type LevelledVocabulary = {
  [level: string]: VocabularyItems;
};

type CategorizedVocabulary = {
  [category in CategoriesType]?: LevelledVocabulary;
};

export { categories };

export type {
  CategoriesType,
  VocabularyItems,
  VocabularyItem,
  CategorizedVocabulary,
  LevelledVocabulary,
};
