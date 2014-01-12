
var sg = require('simplegrammar');

var get = sg.get;
var peek = sg.peek;

var rules = [
    get('a-z').oneOrMore().generate('Name')
];

module.exports = function (text) {
    return sg.createParser(text, rules);
}