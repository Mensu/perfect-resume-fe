module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 8,
  },
  env: {
    browser: true,
  },
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never',
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'error',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'semi': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': ['error', { functions: false }],
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'warn',
    'no-continue': 'off',
    'no-break': 'off',
    'camelcase': 'off',
    'no-console': 'off',
    'object-curly-newline': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-multi-spaces': 'off',
  },
}