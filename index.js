const { defineConfig } = require('eslint/config');

const path = require('path');
const importModules = require('import-modules');

const noOnlyTest = require('eslint-plugin-no-only-tests');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
    require('typescript-eslint').configs.recommended,
    {
        plugins: {
            'simple-import-sort': require('eslint-plugin-simple-import-sort'),
            'no-only-tests': noOnlyTest,
            '@stylistic': require('@stylistic/eslint-plugin'),
            '@gamechanger': {
                rules: importModules(path.resolve(__dirname, 'rules'), { camelize: false }),
            },
        },
        rules: {
            // core ESLint — typescript-eslint/recommended does NOT pull in eslint:recommended,
            // so these are doing real work.
            'object-shorthand': ['error', 'always'],
            'no-debugger': 'error',

            // @stylistic — layout rules Prettier does not cover. New home for the deprecated core
            // `lines-between-class-members`; config-prettier leaves this one on, so it stays active.
            '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

            // simple-import-sort (replaces core sort-imports for TS)
            'simple-import-sort/imports': 'error',

            // no-only-tests
            'no-only-tests/no-only-tests': [
                'error',
                {
                    // describeApi and scenario for new route testing helper
                    block: ['describeApi', 'scenario'].concat(
                        noOnlyTest.rules['no-only-tests'].meta.schema[0].properties.block.default,
                    ),
                },
            ],

            // @typescript-eslint — overrides of rules that `recommended` turns ON
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off', // our common empty-interface pattern
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unused-expressions': 'off', // recommended=error; would flag chai assertions

            // @typescript-eslint — pre-staged opt-outs for the planned `strict`/`stylistic` adoption.
            // Inert under `recommended` alone; kept so that migration doesn't surface these as new errors.
            '@typescript-eslint/no-non-null-assertion': 'off', // strict
            '@typescript-eslint/no-inferrable-types': 'off', // stylistic
            '@typescript-eslint/no-empty-function': 'off', // stylistic

            // @gamechanger
            '@gamechanger/capitalize-star-imports': 'error',
        },
    },
    // Registers the `prettier` plugin, sets `prettier/prettier: error`, and (via eslint-config-prettier)
    // turns off core/stylistic rules that conflict with Prettier. Placed AFTER the main block so those
    // opt-outs win, and BEFORE the `.js` block so `.js` keeps `prettier/prettier: off`.
    // NOTE: this also turns OFF `arrow-body-style` and `prefer-arrow-callback` (known prettier autofix conflicts).
    prettierRecommended,
    {
        files: ['**/*.js'],
        rules: {
            // this plugin cant sort require() hence fallback to default sort
            'simple-import-sort/imports': 'off',
            'sort-imports': ['error'],
            'prettier/prettier': 'off',
        },
    },
    {
        files: ['**/package.json'],
        languageOptions: {
            parser: require('jsonc-eslint-parser'),
        },
        plugins: {
            'package-json': require('eslint-plugin-package-json'),
        },
        rules: {
            'package-json/restrict-dependency-ranges': [
                'error',
                {
                    rangeType: 'pin',
                },
            ],
        },
    },
]);
