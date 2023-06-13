class TrieNode {
  value: string;
  cnt: number;
  end: boolean | string;
  child: { [key: string]: TrieNode };
  constructor(value = "") {
    this.value = value;
    this.end = false;
    this.cnt = 0;
    this.child = {};
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  autoComplete(chars: string) {
    let currentNode = this.root;
    let result = [];
    for (let i = 0; i < chars.length; i++) {
      let currentChar = chars[i];
      if (currentNode.child[currentChar]) {
        currentNode = currentNode.child[currentChar];
      } else {
        return false;
      }
    }
    if (currentNode.end) {
      result.push(currentNode.end);
    }
    const nodes = Object.values(currentNode.child);

    while (nodes.length) {
      const node = nodes.pop();
      if (node!.end) {
        result.push(node!.end);
      } else {
        nodes.push(...Object.values(node!.child));
      }
    }
    return result;
  }
}
