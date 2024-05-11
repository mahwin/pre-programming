const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  'recoil',
  'axios',
  'react',
  'next',
  'reactRedux',
  'reactQuery',
  'reactHoavailableForm',
  'tailwindcss',
  'reactRouter',
  'styledComponents',
];

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

async function dbPush() {
  let total = [];
  // const getVocabulary = await prisma.vocabulary.findMany({});
  // for (let category of categories) {
  //   const dicObj = require(`../../../etc/crawler/data/complete-dictionarys/1/db/${category}.json`);
  //   total.push(...dicObj);
  // }

  // let start = 0;

  // for (let i = start; i < total.length; i++) {
  //   if (
  //     getVocabulary[i] &&
  //     getVocabulary[i].category === total[i].category &&
  //     getVocabulary[i].mean === total[i].mean &&
  //     getVocabulary[i].word === total[i].word
  //   ) {
  //     console.log('same', i);
  //   }
  // }
  // const { data } = await prisma.seperatedVocabulary.findUnique({
  //   where: { id: 1 },
  // });
  // let newObj = {};

  // const a = JSON.parse(data).category;
  // let cnt = 0;
  // for (const c of categories) {
  //   Object.keys(a[c].level).forEach((le) => {
  //     a[c].level[le].forEach(({ word, mean, frequency }) => {
  //       // newObj.push({
  //       //   word,
  //       //   mean: JSON.parse(mean),
  //       //   frequency,
  //       //   category: c,
  //       //   level: le,
  //       // });
  //       // if (!Array.isArray(mean)) {
  //       // } else {
  //       //   console.log(word, mean, frequency);
  //       // }
  //       cnt++;
  //     });
  //   });
  //   console.log(cnt);
  // }
  const { data } = await prisma.seperatedVocabulary.findUnique({
    where: { id: 2 },
  });

  await prisma.classifiedVocabulary.create({
    data: {
      data: JSON.stringify(classifiedVoca(JSON.parse(data))),
    },
  });
}

dbPush();

function classifiedVoca(vocas) {
  const classifiedData = {};

  vocas.forEach(({ category, ...res }) => {
    if (!classifiedData[category]) {
      classifiedData[category] = {};
    }
    if (!classifiedData[category][res.level]) {
      classifiedData[category][res.level] = [];
    }
    classifiedData[category][res.level].push({ category, ...res });
  });
  return classifiedData;
}
