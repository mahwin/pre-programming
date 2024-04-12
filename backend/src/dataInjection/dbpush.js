const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
  //
];

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

async function dbPush() {
  let total = [];
  const getVocabulary = await prisma.vocabulary.findMany({});
  for (let category of categories) {
    const dicObj = require(`../../../etc/crawler/data/complete-dictionarys/1/db/${category}.json`);
    total.push(...dicObj);
  }

  let start = 0;

  for (let i = start; i < total.length; i++) {
    if (
      getVocabulary[i] &&
      getVocabulary[i].category === total[i].category &&
      getVocabulary[i].mean === total[i].mean &&
      getVocabulary[i].word === total[i].word
    ) {
      console.log('same', i);
    }
  }
}

dbPush();
