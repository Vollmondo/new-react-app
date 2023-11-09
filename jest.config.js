
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/*',
    'src/**/*.ts?(x)',
    '!src/index.tsx',
],
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    [
        'html',
        {
            subdir: 'html',
        },
    ],
  ],
  globals: {
    __webpack_public_path__: '__webpack_public_path__',
  },
  moduleNameMapper: {
    '\\.(css|ico)$': '<rootDir>/__mocks__/file.js',
  }
};