// http://eslint.org/docs/user-guide/configuring

export default {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended"
  ],
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'espree', // <-
    ecmaVersion: 2022, // <-
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  // add your custom rules here
  rules: {
    'arrow-parens': 0,
    'comma-dangle': [ 'warn', 'never' ],
    'comma-spacing': [ 'warn', { 'before': false, 'after': true } ],
    'curly': [ 'warn', 'multi-or-nest', 'consistent' ],
    'eqeqeq': [ 'warn', 'smart' ],
    'generator-star-spacing': 0,
    'indent': [ 'warn', 2, { "SwitchCase": 1 } ],
    'linebreak-style': 'off',
    'lines-around-comment': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-multi-spaces': 'off',
    'no-multiple-empty-lines': 'warn',
    'no-trailing-spaces': 'warn',
    'no-unused-vars': 'warn',
    'object-curly-spacing': 'off',
    'padded-blocks': 'off', //[ 'warn', 'never' ],
    'quotes': [ 'off', 'single' ],
    'semi': [ 'warn', 'never' ],
    'space-before-function-paren': [ 'warn', 'never' ],
    'space-in-parens': [ 'warn', 'never' ],
    'space-infix-ops': 'warn',
    'spaced-comment': [ 'warn', 'always' ],
    'vue/attributes-order': 'warn',
    'vue/no-unused-vars': 'off',
    'vue/require-v-for-key': 'warn',
    'vue/script-setup-uses-vars': 'error',
  }
}
