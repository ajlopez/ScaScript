
var context = require('../lib/context');

exports['Create empty context'] = function (test) {
    var ctx = context();
    
    test.ok(ctx);
    test.equal(ctx.getLocalValue('foo'), null);
    test.strictEqual(ctx.hasLocalValue('foo'), false);
}

exports['Set and get local value'] = function (test) {
    var ctx = context();
    
    test.ok(ctx);
    ctx.setLocalValue('foo', 42);
    test.equal(ctx.getLocalValue('foo'), 42);
    test.strictEqual(ctx.hasLocalValue('foo'), true);
}