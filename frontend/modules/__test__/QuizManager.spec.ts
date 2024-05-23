import { QuizManager } from "./QuizManager";
import { VocabularyItem } from "@type/commons/vocabulary";
import { pipe, range, map, toArray, zip } from "@fxts/core";

const createVocabularyItem = (
  word: string,
  mean: string[]
): VocabularyItem => ({
  word,
  mean,
  level: "1",
  category: "react",
  frequency: "1",
});

const createVocabularys = (num: number) =>
  pipe(
    range(num),
    map((i) => "a".charCodeAt(0) + i),
    map((i) => String.fromCharCode(i)),
    map((char) => createVocabularyItem(char, [char])),
    toArray
  );

const correctQuiz = {
  apple: "사과",
  banana: "바나나",
  cherry: "체리",
  date: "데이트",
  elderberry: "엘더베리",
};

let targetVocabulary = pipe(
  Object.entries(correctQuiz),
  map(([word, mean]) => createVocabularyItem(word, [mean])),
  toArray
);

const quizNum = 5;
let totalVocabulary = createVocabularys(100);

let quizManager: QuizManager;

beforeEach(() => {
  quizManager = new QuizManager(targetVocabulary, totalVocabulary, quizNum);
});

describe("QuizManager", () => {
  it("생성을 요청한 퀴즈가 quizList에 담겨 있다.", () => {
    expect(quizManager.quizList.length).toBe(quizNum);
  });

  it("생성을 요청한 퀴즈의 퀴즈 수와 answers의 수는 같다", () => {
    expect(quizManager.quizList.length).toBe(quizManager.answerList.length);
  });

  it("생성을 요청한 퀴즈의 answers(보기목록)에는 겹치는 보기가 없다.", () => {
    pipe(
      quizManager.quizList,
      map((quiz) => quiz.answers),
      map((answers) => new Set(answers)),
      map((answers) => expect(answers.size).toBe(quizNum))
    );
  });

  it("퀴즈의 정답이 정확하게 answerList에 있어야 한다.", () => {
    const { quizList, answerList } = quizManager;

    pipe(
      zip(quizList, answerList),
      map(([{ word: w, answers: as }, aIdx]) => [
        correctQuiz[w as "apple"],
        as[aIdx],
      ]),
      map(([ans, cAns]) => expect(ans).toEqual(expect.stringContaining(cAns)))
    );
  });
});
