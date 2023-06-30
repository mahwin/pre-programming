interface IInfo {
  frequency: number;
  category: string;
  word: string;
  level: string;
  mean: string[];
}
interface IVocaItem {
  frequency: number;
  word: string;
  mean: string;
  category?: string;
  level?: string;
}

class TrieNode {
  value: string;
  end: boolean;
  child: { [key: string]: TrieNode };
  infos: IInfo[];
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
  words: IInfo[];

  public static getInstance(): Trie {
    if (Trie.instance === null) {
      Trie.instance = new Trie();
    }
    return Trie.instance;
  }

  private constructor() {
    this.root = new TrieNode();
    this.words = [];
  }

  push(info: IVocaItem) {
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
    }

    currentNode.end = true;
  }

  sort(len: number) {
    if (this.words.length === 0) return [];

    return this.words
      .sort((a, b) => {
        if (a.frequency == b.frequency) return a.word.length - b.word.length;
        else return b.frequency - a.frequency;
      })
      .slice(0, len);
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
      if (node!.end) {
        this.words.push(...node!.infos);
      } else {
        nodes.push(...Object.values(node!.child));
      }
    }
    return this.sort(len);
  }
}

export default Trie;
