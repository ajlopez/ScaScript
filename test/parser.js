
var p = require('../lib/parser');

exports['Parse name'] = function (test) {
    var parser = p('name');
    
    var result = parser.parse('Name');

    test.ok(result);
    test.equal(result.value, 'name');
    
    test.equal(parser.parse('Name'), null);
};

exports['Parse name with mixed case'] = function (test) {
    var parser = p('Int');
    
    var result = parser.parse('Name');

    test.ok(result);
    test.equal(result.value, 'Int');
    
    test.equal(parser.parse('Name'), null);
};

exports['Parse integer'] = function (test) {
    var parser = p('123');
    
    var result = parser.parse('Integer');

    test.ok(result);
    test.equal(result.value, '123');
    
    test.equal(parser.parse('Integer'), null);
};