
var p = require('../lib/parser');

exports['parse name'] = function (test) {
    var parser = p('name');
    
    var result = parser.parse('Name');

    test.ok(result);
    test.equal(result.value, 'name');
    
    test.equal(parser.parse('Name'), null);
};

