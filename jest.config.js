/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  setupFiles: ['./setup-jest.js'],
  modulePathIgnorePatterns: ['./tests/typicode'],
  reporters: ['default',
    ['jest-junit', { outputDirectory: 'reports' }],
    ['jest-html-reporters', { publicPath: 'reports'}]
  ]
};