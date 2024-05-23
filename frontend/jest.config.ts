import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/utils/$1",
    "^@type/(.*)$": "<rootDir>/type/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@svg$": "<rootDir>/assets/svg/RootSvg.tsx",
    "^@color/(.*)$": "<rootDir>/assets/color/$1",
    "^@redux/(.*)$": "<rootDir>/redux/$1",
    "^@api/(.*)$": "<rootDir>/api/$1",
    "^@hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
  },

  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  testEnvironment: "jsdom",

  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};

export default config;
