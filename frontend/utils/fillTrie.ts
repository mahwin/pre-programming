import Trie from "./trie.js";

interface IVocaItem {
  frequency: number;
  word: string;
  mean: string;
  category?: string;
  level?: string;
}

interface IVoca {
  category: {
    [key: string]: {
      level: {
        [key: string]: IVocaItem[];
      };
    };
  };
}

export default function makeTrie(data: IVoca) {
  const trie = Trie.getInstance();
  for (const key of Object.keys(data.category)) {
    for (const level of Object.keys(data.category[key].level)) {
      const infos = data.category[key].level[level];
      for (const info of infos) {
        info.category = key;
        info.level = level;
        trie.push(info);
      }
    }
  }
  return trie;
}
