export default function handler(req: any, res: any) {
  res.status(200).json({ data: testData, tableData });
}

// let tableData = [];
// rawData.forEach((item) => {
//   let [word, correct] = item.split(":");
//   tableData.push({ word, correct });
// });
// let rawData = [
//   "proceed:계속하다, 진행하다",
//   "proceeds:이익, 수익",
//   "precede:앞서다",
//   "procure:사다, 얻다",
//   "foresee:미리 보다, 예상하다",
//   "predict:예측하다",
//   "foreclose:미리 막다",
//   "update:최신정보, 갱신하기,최신의 것으로 하다",
//   "updated:최신 개정된",
//   "upkeep:유지비",
//   "observe:보다, 준수하다",
//   "observance:준수, 행사의 경축",
//   "observation:관찰",
//   "inspect:검사하다, 조사하다",
//   "correlate:서로 관련시키다",
//   "dedicate:헌신하다, 바치다",
//   "install:설치하다",
//   "conditional:조건부의, 잠정적인",
//   "permissable:허가할 수 있는, 무방한",
//   "responsible:책임있는",
//   "eligible:적격의, 자격 있는",
//   "amply:충분히, 상세하게",
//   "deeply:깊이, 몹시",
//   "extremely:매우, 극단적으로",
//   "largely:주로, 대량으로",
//   "approach:접근",
//   "bid:입찰",
//   "consent:동의",
//   "condition:조건, 상태",
//   "contraction:수축, 축소, 단축",
//   "convergence:한 점으로 집합함, 수렴",
//   "offer:제공, 제의",
//   "suggestion:제안, 암시",
//   "assume:가정하다, (임무 등을) 맡다",
//   "assign:할당하다, 지정하다",
//   "valid:유효한, 효력이있는",
//   "considerable:상당히 많은",
//   "promptly:신속히",
//   "aim:목표",
//   "meet:충족시키다",
//   "influence:영향을 미치다",
//   "capacity:능력, 용량",
//   "dedicated:헌신적인",
//   "enforce:시행하다, 집행하다",
//   "reference:추천서",
//   "circumscribe:~을 제한하다",
//   "assume:떠맡다, 추정하다",
//   "adjust (to):에 적응하다, 조정하다",
//   "expertise:전문기술",
//   "aggravate:악화시키다",
//   "reverse:반대의",
//   "adverse:불리한, 불운의, 부정적인",
//   "violence:폭력",
//   "violation:위반, 위배",
//   "stagnant:침체된, 불경기의",
//   "condense:간추리다, 요약하다",
//   "competent:유능한",
//   "affect:(사람, 사물)~에 영향을 미치다",
//   "effect:효과, 효력 / (변화를)초래하다",
//   "persist:지속하다, 고집하다",
//   "advise:조언해 주다, 충고하다",
//   "advice:조언, 충고",
//   "endorse:보증 선전하다, 지지하다",
//   "fortify:강화하다, 장려하다",
//   "interpret:(정보, 작품, 행동 등을)해석하다, 설명하다, 통역하다",
//   "translate:번역, 통역하다, 이동시키다",
//   "obsolete:구식의, 시대에 뒤떨어진",
//   "blemish:흠, 결점",
//   "arguable:논쟁의 여지가 있는",
//   "replacement:교환품, 후임자",
//   "accumulate:(서서히)축적하다, 모으다",
//   "diversify:다양화하다",
//   "hospitality:환대, 친절",
//   "compromise:타협, 화해/ 타협하다, 화해하다",
//   "alleviate:완화하다",
//   "annulment:무효화, 취소",
//   "annotated:주석이 달린",
//   "process:과정, 진행",
//   "proceed:진행되다, 진척되다",
//   "procedure:절차, 순서, 진행",
//   "proceeds:수입, 매상고",
//   "applaud:박수를 치다",
//   "assure:~에게 보장하다, ~을 안심시키다",
//   "dignitary:고위 관료",
//   "occupancy:이용률",
//   "occupation:직업, 점유",
//   "occupant:점유자, 임차인",
//   "rate:평가하다, 여기다, 비율, 요금",
//   "anticipate:기대하다, 예상하다",
//   "appoint:임명하다, 설립하다, 정하다",
//   "estimate:추정치, 추산, 추정하다",
//   "obligatory:의무적인",
//   "oblige:~에게 강요하다",
//   "slight:약간의",
//   "amend:수정하다",
//   "modify:수정하다",
//   "liability:책임, 부채, 채무",
//   "clout:영향력",
//   "commence:개시하다, 시작하다",
//   "initiate:시작하다, 착수하다",
//   "run:~을 경영하다",
//   "dispose:처분하다, 처리하다",
//   "prevalent:널리 퍼진, 유행하고 있는, 우세한",
//   "outweigh:(가치, 중요성이) ~보다 크다",
//   "yield: 이윤을 내다, 산출하다, 이윤, 생산량",
//   "emphasize:강조하다",
//   "oppose:반대하다",
//   "impose:부과하다",
//   "compose:구성하다, 작곡하다",
//   "appraisal:평가",
//   "convince:납득시키다, 확신시키다",
//   "maintain:유지하다, 보존하다",
//   "technicalities:세부적인 내용",
//   "discard:버리다",
//   "highly:매우, 대단히",
//   "foremost:으뜸가는, 일류의",
//   "upscale:고급의, 평균 이상의",
//   "challenge:이의를 제기하다",
//   "document:문서",
//   "application:응용",
// ];

