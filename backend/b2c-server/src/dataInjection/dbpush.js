// import { PrismaService } from 'prisma/prisma.service';
// import datas from '../../../../crawler/data/complete-dictionarys/1/mean-word-frequency-level/react.json';

const PrismaClient = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  'recoil',
  'react',
  'next',
  'reactRedux',
  'reactQuery',
  'reactHookForm',
  'tailwindCss',
  'reactRouter',
  'styledComponents',
  'axios',
];

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
} //

async function dbPush() {
  for (let category of categories) {
    const dicObj = require(`../../../crawler/data/complete-dictionarys/1/db/${category}.json`);
    sleep(3);
    for (let i = 1; i < dicObj.length; i++) {
      if (i % 100 === 0) {
        sleep(10);
        console.log(i, category);
      }
      const newData = await prisma.vocabulary.create({
        data: {
          ...dicObj[i],
        },
      });
    }
  }
}

dbPush();
