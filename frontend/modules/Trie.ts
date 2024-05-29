import { VocabularyItem } from "@type/commons/vocabulary";
import { map, pipe, toArray } from "@fxts/core";

class TrieNode {
  children: Record<string, TrieNode>;
  items: Array<VocabularyItem>;
  constructor() {
    this.children = {};
    this.items = [];
  }
}

export class Trie {
  private static instance: Trie | null = null;
  root: TrieNode;
  maxSavedItems: number;
  constructor(maxSavedItems = Infinity, datas: VocabularyItem[]) {
    this.root = new TrieNode();
    this.maxSavedItems = maxSavedItems;
    this.init(datas);
  }

  static getInstance(maxSavedItems = Infinity, datas: VocabularyItem[]) {
    return Trie.instance
      ? Trie.instance
      : (Trie.instance = new Trie(maxSavedItems, datas));
  }

  private init(datas: VocabularyItem[]) {
    pipe(
      datas,
      map((data) => this.fillTrie(data)),
      toArray
    );
  }

  private fillTrie(info: VocabularyItem) {
    let node = this.root;

    for (const char of info.word) {
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
