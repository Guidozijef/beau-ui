/**
 * off | 0 : 表示不验证规则
 * warn | 1 : 表示验证规则，当不满足时，给警告
 * error | 2 : 表示验证规则，不满足时报错
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    // 缩进4个空格
    indent: [0, 4],
    // 不加分号
    semi: 0,
    camelcase: 0,
    "no-tabs": 0,
    "no-mixed-spaces-and-tabs": 0,
    "no-unused-expressions": 0,
    "no-undef": 0,
    "no-trailing-spaces": 0,
  },
  parserOptions: {
    sourceType: "module",
  },
  parser: "vue-eslint-parser",
};
