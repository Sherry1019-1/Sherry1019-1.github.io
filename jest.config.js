export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['vue', 'js', 'json'],
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  globals: {
    'vue-jest': {
      compilerOptions: {
        preserveWhitespace: false
      }
    }
  }
};