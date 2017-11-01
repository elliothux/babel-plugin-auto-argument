

module.exports = function ({types: t}) {

    function CallExpressionVisitor(path) {
        const arguments = path.node.arguments;
        if (arguments.length === 1 && arguments[0].type === 'BinaryExpression') {
            const argument = arguments[0];
            const hasBinding = hasUnderscore(argument.left, path) || hasUnderscore(argument.right, path);
            if (hasBinding) {
                arguments[0] = t.arrowFunctionExpression(
                    [t.identifier('_')],
                    argument
                )
            }
        }

        function hasUnderscore(node, path) {
            // console.log(path.scope.hasBinding("_"));
            // console.log(path.scope.hasOwnBinding("_"));
            if (node.type === 'BinaryExpression')
                return hasUnderscore(node.left, path) || hasUnderscore(node.right, path);
            else if (node.type === 'Identifier' && node.name === '_')
                return true;
            return false
        }
    }

    return {
        visitor: {
            // ArrowFunctionExpression: ArrowFunctionVisitor,
            CallExpression: CallExpressionVisitor
        }
    }
};
