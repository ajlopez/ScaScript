
var p = require('../lib/parser'),
    c = require('../lib/context');

exports['Parse name'] = function (test) {
    var parser = p('name');
    
    var result = parser.parse('Name');

    test.ok(result);
    test.equal(result.value.getName(), 'name');
    
    test.equal(parser.parse('Name'), null);
};

exports['Parse name skipping spaces'] = function (test) {
    var parser = p('   name  ');
    
    var result = parser.parse('Name');

    test.ok(result);
    test.equal(result.value.getName(), 'name');
    
    test.equal(parser.parse('Name'), null);
};

exports['Parse name with mixed case'] = function (test) {
    var parser = p('Int');
    
    var result = parser.parse('Name');

    test.ok(result);
    test.equal(result.value.getName(), 'Int');
    
    test.equal(parser.parse('Name'), null);
};

exports['Parse integer'] = function (test) {
    var parser = p('123');
    
    var result = parser.parse('Integer');

    test.ok(result);
    test.ok(result.value);
    test.strictEqual(result.value.evaluate(), 123);
    
    test.equal(parser.parse('Integer'), null);
};

exports['Parse add integer expression and evaluate it'] = function (test) {
    var parser = p('123+456');
    
    var result = parser.parse('Expression');

    test.ok(result);
    test.ok(result.value);
    test.strictEqual(result.value.evaluate(), 123 + 456);
    
    test.equal(parser.parse('Expression'), null);
};

exports['Parse subtract integer expression and evaluate it'] = function (test) {
    var parser = p('123-456');
    
    var result = parser.parse('Expression');

    test.ok(result);
    test.ok(result.value);
    test.strictEqual(result.value.evaluate(), 123 - 456);
    
    test.equal(parser.parse('Expression'), null);
};

exports['Parse multiply integer expression and evaluate it'] = function (test) {
    var parser = p('123*456');
    
    var result = parser.parse('Expression');

    test.ok(result);
    test.ok(result.value);
    test.strictEqual(result.value.evaluate(), 123 * 456);
    
    test.equal(parser.parse('Expression'), null);
};

exports['Parse divide integer expression and evaluate it'] = function (test) {
    var parser = p('123/456');
    
    var result = parser.parse('Expression');

    test.ok(result);
    test.ok(result.value);
    test.strictEqual(result.value.evaluate(), 123 / 456);
    
    test.equal(parser.parse('Expression'), null);
};

exports['Parse arithmetic expression using operator precedence'] = function (test) {
    var parser = p('2 + 3*4');
    
    var result = parser.parse('Expression');

    test.ok(result);
    test.ok(result.value);
    test.strictEqual(result.value.evaluate(), 2 + 3 * 4);
    
    test.equal(parser.parse('Expression'), null);
};

exports['Parse arithmetic expression using variable and operator precedence'] = function (test) {
    var parser = p('two + 3*4');
    var ctx = c();
    ctx.setLocalValue('two', 2);
    
    var result = parser.parse('Expression');

    test.ok(result);
    test.ok(result.value);
    test.strictEqual(result.value.evaluate(ctx), 2 + 3 * 4);
    
    test.equal(parser.parse('Expression'), null);
};

exports['Parse var statement'] = function (test) {
    var parser = p('var a = 1');
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'a');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 1);
};

exports['Parse var statement with semicolon'] = function (test) {
    var parser = p('var a = 1;');
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'a');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 1);
    
    test.equal(parser.next(), null);
};

exports['Parse val statement'] = function (test) {
    var parser = p('val a = 1');
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'a');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 1);
};

exports['Parse val statement with semicolon'] = function (test) {
    var parser = p('val a = 1;');
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'a');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 1);
    
    test.equal(parser.next(), null);
};

exports['Parse two val statements in two lines'] = function (test) {
    var parser = p('val a = 1\r\nval b = 2');
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'a');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 1);
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'b');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 2);
    
    test.equal(parser.next(), null);
};

exports['Parse two val statements separated by semicolon'] = function (test) {
    var parser = p('val a = 1; val b = 2');
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'a');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 1);
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'b');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 2);
    
    test.equal(parser.next(), null);
};

exports['Parse two var statements in two lines'] = function (test) {
    var parser = p('var a = 1\r\nvar b = 2');
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'a');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 1);
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'b');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 2);
    
    test.equal(parser.next(), null);
};

exports['Parse two var statements separated by semicolon'] = function (test) {
    var parser = p('var a = 1; var b = 2');
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'a');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 1);
    
    var result = parser.parse('Statement');
    
    test.ok(result);
    test.ok(result.value);
    test.equal(result.value.getName(), 'b');
    test.ok(result.value.getExpression());
    test.equal(result.value.getExpression().evaluate(), 2);
    
    test.equal(parser.next(), null);
};
