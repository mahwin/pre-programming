const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function dataSplitter(dataArr) {
  const newObj = {};
  for (let data of dataArr) {
    const key = data.level;
    const tmpObj = {
      word: data.word,
      mean: data.mean,
      frequency: data.frequency,
    };
    if (Object.keys(newObj).includes(key)) {
      newObj[key].push(tmpObj);
    } else {
      newObj[key] = [tmpObj];
    }
  }
  return { level: newObj };
}

const categories = [
  'recoil',
  'axios',
  'react',
  'next',
  'reactRedux',
  'reactQuery',
  'reactHookForm',
  'tailwindcss',
  'reactRouter',
  'styledComponents',
];

async function dbPush() {
  const categoryObj = {};
  for (let category of categories) {
    const dicObj = require(`../../../../crawler/data/complete-dictionarys/1/db/${category}.json`);
    const levelObj = dataSplitter(dicObj);
    categoryObj[category] = levelObj;
  }
  const savedData = JSON.stringify({ category: categoryObj });
  await prisma.SeperatedVocabulary.create({
    data: {
      data: savedData,
    },
  });
}

dbPush();
