
var sg = require('simplegrammar');

var get = sg.get;
var peek = sg.peek;

function ConstantExpression(value) {
    this.evaluate = function () { return value }
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
    get(['a-z', 'A-Z']).oneOrMore().generate('Name'),
    get(['0-9']).oneOrMore().generate('Integer', function (value) { return new ConstantExpression(parseInt(value)); }),

    // Operators
    get('+').generate('Plus'),
    get('-').generate('Minus'),
    get('*').generate('Multiply'),
    get('/').generate('Divide'),
    
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