import { CategoriesType, VocabularyItems } from "./vocabulary";

type ClassifiedVocabulary = {
  [category in CategoriesType]: {
    [level: string]: VocabularyItems;
  };
};

export type { ClassifiedVocabulary };
