
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

exports['evaluate arithmetic expressions using variables'] = function (test) {
    var ctx = c();
    ctx.setLocalValue('one', 1);
    ctx.setLocalValue('two', 2);
    ctx.setLocalValue('three', 3);
    test.strictEqual(evaluate('one+one', ctx), 2);
    test.strictEqual(evaluate('two+three*three', ctx), 2 + 3 * 3);
    test.strictEqual(evaluate('three - one', ctx), 3 - 1);
};

exports['evaluate comparisons using integers'] = function (test) {
    test.strictEqual(evaluate('1==1'), true);
    test.strictEqual(evaluate('1==2'), false);
    test.strictEqual(evaluate('1!=1'), false);
    test.strictEqual(evaluate('1!=2'), true);
    test.strictEqual(evaluate('1>1'), false);
    test.strictEqual(evaluate('2>1'), true);
    test.strictEqual(evaluate('1<1'), false);
    test.strictEqual(evaluate('1<2'), true);
    test.strictEqual(evaluate('1>=1'), true);
    test.strictEqual(evaluate('2>=3'), false);
    test.strictEqual(evaluate('1<=1'), true);
    test.strictEqual(evaluate('1<=0'), false);
};
