const Module = require('module');

const package = require('./package.json');

// Hack Node module system to recognize our custom rules.
// https://github.com/eslint/eslint/issues/8769
Module._resolveFilename = (original =>
    function (request, _requester) {
        if (request === package.name) {
            return require.resolve('./');
        } else {
            return original.apply(this, arguments);
        }
    })(Module._resolveFilename);

module.exports = {
    extends: [`plugin:${package.name}/recommended`],
};
