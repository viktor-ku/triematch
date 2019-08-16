export default {
  extensions: [
    'ts'
  ],
  require: [
    'ts-node/register/transpile-only'
  ],
  files: [
    '__tests__/*.spec.ts'
  ],
  sources: [
    'src/**/*.ts'
  ],
  cache: true,
  concurrency: 8,
}
