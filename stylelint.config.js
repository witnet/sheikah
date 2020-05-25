module.exports = {
  extends: [
    // Use the Standard config as the base
    // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-standard',
    // Enforce a standard order for CSS properties
    // Override rules that would interfere with Prettier
    // https://github.com/shannonmoeller/stylelint-config-prettier
    'stylelint-config-prettier',
    // Override rules to allow linting of CSS modules
    // https://github.com/pascalduez/stylelint-config-css-modules
    'stylelint-config-css-modules',
  ],
  plugins: [
    // Bring in some extra rules for SCSS
    'stylelint-scss',
    'stylelint-order',
  ],
  // Rule lists:
  // - https://stylelint.io/user-guide/rules/
  // - https://github.com/kristerkari/stylelint-scss#list-of-rules
  rules: {
    'max-empty-lines': 1,
    'value-list-max-empty-lines': 1,
    'no-descending-specificity': null,
    'rule-empty-line-before': [
      'always',
      { except: ['after-single-line-comment', 'first-nested'] },
    ],
    'font-family-no-missing-generic-family-keyword': null,
    // Allow newlines inside class attribute values
    'string-no-newline': null,
    // Enforce camelCase for classes and ids, to work better
    // with CSS modules
    // 'selector-class-pattern': /^[a-z][a-zA-Z]*(-(enter|leave)(-(active|to))?)?$/,
    // 'selector-id-pattern': /^[a-z][a-zA-Z]*$/,
    // Limit the number of universal selectors in a selector,
    // to avoid very slow selectors
    'selector-max-universal': 1,
    // Disallow allow global element/type selectors in scoped modules
    'selector-max-type': [0, { ignore: ['child', 'descendant', 'compounded'] }],
    // ===
    // SCSS
    // ===
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/selector-no-redundant-nesting-selector': true,
    // Allow SCSS and CSS module keywords beginning with `@`
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // ===
    // ORDER
    // ===
    'order/properties-alphabetical-order': true,
  },
}
