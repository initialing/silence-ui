module.exports = {
    root: true,
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
    },
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-recommended",
        "prettier",
    ],
    rules: {
        "@typescript-eslint/no-var-requires": "off",

        "prettier/prettier": [
            "error",
            {
                semi: true,
                singleQuote: false,
                tabWidth: 4,
            },
        ],
        "vue/comment-directive": "off",
    },
};
