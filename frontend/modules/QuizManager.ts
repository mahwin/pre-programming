import { VocabularyItems, VocabularyItem } from "@type/commons/vocabulary";
import { meanConvert } from "@utils/meanConvert";
import { pipe, take, map, filter, range, toArray, zip } from "@fxts/core";

type QuizDataList = {
  word: string;
  answers: string[];
};

export class QuizManager {
  tagetVocabulary: VocabularyItems;
  totalVocabulary: VocabularyItems;
  answerIdxList: number[];
  answerMeanList: string[][];
  quizDataList: QuizDataList[];
  quizNum: number;
  constructor(
    tagetVocabulary: VocabularyItems,
    totalVocabulary: VocabularyItems,
    quizNum: number
  ) {
    this.tagetVocabulary = tagetVocabulary;
    this.totalVocabulary = totalVocabulary;
    this.quizNum = quizNum;
    this.quizDataList = [];
    this.answerIdxList = [];
    this.answerMeanList = [];
    this.makeQuiz();
  }

  get totalVocabularyNum() {
    return this.totalVocabulary.length;
  }

  get quizList() {
    return this.quizDataList;
  }

  get answerList() {
    return this.answerIdxList;
  }

  makeQuiz() {
    // 무작위로 섞기
    this.shuffle(this.tagetVocabulary);

    // 정답 번호 미리 뽑기
    this.answerIdxList = pipe(
      range(this.quizNum),
      map((_) => this.randomNumber(4)),
      toArray
    );

    // 문제 보기 만들기
    this.answerMeanList = pipe(
      zip(this.tagetVocabulary, this.answerIdxList),
      map(([item, idx]) => {
        const answers = this.uniquePickMeans(item.word, 5);
        answers[idx] = item.mean;
        return answers;
      }),
      map(this.convertMeans),
      toArray
    );

    this.quizDataList = pipe(
      zip(this.tagetVocabulary, this.answerMeanList),
      map(([item, answers]) => ({
        word: item.word,
        answers,
      })),
      toArray
    );
  }

  private convertMeans(means: string[][]) {
    return means.map((mean) => meanConvert(mean, 2, 12));
  }

  private getRandomVocabulary() {
    return this.totalVocabulary[this.randomNumber()];
  }

  private randomNumber(end = this.totalVocabularyNum) {
    return Math.floor(Math.random() * end);
  }

  private uniquePickMeans(word: string, num: number) {
    return pipe(
      range(Infinity),
      map((_) => this.getRandomVocabulary()),
      filter((item) => item.word !== word),
      take(num),
      map((item) => item.mean),
      toArray
    );
  }

  private shuffle<T>(arr: Array<T>) {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}
