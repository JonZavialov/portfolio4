module.exports = {
  'extends': ['airbnb', 'prettier'],
  'plugins': ['prettier', 'unicorn'],
  'rules': {
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'func-names': 'off',
    'no-unused-expressions': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'curly': ['error', 'multi'],
    'no-loop-func': 'off',
    'no-alert': 'off',
    'unicorn/prefer-ternary': 'error',
  },
};