// function shuffle(array: string[]): void {
//   array.sort(() => Math.random() - 0.5);
// }
// shuffle(rawData);
// let test = rawData.splice(0, 30);
// const testData = [];
// test.forEach((item) => {
//   let obj = {};
//   const [word, correct] = item.split(":");
//   obj = { word, correct };
//   testData.push(obj);
// });

// for (let i = 0; i < 30; i++) {
//   let obj = {};
//   for (var j = 0; j < 3; j++) {
//     let [_, ex] = rawData[i + j].split(":");
//     obj = { ...obj,[`example${j}`]: ex };
//   }
//   testData[i] = { ...testData[i], ...obj };
// }

const testData = [
  {
    word: "extremely",
    correct: "매우, 극단적으로",
    example: "조언해 주다, 충고하다",
    example1: "논쟁의 여지가 있는",
    example2: "미리 보다, 예상하다",
  },
  {
    word: "adverse",
    correct: "불리한, 불운의, 부정적인",
    example: "논쟁의 여지가 있는",
    example1: "미리 보다, 예상하다",
    example2: "절차, 순서, 진행",
  },
  {
    word: "observe",
    correct: "보다, 준수하다",
    example: "미리 보다, 예상하다",
    example1: "절차, 순서, 진행",
    example2: "구식의, 시대에 뒤떨어진",
  },
  {
    word: "contraction",
    correct: "수축, 축소, 단축",
    example: "절차, 순서, 진행",
    example1: "구식의, 시대에 뒤떨어진",
    example2: "교환품, 후임자",
  },
  {
    word: "compose",
    correct: "구성하다, 작곡하다",
    example: "구식의, 시대에 뒤떨어진",
    example1: "교환품, 후임자",
    example2: "서로 관련시키다",
  },
  {
    word: "proceed",
    correct: "계속하다, 진행하다",
    example: "교환품, 후임자",
    example1: "서로 관련시키다",
    example2: "수입, 매상고",
  },
  {
    word: "proceeds",
    correct: "이익, 수익",
    example: "서로 관련시키다",
    example1: "수입, 매상고",
    example2: "수정하다",
  },
  {
    word: "translate",
    correct: "번역, 통역하다, 이동시키다",
    example: "수입, 매상고",
    example1: "수정하다",
    example2: "시작하다, 착수하다",
  },
  {
    word: "assume",
    correct: "가정하다, (임무 등을) 맡다",
    example: "수정하다",
    example1: "시작하다, 착수하다",
    example2: "전문기술",
  },
  {
    word: "emphasize",
    correct: "강조하다",
    example: "시작하다, 착수하다",
    example1: "전문기술",
    example2: "영향력",
  },
  {
    word: "dignitary",
    correct: "고위 관료",
    example: "전문기술",
    example1: "영향력",
    example2: "악화시키다",
  },
  {
    word: "document",
    correct: "문서",
    example: "영향력",
    example1: "악화시키다",
    example2: "(정보, 작품, 행동 등을)해석하다, 설명하다, 통역하다",
  },
  {
    word: "updated",
    correct: "최신 개정된",
    example: "악화시키다",
    example1: "(정보, 작품, 행동 등을)해석하다, 설명하다, 통역하다",
    example2: "박수를 치다",
  },
  {
    word: "condense",
    correct: "간추리다, 요약하다",
    example: "(정보, 작품, 행동 등을)해석하다, 설명하다, 통역하다",
    example1: "박수를 치다",
    example2: "과정, 진행",
  },
  {
    word: "suggestion",
    correct: "제안, 암시",
    example: "박수를 치다",
    example1: "과정, 진행",
    example2: "개시하다, 시작하다",
  },
  {
    word: "enforce",
    correct: "시행하다, 집행하다",
    example: "과정, 진행",
    example1: "개시하다, 시작하다",
    example2: "강화하다, 장려하다",
  },
  {
    word: "technicalities",
    correct: "세부적인 내용",
    example: "개시하다, 시작하다",
    example1: "강화하다, 장려하다",
    example2: "주석이 달린",
  },
  {
    word: "convergence",
    correct: "한 점으로 집합함, 수렴",
    example: "강화하다, 장려하다",
    example1: "주석이 달린",
    example2: "다양화하다",
  },
  {
    word: "observation",
    correct: "관찰",
    example: "주석이 달린",
    example1: "다양화하다",
    example2: "~에게 보장하다, ~을 안심시키다",
  },
  {
    word: "adjust (to)",
    correct: "에 적응하다, 조정하다",
    example: "다양화하다",
    example1: "~에게 보장하다, ~을 안심시키다",
    example2: "충분히, 상세하게",
  },
  {
    word: "rate",
    correct: "평가하다, 여기다, 비율, 요금",
    example: "~에게 보장하다, ~을 안심시키다",
    example1: "충분히, 상세하게",
    example2: "으뜸가는, 일류의",
  },
  {
    word: "persist",
    correct: "지속하다, 고집하다",
    example: "충분히, 상세하게",
    example1: "으뜸가는, 일류의",
    example2: "조건부의, 잠정적인",
  },
  {
    word: "appoint",
    correct: "임명하다, 설립하다, 정하다",
    example: "으뜸가는, 일류의",
    example1: "조건부의, 잠정적인",
    example2: "이의를 제기하다",
  },
  {
    word: "oppose",
    correct: "반대하다",
    example: "조건부의, 잠정적인",
    example1: "이의를 제기하다",
    example2: "평가",
  },
  {
    word: "obligatory",
    correct: "의무적인",
    example: "이의를 제기하다",
    example1: "평가",
    example2: "수정하다",
  },
  {
    word: "anticipate",
    correct: "기대하다, 예상하다",
    example: "평가",
    example1: "수정하다",
    example2: "버리다",
  },
  {
    word: "competent",
    correct: "유능한",
    example: "수정하다",
    example1: "버리다",
    example2: "사다, 얻다",
  },
  {
    word: "convince",
    correct: "납득시키다, 확신시키다",
    example: "버리다",
    example1: "사다, 얻다",
    example2: "완화하다",
  },
  {
    word: "dedicate",
    correct: "헌신하다, 바치다",
    example: "사다, 얻다",
    example1: "완화하다",
    example2: "깊이, 몹시",
  },
  {
    word: "blemish",
    correct: "흠, 결점",
    example: "완화하다",
    example1: "깊이, 몹시",
    example2: "조언, 충고",
  },
];

