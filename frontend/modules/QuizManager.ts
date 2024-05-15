import { VocabularyItems } from "@type/commons/vocabulary";
import { meanConvert } from "@utils/meanConvert";

type QuizDataList = {
  word: string;
  answers: string[];
};

export class QuizManager {
  tagetVocabulary: VocabularyItems;
  totalVocabulary: VocabularyItems;
  answerList: number[];
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
    this.answerList = [];
    this.makeQuiz();
  }

  makeQuiz() {
    this.quizDataList = this.shuffle(this.tagetVocabulary)
      .slice(0, this.quizNum)
      .reduce((a, c) => {
        const answers = [];
        const currentAnswerNumber = this.randomNumber(4);

        this.answerList.push(currentAnswerNumber);

        for (let i = 0; i < 4; i++) {
          let uniqueVocabulary = this.uniquePick(c.word);
          answers.push(uniqueVocabulary.mean);
        }
        answers.splice(currentAnswerNumber, 0, c.mean);
        a.push({
          word: c.word,
          answers: answers.map((el) => meanConvert(el, 2, 12)),
        });

        return a;
      }, [] as QuizDataList[]);
  }

  get totalQuizNum() {
    return this.totalVocabulary.length;
  }

  get quizList() {
    console.log(this.quizDataList);
    return this.quizDataList;
  }

  get quizAnswerList() {
    return this.answerList;
  }

  getRandomVocabulary() {
    return this.totalVocabulary[this.randomNumber()];
  }

  randomNumber(end = this.totalQuizNum) {
    return Math.floor(Math.random() * end);
  }

  uniquePick(word: string) {
    let vocabulary = this.getRandomVocabulary();
    while (vocabulary.word === word) {
      vocabulary = this.getRandomVocabulary();
    }
    return vocabulary;
  }

  shuffle<T>(arr: Array<T>) {
    return arr.sort(() => Math.random() - 0.5);
  }
}
