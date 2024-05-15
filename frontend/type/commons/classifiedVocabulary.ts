import { CategoriesType, VocabularyItem } from "./vocabulary";

type OmitMeanVoca = Omit<VocabularyItem, "mean">;
type ClassifiedVocabularyItems = (OmitMeanVoca & { mean: string[] })[];

type ClassifiedVocabulary = {
  [category in CategoriesType]: {
    [level: string]: ClassifiedVocabularyItems;
  };
};

export type { ClassifiedVocabulary, ClassifiedVocabularyItems };
