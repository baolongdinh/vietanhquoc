module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'vue/multi-word-component-names': 'off', // cho phép tên component 1 từ
    'no-unused-vars': 'warn',
    'no-undef': 'off' // tắt rule undefined vì Vue macros xử lý rồi
  },
  settings: {
    'vue/setup-compiler-macros': true
  }
}
