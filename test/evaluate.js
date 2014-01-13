
var p = require('../lib/parser'),
    c = require('../lib/context');

function evaluate(text, ctx) {
    var parser = p(text);
    var expr = parser.parse('Expression');
    return expr.value.evaluate(ctx);
}

exports['evaluate integer'] = function (test) {
    test.strictEqual(evaluate('3'), 3);
};

exports['evaluate variable'] = function (test) {
    var ctx = c();
    ctx.setLocalValue('one', 1);
    test.strictEqual(evaluate('one', ctx), 1);
};

exports['evaluate arithmetic expressions using integers'] = function (test) {
    test.strictEqual(evaluate('1+1'), 2);
    test.strictEqual(evaluate('2+3*4'), 2 + 3 * 4);
    test.strictEqual(evaluate('3 - 5'), 3 - 5);
};

