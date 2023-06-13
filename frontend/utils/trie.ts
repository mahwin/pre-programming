class TrieNode {
  value: string;
  cnt: number;
  end: string;
  child: { [key: string]: TrieNode };
  constructor(value = "") {
    this.value = value;
    this.end = "";
    this.cnt = 0;
    this.child = {};
  }
}

class Trie {
  root: TrieNode;
  words: [string, number][];
  constructor() {
    this.root = new TrieNode();
    this.words = [];
  }

  push(chars: string) {
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
    currentNode.cnt++;
    currentNode.end = chars;
  }

  sort() {
    this.words
      .sort((a, b) => {
        if (a[1] == b[1]) return a[0].length - b[0].length;
        else return b[1] - a[1];
      })
      .slice(0, 5);
  }

  autoComplete(chars: string) {
    let currentNode = this.root;
    for (let i = 0; i < chars.length; i++) {
      let currentChar = chars[i];
      if (currentNode.child[currentChar]) {
        currentNode = currentNode.child[currentChar];
      } else {
        return false;
      }
    }
    if (currentNode.end) {
      this.words.push([currentNode.end, currentNode.cnt]);
    }
    const nodes = Object.values(currentNode.child);

    while (nodes.length) {
      const node = nodes.pop();
      if (node!.end) {
        this.words.push([node!.end, node!.cnt]);
      } else {
        nodes.push(...Object.values(node!.child));
      }
    }
    return this.words.length > 5 ? this.sort() : this.words;
  }
}
