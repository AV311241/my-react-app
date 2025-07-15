
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/e2e/',           // ❌ Ignore Playwright tests
    '\\.spec\\.(js|ts|jsx|tsx)$' // Optionally ignore *.spec.* files
  ],
  reporters: [
    'default',
    [ 'jest-junit', {
      outputDirectory: './reports/junit',
      outputName: 'junit.xml'
    }],
    [ 'jest-html-reporter', {
      outputPath: './reports/jest/report.html',
      pageTitle: 'Jest Test Report'
    }]
  ]
};
