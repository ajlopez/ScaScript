
var sg = require('simplegrammar');

var get = sg.get;
var peek = sg.peek;

function ConstantExpression(value) {
    this.evaluate = function () { return value }
}

function NameExpression(name) {
    this.evaluate = function (context) {
        return context.getLocalValue(name);
    };
    
    this.getName = function () { return name; }
}

function EqualExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) == right.evaluate(context);
    };
}

function NotEqualExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) != right.evaluate(context);
    };
}

function LessExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) < right.evaluate(context);
    };
}

function GreaterExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) > right.evaluate(context);
    };
}

function LessEqualExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) <= right.evaluate(context);
    };
}

function GreaterEqualExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) >= right.evaluate(context);
    };
}

function AddExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) + right.evaluate(context);
    };
}

function SubtractExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) - right.evaluate(context);
    };
}

function MultiplyExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) * right.evaluate(context);
    };
}

function DivideExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) / right.evaluate(context);
    };
}

var rules = [
    get([' ', '\t', '\r', '\n']).oneOrMore().skip(),
    get(['a-z', 'A-Z']).oneOrMore().generate('Name', function (value) { return new NameExpression(value); }),
    get(['0-9']).oneOrMore().generate('Integer', function (value) { return new ConstantExpression(parseInt(value)); }),

    // Operators
    get('+').generate('Plus'),
    get('-').generate('Minus'),
    get('*').generate('Multiply'),
    get('/').generate('Divide'),
    get('==').generate('Equal'),
    get('!=').generate('NotEqual'),
    get('<=').generate('LessEqual'),
    get('<').generate('Less'),
    get('>=').generate('GreaterEqual'),
    get('>').generate('Greater'),

    // Comparison
    get('Expression', 'Equal', 'Expression').generate('Expression', function (values) { return new EqualExpression(values[0], values[2]); }),
    get('Expression', 'NotEqual', 'Expression').generate('Expression', function (values) { return new NotEqualExpression(values[0], values[2]); }),
    get('Expression', 'LessEqual', 'Expression').generate('Expression', function (values) { return new LessEqualExpression(values[0], values[2]); }),
    get('Expression', 'GreaterEqual', 'Expression').generate('Expression', function (values) { return new GreaterEqualExpression(values[0], values[2]); }),
    get('Expression', 'Less', 'Expression').generate('Expression', function (values) { return new LessExpression(values[0], values[2]); }),
    get('Expression', 'Greater', 'Expression').generate('Expression', function (values) { return new GreaterExpression(values[0], values[2]); }),
    
    // Expression Level 1
    get('Expression1').generate('Expression'),
    get('Expression1', 'Plus', 'Expression0').generate('Expression1', function (values) { return new AddExpression(values[0], values[2]); }),
    get('Expression1', 'Minus', 'Expression0').generate('Expression1', function (values) { return new SubtractExpression(values[0], values[2]); }),
    
    // Expression Level 0
    get('Expression0').generate('Expression1'),
    get('Expression0', 'Multiply', 'Term').generate('Expression0', function (values) { return new MultiplyExpression(values[0], values[2]); }),
    get('Expression0', 'Divide', 'Term').generate('Expression0', function (values) { return new DivideExpression(values[0], values[2]); }),
    
    // Term
    get('Term').generate('Expression0'),
    get('Integer').generate('Term'),
    get('Name').generate('Term')
];

module.exports = function (text) {
    return sg.createParser(text, rules);
}