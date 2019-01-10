module.exports = {
  bail: true,
  globals: {
    "ts-jest": {
      "tsConfig": "tsconfig.json",
      "diagnostics": false,
    }
  },
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/*.+(ts|js)",
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
}
