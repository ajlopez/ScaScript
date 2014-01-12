
var sg = require('simplegrammar');

var get = sg.get;
var peek = sg.peek;

var rules = [
    get(['a-z', 'A-Z']).oneOrMore().generate('Name'),
    get(['0-9']).oneOrMore().generate('Integer')
];

module.exports = function (text) {
    return sg.createParser(text, rules);
}