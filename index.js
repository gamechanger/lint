const path = require('path');
const importModules = require('import-modules');
const noOnlyTest = require('eslint-plugin-no-only-tests');

module.exports = {
    rules: importModules(path.resolve(__dirname, 'rules'), { camelize: false }),
    configs: {
        recommended: {
            parser: '@typescript-eslint/parser',
            plugins: [
                'prettier', //
                '@typescript-eslint',
                'es',
                'simple-import-sort',
                'no-only-tests',
                'import',
                '@gamechanger',
            ],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:import/recommended',
                'plugin:import/typescript',
                'plugin:prettier/recommended',
                'prettier',
            ],
            env: {
                es6: true,
            },
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            rules: {
                // default
                'array-element-newline': ['error', 'consistent'],
                'arrow-body-style': ['error', 'as-needed'],
                'object-shorthand': ['error', 'always'],
                'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
                'no-debugger': 'error',

                // prettier
                'prettier/prettier': 'error',

                // @typescript-eslint
                '@typescript-eslint/camelcase': 'off',
                '@typescript-eslint/class-name-casing': 'off',
                '@typescript-eslint/no-use-before-define': 'off',
                '@typescript-eslint/no-inferrable-types': 'off',
                '@typescript-eslint/implicit-arrow-linebreak': 'off',
                '@typescript-eslint/no-unused-vars': [
                    'off',
                    {
                        argsIgnorePattern: '^[_a]',
                        varsIgnorePattern: '^[_a]',
                    },
                ],

                // es
                'es/no-object-assign': 'error',

                // simple-import-sort
                // imports are enforced via simple import sort plugin
                // so disable default sort-imports
                'simple-import-sort/imports': 'error',
                'sort-imports': 'off',

                // import plugin rules
                'import/no-unresolved': 'off',
                'import/namespace': 'off',
                'import/export': 'off',

                // no-only-tests
                'no-only-tests/no-only-tests': [
                    'error', {
                        // describeApi and scenario for new route testing helper
                        'block': ['describeApi', 'scenario'].concat(noOnlyTest.rules['no-only-tests'].meta.schema[0].properties.block.default)
                    }
                ],
                // @typescript-eslint
                '@typescript-eslint/no-empty-interface': 'off',
                '@typescript-eslint/no-empty-function': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',

                // @gamechanger
                '@gamechanger/capitalize-star-imports': 'error',
            },
            overrides: [
                {
                    files: '*.js',
                    rules: {
                        // this plugin cant sort require() hence fallback to default sort
                        'simple-import-sort/imports': 'off',
                        'sort-imports': ['error'],
                        '@typescript-eslint/no-var-requires': 'off',
                    },
                },
                {
                    extends: ['plugin:package-json/legacy-recommended'],
                    files: ['package.json'],
                    parser: 'jsonc-eslint-parser',
                    rules: {
                        'package-json/restrict-dependency-ranges': [
                            'error',
                            {
                                rangeType: 'pin',
                            },
                        ],
                    },
                },
            ],
        },
    },
};
