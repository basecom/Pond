import withNuxt from './.nuxt/eslint.config.mjs';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default withNuxt({
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.mjs', '**/*.vue'],
    plugins: {
        tailwindcss,
    },
    rules: {
        ...tailwindcss.configs.recommended.rules,
        'tailwindcss/no-custom-classname': 'off',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array',
            },
        ],
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                ignoreRestSiblings: true,
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
            },
        ],
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/object-curly-spacing': [2, 'always'],
        'vue/html-closing-bracket-spacing': [
            2,
            {
                selfClosingTag: 'always',
            },
        ],
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: { max: 3 },
                multiline: { max: 1 },
            },
        ],
        'vue/html-indent': ['error', 4],
        'vue/no-v-html': 'off',
        'vue/require-prop-types': 'off',
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
        'vue/mustache-interpolation-spacing': ['error', 'always'],
        semi: [2, 'always'],
        indent: ['error', 4],
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
            },
        ],
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: true,
            },
        ],
        'block-spacing': ['error', 'always'],
        'prefer-spread': 'error',
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForStatement',
                message:
                    'For loops are not allowed. Use iterable methods or for..of loops instead.',
            },
        ],
        'prefer-const': 'error',
        'prefer-template': 'error',
        eqeqeq: ['error', 'always'],
        'object-shorthand': 'error',
        'default-param-last': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'no-param-reassign': 'error',
        'prefer-arrow-callback': 'error',
        'no-else-return': 'error',
        'eol-last': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
    },
});
