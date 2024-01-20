module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["./next*", "**/*.js", "**/*.cjs", "package-lock.json"],
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "tailwindcss",
    "jsdoc",
    "import",
  ],
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "plugin:jsdoc/recommended-typescript-error",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "react/jsx-no-useless-fragment": "error",
    "react/self-closing-comp": "error",
    "@typescript-eslint/require-await": "error",
    "require-await": "error",
    "@typescript-eslint/no-misused-promises": "off",
    "no-implicit-coercion": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "prefer-template": "error",
    "import/newline-after-import": "error",
    "react/jsx-pascal-case": "error",
    "jsdoc/tag-lines": "off",
    "jsdoc/no-types": "off",
    "object-shorthand": "error",
    "no-magic-numbers": "error",

    // import文の順序修正
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        // alphabetize: {
        //   order: "asc",
        // },
        "newlines-between": "always",
      },
    ],

    // JSDOCの記述を強制
    "jsdoc/require-param": [
      "error",
      {
        checkDestructuredRoots: false,
      },
    ],
    "jsdoc/check-param-names": [
      "error",
      {
        checkDestructured: false,
      },
    ],
    "jsdoc/require-jsdoc": [
      "error",
      {
        publicOnly: true,
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true,
        },
      },
    ],
    "jsdoc/require-returns": "off",
    "jsdoc/require-returns-description": "off",
    "jsdoc/require-description": "error",
  },
};
