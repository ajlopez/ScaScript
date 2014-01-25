
var p = require('../lib/parser'),
    c = require('../lib/context');

function execute(text, ctx) {
    var parser = p(text);
    var statement = parser.parse('Statement');
    return statement.value.execute(ctx);
}

exports['execute var statement'] = function (test) {
    var ctx = c();
    execute('var a = 1', ctx);
    test.strictEqual(ctx.getLocalValue('a'), 1);
};

exports['execute val statement'] = function (test) {
    var ctx = c();
    execute('val a = 1', ctx);
    test.strictEqual(ctx.getLocalValue('a'), 1);
};


