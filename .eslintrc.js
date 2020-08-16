module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  plugins: [],
  extends: ["plugin:vue/vue3-essential"],

  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: [ 'off', 'single' ],
    indent: ['warn', 2],
    semi: ['warn', 'never'],
    'space-before-function-paren': ['warn', 'never'],
    'comma-spacing': ['warn', { before: false, after: true }],
    'padded-blocks': ['warn', 'never'],
    'space-in-parens': ['warn', 'never'],
    'spaced-comment': ['warn', 'always'],
    'comma-dangle': ['warn', 'never'],
    'space-infix-ops': 'warn',
    curly: ['warn', 'multi-or-nest'],
    eqeqeq: ['warn', 'smart'],
    'no-trailing-spaces': 'warn',
    'no-unused-vars': 'warn',
    'vue/require-v-for-key': 'off',
    'linebreak-style': 'off',
    'vue/no-unused-components': 'warn',
    'vue/no-unused-vars': 'warn'
  },

  parserOptions: {
    parser: 'babel-eslint'
  }
}
