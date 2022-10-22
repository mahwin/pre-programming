interface IVocas {}

interface Voca {
  word: string;
  mean: string;
  frequency: string;
}

function answerMaker(many: number) {
  //정답 List 랜덤으로 만들기
  const answerList = [];
  for (let trial = 0; trial < many; trial++) {
    console.log("!");
    answerList.push(Math.ceil(Math.random() * 4));
  }

  return answerList;
}

function shuffle(spreadArr: Voca[], need: number) {
  spreadArr.sort(() => Math.random() - 0.5).splice(0, need);
  return spreadArr;
}

export default function makeTestVoca(array: [Voca[]], many: number) {
  //정답 하나, 예시 3개  한 문제당 총 4개 필요
  let spreadArr = array.reduce((p, c) => p.concat(c), []);
  const need = 4 * many;
  const shuffleArr = shuffle(spreadArr, need);
  const answerList = answerMaker(many);
  console.log(answerList);
  let testData = [];
  for (let i = 0; i < many; i++) {
    let quiz = { question: "", selectList: [] as string[] };
    for (let j = 0; j < 4; j++) {
      const correct = answerList[i];
      if (j + 1 === correct) {
        quiz.question = shuffleArr[i * 4 + j].word;
      }
      console.log(i * 4 + j);
      let mean = shuffleArr[i * 4 + j].mean;
      quiz.selectList.push(eval(mean).join(" "));
    }
    testData.push(quiz);
  }
  return { testData, testAnswer: answerList };
}
