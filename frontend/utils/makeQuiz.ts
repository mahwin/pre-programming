interface IVoca {
  word: string;
  mean: string;
  frequency: string;
}

function randomPick(min: number, max: number, pick: number): number[] {
  let numSet: Set<number> = new Set();
  while (numSet.size !== pick) {
    numSet.add(min + Math.floor(Math.random() * max));
  }
  return Array.from(numSet);
}
// [many] => [1,3,1,2,3,4,1,2,3]
function correctArr(many: number) {
  //정답 List 랜덤으로 만들기
  const answerList = [];
  for (let trial = 0; trial < many; trial++) {
    answerList.push(randomPick(1, 4, 1)[0]);
  }
  return answerList;
}

function shuffle(spreadArr: IVoca[]) {
  return spreadArr.sort(() => Math.random() - 0.5);
}

function getQuiz(spreadArr: IVoca[], many: number) {
  const shuffleArr = shuffle(spreadArr);
  const corrects = correctArr(many);

  let quizs = [];
  for (let i = 0; i < many; i++) {
    let quiz = { question: "", selectList: [] as string[] };
    for (let j = 0; j < 4; j++) {
      const correct = corrects[i];

      if (j + 1 === correct) {
        quiz.question = shuffleArr[i * 4 + j].word;
      }
      let mean = shuffleArr[i * 4 + j].mean;
      quiz.selectList.push(eval(mean).join(" "));
    }
    quizs.push(quiz);
  }
  return { quizs, corrects };
}

export default function makeQuiz(object: any, many: number) {
  //  vocas가 메인 페이지에선 {level: Voca[]}
  //  userVoca 페이지에선 Voca[]
  const keys = Object.keys(object);
  let spreadArr: IVoca[] = [];
  if (!Array.isArray(object)) {
    // {level: Voca[]} 형식이면
    const picks = randomPick(1, keys.length - 1, 3);
    picks.forEach((pick) => (spreadArr = spreadArr.concat(object[pick])));
  } else spreadArr = object;
  //정답 하나, 예시 3개 한 문제당 총 4개 필요 4 * many
  return getQuiz(spreadArr, many);
}
