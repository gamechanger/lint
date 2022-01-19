module.exports = {
    meta: {
        type: 'problem',
        hasSuggestions: true,
        docs: {
            description: 'Enforces naming conventions for star imports.',
            category: 'Best Practices',
            recommended: true,
            url: __filename,
        },
        schema: [], // no options
    },
    create: context => ({
        ImportNamespaceSpecifier(node) {
            const importName = node.local.name;
            const [firstLetter, ...otherLetters] = importName;
            const capitalizedFirstLetter = firstLetter.toUpperCase();

            if (firstLetter === capitalizedFirstLetter) {
                return;
            }

            if (importName === '_') {
                return;
            }

            const correctedName = [capitalizedFirstLetter, ...otherLetters].join('');

            context.report({
                node,
                message: `All namespace (star) imports must be capitalized, ${importName} is not.`,
                suggest: [
                    {
                        desc: `Rename ${importName} to ${correctedName}`,
                        fix: fixer => fixer.replaceText(node, `* as ${correctedName}`),
                    },
                ],
            });
        },
    }),
};
