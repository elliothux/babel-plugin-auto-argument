

module.exports = function ({types: t}) {
    let variableName = '_';

    function CallExpressionVisitor(path) {
        variableName = this.opts && this.opts.variableName || variableName;

        const arguments = path.node.arguments;
        if (arguments.length !== 1) return;
        if (hasUnderscore(arguments[0])) {
            arguments[0] = t.arrowFunctionExpression(
                [t.identifier(variableName)],
                arguments[0]
            )
        }


        function hasUnderscore(node, path) {
            if (Array.isArray(node))
                return node.map(n => hasUnderscore(n, path)).filter(n => n).length > 0;
            else if (node.type === 'CallExpression')
                return hasUnderscore(node.callee, path) || hasUnderscore(node.arguments, path);
            else if (node.type === 'MemberExpression')
                return hasUnderscore(node.object, path) || hasUnderscore(node.property, path);
            else if (node.type === 'BinaryExpression')
                return hasUnderscore(node.left, path) || hasUnderscore(node.right, path);
            else if (node.type === 'Identifier' && node.name === variableName)
                return true;
            return false
        }
    }

    return {
        visitor: {
            CallExpression: CallExpressionVisitor
        }
    }
};
