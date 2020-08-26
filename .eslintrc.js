module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es6: true
  },

  extends: [
    "eslint:recommended"
  ],

  parserOptions: {
    'ecmaVersion': 2020,
    'parser': 'babel-eslint',
    'sourceType': 'module',
    'allowImportExportEverywhere': true
  },
  
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': ['off', 'single'],
    'indent': ['warn', 2],
    'semi': ['warn', 'never'],
    'space-before-function-paren': ['warn', 'never'],
    'comma-spacing': ['warn', {
      'before': false,
      'after': true
    }],
    'padded-blocks': ['warn', 'never'],
    'space-in-parens': ['warn', 'never'],
    'spaced-comment': ['warn', 'always'],
    'comma-dangle': ['warn', 'never'],
    'space-infix-ops': 'warn',
    'curly': ['warn', 'multi-or-nest'],
    'eqeqeq': ['warn', 'smart'],
    'no-trailing-spaces': 'warn',
    'no-unused-vars': 'warn',
    'linebreak-style': 'off',
  }
}
