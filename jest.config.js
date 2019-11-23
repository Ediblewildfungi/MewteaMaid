require('dotenv')
  .config({ path: './.env.test' })

module.exports = {
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/main.js',
  ],
}
