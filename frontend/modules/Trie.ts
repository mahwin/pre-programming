import { Voca } from "@type/commons/voca";

class TrieNode {
  children: Record<string, TrieNode>;
  items: Array<Voca>;
  constructor() {
    this.children = {};
    this.items = [];
  }
}

export class Trie {
  private static instance: Trie | null = null;
  root: TrieNode;
  maxSavedItems: number;
  constructor(maxSavedItems = Infinity, datas: Voca[]) {
    this.root = new TrieNode();
    this.maxSavedItems = maxSavedItems;
    this.fillTrie(datas);
  }

  static getInstance(maxSavedItems = Infinity, datas: Voca[]) {
    if (!Trie.instance) {
      Trie.instance = new Trie(maxSavedItems, datas);
    }
    return Trie.instance;
  }

  private fillTrie(datas: Voca[]) {
    for (const data of datas) {
      this.insert(data, data.word);
    }
  }

  private insert(info: Voca, strings: string) {
    let node = this.root;

    for (const char of strings) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
      if (node.items.length < this.maxSavedItems) {
        node.items.push(info);
      }
    }
  }

  search(subString: string) {
    let node = this.root;
    for (const char of subString) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return node.items;
  }
}

export default Trie;
