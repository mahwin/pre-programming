import { IVoca, IVocas } from "@type/commons/voca";

class TrieNode {
  value: string;
  end: boolean;
  child: { [key: string]: TrieNode };
  infos: IVoca[];

  constructor(value = "") {
    this.value = value;
    this.end = false;
    this.child = {};
    this.infos = [];
  }
}

class Trie {
  private static instance: Trie | null = null;
  root: TrieNode;
  words: IVoca[];

  public static getInstance(data: IVocas): Trie {
    if (Trie.instance === null) {
      Trie.instance = new Trie();
      Trie.instance.fillTrie(data);
    }
    return Trie.instance;
  }

  private constructor() {
    this.root = new TrieNode();
    this.words = [];
  }

  add(info: IVoca) {
    const chars = info.word;
    let currentNode = this.root;
    for (let i = 0; i < chars.length; i++) {
      const currentChar = chars[i];

      if (currentNode.child[currentChar] === undefined) {
        currentNode.child[currentChar] = new TrieNode(
          currentNode.value + currentChar
        );
      }
      currentNode = currentNode.child[currentChar];
      currentNode.infos.push(info);
    }
    currentNode.end = true;
  }

  fillTrie(data: IVocas) {
    for (const key of Object.keys(data.category)) {
      for (const level of Object.keys(data.category[key].level)) {
        const infos = data.category[key].level[level];
        for (const info of infos) {
          const copy = { ...info };
          copy.category = key;
          copy.level = level;
          Trie.instance!.add(copy);
        }
      }
    }
  }

  sort(len: number) {
    if (this.words.length === 0) return [];
    return this.words
      .sort((a, b) => (a.word > b.word ? 1 : -1))
      .slice(0, len)
      .sort((a, b) => a.word.length - b.word.length);
  }

  autoComplete(chars: string, len: number) {
    if (chars === "") return [];
    this.words = [];
    let currentNode = this.root;

    for (let i = 0; i < chars.length; i++) {
      let currentChar = chars[i];
      if (currentNode.child[currentChar]) {
        currentNode = currentNode.child[currentChar];
      } else {
        return [];
      }
    }

    if (currentNode.end) {
      this.words.push(...currentNode.infos);
    }
    const nodes = Object.values(currentNode.child);

    while (nodes.length) {
      const node = nodes.pop();
      if (node) {
        if (node.end) {
          this.words.push(...node!.infos);
        } else nodes.push(...Object.values(node!.child));
      }
    }
    console.log("??");
    return this.sort(len);
  }
}

export default Trie;
