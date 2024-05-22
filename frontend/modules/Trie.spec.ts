import { Trie } from "./Trie";
import { VocabularyItem } from "@type/commons/vocabulary";
import { range, pipe, map, toArray } from "@fxts/core";

const createVocabularyItem = (word: string): VocabularyItem => ({
  word,
  mean: ["사과"],
  frequency: "1",
  level: "1",
  category: "react",
});

describe("Trie", () => {
  let vocabularyItems: VocabularyItem[];

  it("getInstance 메서드는 싱글톤으로 동작해야한다.", () => {
    vocabularyItems = [];
    const trie = Trie.getInstance(10, vocabularyItems);
    const anotherTrie = Trie.getInstance(10, vocabularyItems);
    expect(anotherTrie).toBe(trie);
  });

  it("찾으려는 갯수보다 많은 단어가 저장되어도 찾으려는 갯수만 리턴한다.", () => {
    vocabularyItems = pipe(
      range(20),
      map((_) => createVocabularyItem("apple")),
      toArray
    );
    const trie = new Trie(10, vocabularyItems);
    expect(trie.search("apple").length).toBe(10);
  });

  it("찾으려는 갯수보다 적은 단어가 저장된다면 저장된 수만큼 보인다.", () => {
    vocabularyItems = pipe(
      range(5),
      map((_) => createVocabularyItem("apple")),
      toArray
    );
    const trie = new Trie(10, vocabularyItems);
    expect(trie.search("apple").length).toBe(5);
  });

  it("만약 'a'를 입력한다면 'a${*}' 형태를 찾을 수 있다.", () => {
    const vocabularyItems = [
      createVocabularyItem("a"), // O
      createVocabularyItem("aa"), // O
      createVocabularyItem("ab"), // O
      createVocabularyItem("ac"), // O
      createVocabularyItem("cc"), // X
      createVocabularyItem("cd"), // X
    ];
    const trie = new Trie(10, vocabularyItems);
    expect(trie.search("a").length).toBe(4);
  });

  it("만약 Trie에 저장된 정보가 없다면 빈 배열을 리턴한다.", () => {
    const vocabularyItems = [
      createVocabularyItem("a"), // O
      createVocabularyItem("aa"), // O
      createVocabularyItem("ab"), // O
      createVocabularyItem("ac"), // O
      createVocabularyItem("cc"), // X
      createVocabularyItem("cd"), // X
    ];
    const trie = new Trie(10, vocabularyItems);
    expect(trie.search("unique")).toStrictEqual([]);
  });
});
