
function ClassStatement(name, stmts) {
    this.getName = function () { return name; }
    
    this.getStatements = function () { return stmts; }
}

function DefStatement(name, type, expr) {
    this.getName = function () { return name; }
    
    this.getType = function () { return type; }
    
    this.getExpression = function () { return expr; }
}

function VarStatement(name, type, expr) {
    this.getName = function () { return name; };

    this.getExpression = function () { return expr; };
    
    this.getType = function () { return type; };
    
    this.execute = function (ctx) {
        ctx.setLocalValue(name, expr.evaluate(ctx));
    }
}

function ValStatement(name, type, expr) {
    this.getName = function () { return name; };

    this.getExpression = function () { return expr; };
        
    this.getType = function () { return type; };
    
    this.execute = function (ctx) {
        ctx.setLocalValue(name, expr.evaluate(ctx));
    }
}

function ConstantExpression(value) {
    this.evaluate = function () { return value }
}

function NameExpression(name) {
    this.evaluate = function (context) {
        return context.getLocalValue(name);
    };
    
    this.getName = function () { return name; }
}

function EqualExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) == right.evaluate(context);
    };
}

function NotEqualExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) != right.evaluate(context);
    };
}

function LessExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) < right.evaluate(context);
    };
}

function GreaterExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) > right.evaluate(context);
    };
}

function LessEqualExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) <= right.evaluate(context);
    };
}

function GreaterEqualExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) >= right.evaluate(context);
    };
}

function AddExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) + right.evaluate(context);
    };
}

function SubtractExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) - right.evaluate(context);
    };
}

function MultiplyExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) * right.evaluate(context);
    };
}

function DivideExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) / right.evaluate(context);
    };
}

function ModulusExpression(left, right) {
    this.evaluate = function (context) {
        return left.evaluate(context) % right.evaluate(context);
    };
}

module.exports = {
    ClassStatement: ClassStatement,
    DefStatement: DefStatement,
    VarStatement: VarStatement,
    ValStatement: ValStatement,
    ConstantExpression: ConstantExpression,
    NameExpression: NameExpression,
    EqualExpression: EqualExpression,
    NotEqualExpression: NotEqualExpression,
    LessExpression: LessExpression,
    GreaterExpression: GreaterExpression,
    LessEqualExpression: LessEqualExpression,
    GreaterEqualExpression: GreaterEqualExpression,
    AddExpression: AddExpression,
    SubtractExpression: SubtractExpression,
    MultiplyExpression: MultiplyExpression,
    DivideExpression: DivideExpression,
    ModulusExpression: ModulusExpression
};