const tableData = [
  {
    word: "proceed",
    correct: "계속하다, 진행하다",
  },
  {
    word: "proceeds",
    correct: "이익, 수익",
  },
  {
    word: "precede",
    correct: "앞서다",
  },
  {
    word: "procure",
    correct: "사다, 얻다",
  },
  {
    word: "foresee",
    correct: "미리 보다, 예상하다",
  },
  {
    word: "predict",
    correct: "예측하다",
  },
  {
    word: "foreclose",
    correct: "미리 막다",
  },
  {
    word: "update",
    correct: "최신정보, 갱신하기,최신의 것으로 하다",
  },
  {
    word: "updated",
    correct: "최신 개정된",
  },
  {
    word: "upkeep",
    correct: "유지비",
  },
  {
    word: "observe",
    correct: "보다, 준수하다",
  },
  {
    word: "observance",
    correct: "준수, 행사의 경축",
  },
  {
    word: "observation",
    correct: "관찰",
  },
  {
    word: "inspect",
    correct: "검사하다, 조사하다",
  },
  {
    word: "correlate",
    correct: "서로 관련시키다",
  },
  {
    word: "dedicate",
    correct: "헌신하다, 바치다",
  },
  {
    word: "install",
    correct: "설치하다",
  },
  {
    word: "conditional",
    correct: "조건부의, 잠정적인",
  },
  {
    word: "permissable",
    correct: "허가할 수 있는, 무방한",
  },
  {
    word: "responsible",
    correct: "책임있는",
  },
  {
    word: "eligible",
    correct: "적격의, 자격 있는",
  },
  {
    word: "amply",
    correct: "충분히, 상세하게",
  },
  {
    word: "deeply",
    correct: "깊이, 몹시",
  },
  {
    word: "extremely",
    correct: "매우, 극단적으로",
  },
  {
    word: "largely",
    correct: "주로, 대량으로",
  },
  {
    word: "approach",
    correct: "접근",
  },
  {
    word: "bid",
    correct: "입찰",
  },
  {
    word: "consent",
    correct: "동의",
  },
  {
    word: "condition",
    correct: "조건, 상태",
  },
  {
    word: "contraction",
    correct: "수축, 축소, 단축",
  },
  {
    word: "convergence",
    correct: "한 점으로 집합함, 수렴",
  },
  {
    word: "offer",
    correct: "제공, 제의",
  },
  {
    word: "suggestion",
    correct: "제안, 암시",
  },
  {
    word: "assume",
    correct: "가정하다, (임무 등을) 맡다",
  },
  {
    word: "assign",
    correct: "할당하다, 지정하다",
  },
  {
    word: "valid",
    correct: "유효한, 효력이있는",
  },
  {
    word: "considerable",
    correct: "상당히 많은",
  },
  {
    word: "promptly",
    correct: "신속히",
  },
  {
    word: "aim",
    correct: "목표",
  },
  {
    word: "meet",
    correct: "충족시키다",
  },
  {
    word: "influence",
    correct: "영향을 미치다",
  },
  {
    word: "capacity",
    correct: "능력, 용량",
  },
  {
    word: "dedicated",
    correct: "헌신적인",
  },
  {
    word: "enforce",
    correct: "시행하다, 집행하다",
  },
  {
    word: "reference",
    correct: "추천서",
  },
  {
    word: "circumscribe",
    correct: "~을 제한하다",
  },
  {
    word: "assume",
    correct: "떠맡다, 추정하다",
  },
  {
    word: "adjust (to)",
    correct: "에 적응하다, 조정하다",
  },
  {
    word: "expertise",
    correct: "전문기술",
  },
  {
    word: "aggravate",
    correct: "악화시키다",
  },
  {
    word: "reverse",
    correct: "반대의",
  },
  {
    word: "adverse",
    correct: "불리한, 불운의, 부정적인",
  },
  {
    word: "violence",
    correct: "폭력",
  },
  {
    word: "violation",
    correct: "위반, 위배",
  },
  {
    word: "stagnant",
    correct: "침체된, 불경기의",
  },
  {
    word: "condense",
    correct: "간추리다, 요약하다",
  },
  {
    word: "competent",
    correct: "유능한",
  },
  {
    word: "affect",
    correct: "(사람, 사물)~에 영향을 미치다",
  },
  {
    word: "effect",
    correct: "효과, 효력 / (변화를)초래하다",
  },
  {
    word: "persist",
    correct: "지속하다, 고집하다",
  },
  {
    word: "advise",
    correct: "조언해 주다, 충고하다",
  },
  {
    word: "advice",
    correct: "조언, 충고",
  },
  {
    word: "endorse",
    correct: "보증 선전하다, 지지하다",
  },
  {
    word: "fortify",
    correct: "강화하다, 장려하다",
  },
  {
    word: "interpret",
    correct: "(정보, 작품, 행동 등을)해석하다, 설명하다, 통역하다",
  },
  {
    word: "translate",
    correct: "번역, 통역하다, 이동시키다",
  },
  {
    word: "obsolete",
    correct: "구식의, 시대에 뒤떨어진",
  },
  {
    word: "blemish",
    correct: "흠, 결점",
  },
  {
    word: "arguable",
    correct: "논쟁의 여지가 있는",
  },
  {
    word: "replacement",
    correct: "교환품, 후임자",
  },
  {
    word: "accumulate",
    correct: "(서서히)축적하다, 모으다",
  },
  {
    word: "diversify",
    correct: "다양화하다",
  },
  {
    word: "hospitality",
    correct: "환대, 친절",
  },
  {
    word: "compromise",
    correct: "타협, 화해/ 타협하다, 화해하다",
  },
  {
    word: "alleviate",
    correct: "완화하다",
  },
  {
    word: "annulment",
    correct: "무효화, 취소",
  },
  {
    word: "annotated",
    correct: "주석이 달린",
  },
  {
    word: "process",
    correct: "과정, 진행",
  },
  {
    word: "proceed",
    correct: "진행되다, 진척되다",
  },
  {
    word: "procedure",
    correct: "절차, 순서, 진행",
  },
  {
    word: "proceeds",
    correct: "수입, 매상고",
  },
  {
    word: "applaud",
    correct: "박수를 치다",
  },
  {
    word: "assure",
    correct: "~에게 보장하다, ~을 안심시키다",
  },
  {
    word: "dignitary",
    correct: "고위 관료",
  },
  {
    word: "occupancy",
    correct: "이용률",
  },
  {
    word: "occupation",
    correct: "직업, 점유",
  },
  {
    word: "occupant",
    correct: "점유자, 임차인",
  },
  {
    word: "rate",
    correct: "평가하다, 여기다, 비율, 요금",
  },
  {
    word: "anticipate",
    correct: "기대하다, 예상하다",
  },
  {
    word: "appoint",
    correct: "임명하다, 설립하다, 정하다",
  },
  {
    word: "estimate",
    correct: "추정치, 추산, 추정하다",
  },
  {
    word: "obligatory",
    correct: "의무적인",
  },
  {
    word: "oblige",
    correct: "~에게 강요하다",
  },
  {
    word: "slight",
    correct: "약간의",
  },
  {
    word: "amend",
    correct: "수정하다",
  },
  {
    word: "modify",
    correct: "수정하다",
  },
  {
    word: "liability",
    correct: "책임, 부채, 채무",
  },
  {
    word: "clout",
    correct: "영향력",
  },
  {
    word: "commence",
    correct: "개시하다, 시작하다",
  },
  {
    word: "initiate",
    correct: "시작하다, 착수하다",
  },
  {
    word: "run",
    correct: "~을 경영하다",
  },
  {
    word: "dispose",
    correct: "처분하다, 처리하다",
  },
  {
    word: "prevalent",
    correct: "널리 퍼진, 유행하고 있는, 우세한",
  },
  {
    word: "outweigh",
    correct: "(가치, 중요성이) ~보다 크다",
  },
  {
    word: "yield",
    correct: " 이윤을 내다, 산출하다, 이윤, 생산량",
  },
  {
    word: "emphasize",
    correct: "강조하다",
  },
  {
    word: "oppose",
    correct: "반대하다",
  },
  {
    word: "impose",
    correct: "부과하다",
  },
  {
    word: "compose",
    correct: "구성하다, 작곡하다",
  },
  {
    word: "appraisal",
    correct: "평가",
  },
  {
    word: "convince",
    correct: "납득시키다, 확신시키다",
  },
  {
    word: "maintain",
    correct: "유지하다, 보존하다",
  },
  {
    word: "technicalities",
    correct: "세부적인 내용",
  },
  {
    word: "discard",
    correct: "버리다",
  },
  {
    word: "highly",
    correct: "매우, 대단히",
  },
  {
    word: "foremost",
    correct: "으뜸가는, 일류의",
  },
  {
    word: "upscale",
    correct: "고급의, 평균 이상의",
  },
  {
    word: "challenge",
    correct: "이의를 제기하다",
  },
  {
    word: "document",
    correct: "문서",
  },
  {
    word: "application",
    correct: "응용",
  },
];
