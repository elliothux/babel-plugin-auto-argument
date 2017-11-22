

module.exports = function ({types: t}) {
    let variableName = '_';

    function CallExpressionVisitor(path) {
        variableName = this.opts && this.opts.variableName || variableName;

        const arguments = path.node.arguments;
        if (arguments.length === 1 && arguments[0].type === 'BinaryExpression') {
            const argument = arguments[0];
            const hasBinding = hasUnderscore(argument.left, path) || hasUnderscore(argument.right, path);
            if (hasBinding) {
                arguments[0] = t.arrowFunctionExpression(
                    [t.identifier(variableName)],
                    argument
                )
            }
        }
        if (arguments.length === 1 && arguments[0].type === 'CallExpression') {
            const argument = arguments[0];
            const hasBinding = hasUnderscoreCall(argument, path);
            if (hasBinding) {
                arguments[0] = t.arrowFunctionExpression(
                    [t.identifier(variableName)],
                    argument
                )
            }
        }
        if (arguments.length === 1 &&
            arguments[0].type === 'MemberExpression' &&
                hasUnderscore(arguments[0], path)) {
            const expression = arguments[0];
            arguments[0] = t.arrowFunctionExpression(
                [t.identifier(variableName)],
                t.conditionalExpression(
                    t.binaryExpression(
                        '===',
                        t.unaryExpression('typeof', expression),
                        t.stringLiteral('function')
                    ),
                    t.callExpression(
                        expression,
                        [t.identifier('arguments')]
                    ),
                    expression
                )
            )
        }

        function hasUnderscore(node, path) {
            // console.log(path.scope.hasBinding("_"));
            // console.log(path.scope.hasOwnBinding("_"));
            if (node.type === 'BinaryExpression')
                return hasUnderscore(node.left, path) || hasUnderscore(node.right, path);
            else if (node.type === 'Identifier' && node.name === variableName)
                return true;
            else if (node.type === 'MemberExpression' &&
                node.object.type === 'Identifier' &&
                node.object.name === variableName
            ) return true;
            return false
        }

        function hasUnderscoreCall(node, path) {
            const { callee, arguments } = node;
            if (callee.type === 'MemberExpression')
                if (hasUnderscore(callee, path))
                    return true;
            if (arguments.length === 0 && hasUnderscore(arguments[0]))
                return true;
            return false;
        }
    }

    return {
        visitor: {
            CallExpression: CallExpressionVisitor
        }
    }
};
