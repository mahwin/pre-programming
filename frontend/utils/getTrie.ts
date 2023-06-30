import Trie from "./trie";

interface IInfo {
  frequency: string;
  word: string;
  mean: string;
  category?: string;
  level?: string;
}

interface IVoca {
  [key: string]: {
    [key: string]: {
      level: {
        [key: string]: IInfo[];
      };
    };
  };
}

export default function getTrie(data: IVoca) {
  const trie = Trie.getInstance();

  for (const key of Object.keys(data.category)) {
    for (const level of Object.keys(data.category[key].level)) {
      const infos = data.category[key].level[level];
      for (const info of infos) {
        const copy = { ...info };
        copy.category = key;
        copy.level = level;
        console.log(copy);
        trie.add(copy);
      }
    }
  }

  return trie;
}
