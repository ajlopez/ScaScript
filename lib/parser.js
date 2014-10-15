
var sg = require('simplegrammar');
var nodes = require('./nodes');

var ClassStatement = nodes.ClassStatement,
    DefStatement = nodes.DefStatement,
    VarStatement = nodes.VarStatement,
    ValStatement = nodes.ValStatement,
    ConstantExpression = nodes.ConstantExpression,
    NameExpression = nodes.NameExpression,
    EqualExpression = nodes.EqualExpression,
    NotEqualExpression = nodes.NotEqualExpression,
    LessExpression = nodes.LessExpression,
    GreaterExpression = nodes.GreaterExpression,
    LessEqualExpression = nodes.LessEqualExpression,
    GreaterEqualExpression = nodes.GreaterEqualExpression,
    AddExpression = nodes.AddExpression,
    SubtractExpression = nodes.SubtractExpression,
    MultiplyExpression = nodes.MultiplyExpression,
    DivideExpression = nodes.DivideExpression,
    ModulusExpression = nodes.ModulusExpression;

var get = sg.get;
var peek = sg.peek;

var rules = [
    get([' ', '\t', '\r']).oneOrMore().skip(),
    get(['a-z', 'A-Z']).oneOrMore().generate('Name', function (value) { return new NameExpression(value); }),
    get(['0-9']).oneOrMore().generate('Integer', function (value) { return new ConstantExpression(parseInt(value)); }),

    // Operators
    get('+').generate('Plus'),
    get('-').generate('Minus'),
    get('*').generate('Multiply'),
    get('/').generate('Divide'),
    get('%').generate('Modulus'),
    get('==').generate('Equal'),
    get('!=').generate('NotEqual'),
    get('<=').generate('LessEqual'),
    get('<').generate('Less'),
    get('>=').generate('GreaterEqual'),
    get('>').generate('Greater'),
    get('=').generate('Assign'),
    
    // Punctuations
    get(';').generate('SemiColon'),
    get('\n').generate('NewLine'),
    get(':').generate('Colon'),
    get('{').generate('LeftBracket'),
    get('}').generate('RightBracket'),
    
    // End of Statement
    
    get(['SemiColon', 'NewLine', '']).generate('EndOfStatement'),
    
    // Var, Val Statements
    get('var', 'Name', 'Assign', 'Expression', 'EndOfStatement').generate('Statement', function (values) { return new VarStatement(values[1].getName(), null, values[3]); }),
    get('var', 'Name', 'Colon', 'Type', 'Assign', 'Expression', 'EndOfStatement').generate('Statement', function (values) { return new VarStatement(values[1].getName(), values[3].getName(), values[5]); }),
    get('val', 'Name', 'Assign', 'Expression', 'EndOfStatement').generate('Statement', function (values) { return new ValStatement(values[1].getName(), null, values[3]); }),
    get('val', 'Name', 'Colon', 'Type', 'Assign', 'Expression', 'EndOfStatement').generate('Statement', function (values) { return new ValStatement(values[1].getName(), values[3].getName(), values[5]); }),
    
    // Class
    get('class', 'Name', 'LeftBracket', 'Suite', 'RightBracket').generate('Statement', function (values) { return new ClassStatement(values[1].getName(), values[3]); }),

    // Suite
    peek('RightBracket').generate('Suite', function (values) { return []; }),
    get('Statement', 'Suite').generate('Suite', function (values) { var vals = values[1]; vals.unshift(values[0]); return vals; }),
    get('Statement').generate('Suite', function (values) { var vals = [values[0]]; return vals; }),
    
    // Def Statement
    get('def', 'Name', 'Colon', 'Type', 'Assign', 'Expression', 'EndOfStatement').generate('Statement', function (values) { return new DefStatement(values[1].getName(), values[3].getName(), values[5]); }),
    get('def', 'Name', 'Assign', 'Expression', 'EndOfStatement').generate('Statement', function (values) { return new DefStatement(values[1].getName(), null, values[3]); }),
    
    // Statement
    get('NewLine', 'Statement').generate('Statement', function (values) { return values[1];}),

    // Comparison
    get('Expression', 'Equal', 'Expression').generate('Expression', function (values) { return new EqualExpression(values[0], values[2]); }),
    get('Expression', 'NotEqual', 'Expression').generate('Expression', function (values) { return new NotEqualExpression(values[0], values[2]); }),
    get('Expression', 'LessEqual', 'Expression').generate('Expression', function (values) { return new LessEqualExpression(values[0], values[2]); }),
    get('Expression', 'GreaterEqual', 'Expression').generate('Expression', function (values) { return new GreaterEqualExpression(values[0], values[2]); }),
    get('Expression', 'Less', 'Expression').generate('Expression', function (values) { return new LessExpression(values[0], values[2]); }),
    get('Expression', 'Greater', 'Expression').generate('Expression', function (values) { return new GreaterExpression(values[0], values[2]); }),
    
    // Expression Level 1
    get('Expression1').generate('Expression'),
    get('Expression1', 'Plus', 'Expression0').generate('Expression1', function (values) { return new AddExpression(values[0], values[2]); }),
    get('Expression1', 'Minus', 'Expression0').generate('Expression1', function (values) { return new SubtractExpression(values[0], values[2]); }),
    
    // Expression Level 0
    get('Expression0').generate('Expression1'),
    get('Expression0', 'Multiply', 'Term').generate('Expression0', function (values) { return new MultiplyExpression(values[0], values[2]); }),
    get('Expression0', 'Divide', 'Term').generate('Expression0', function (values) { return new DivideExpression(values[0], values[2]); }),
    get('Expression0', 'Modulus', 'Term').generate('Expression0', function (values) { return new ModulusExpression(values[0], values[2]); }),
    
    // Type
    get('Name').generate('Type'),
    
    // Term
    get('Term').generate('Expression0'),
    get('Integer').generate('Term'),
    get('Name').generate('Term')
];

module.exports = function (text) {
    return sg.createParser(text, rules);
}
