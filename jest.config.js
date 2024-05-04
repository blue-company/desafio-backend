module.exports = {
  injectGlobals: true,
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js', '!src/server.js', '!src/database/**', '!tests/**/*'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  coverageReporters: ['lcov', 'text'],
  testTimeout: 20000,
};
