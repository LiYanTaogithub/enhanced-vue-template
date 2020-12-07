module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-rational-order",
    "stylelint-config-prettier",
  ],
  "plugins": ["stylelint-scss", "stylelint-declaration-block-no-ignored-properties"],
  
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["mixin", "include"]
    }],
    'function-calc-no-invalid': null,
    'font-family-no-missing-generic-family-keyword': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export']
      }
    ],
  }
}