/*
 Replacement for operators to handle fractions or numbers.
 */
function add(a, b) {
    if (a.add) {
        return a.add(b);
    } else if (b.add) {
        return b.add(a);
    } else {
        return a + b;
    }
}

function sub(a, b) {
    if (a.sub) {
        return a.sub(b);
    } else if (b.add && b.neg) {
        return b.neg().add(a);
    } else {
        return a - b;
    }
}

function mul(a, b) {
    if (a.mul) {
        return a.mul(b);
    } else if (b.mul) {
        return b.mul(a);
    } else {
        return a * b;
    }
}

function div(a, b) {
    if (a.div) {
        return a.div(b);
    } else if (b.inv && b.mul) {
        return b.inv().mul(a);
    } else {
        return a / b;
    }
}

function abs(a) {
    if (a.abs) {
        return a.abs();
    } else {
        return Math.abs(a);
    }
}

function neg(a) {
    if (a.neg) {
        return a.neg();
    } else {
        return -a;
    }
}

function inv(a) {
    if (a.inv) {
        return a.inv();
    } else {
        return 1 / a;
    }
}

function sign(a) {
    if (a.sign) {
        return a.sign();
    } else {
        return Math.sign(a);
    }
}

function eq(a, b) {
    if (a.eq) {
        return a.eq(b);
    } else if (b.eq) {
        return b.eq(a);
    } else {
        return a === b;
    }
}

function ne(a, b) {
    if (a.ne) {
        return a.ne(b);
    } else if (b.ne) {
        return b.ne(a);
    } else {
        return a !== b;
    }
}

function lt(a, b) {
    if (a.lt) {
        return a.lt(b);
    } else if (b.gt) {
        return b.gt(a);
    } else {
        return a < b;
    }
}

function le(a, b) {
    if (a.le) {
        return a.le(b);
    } else if (b.ge) {
        return b.ge(a);
    } else {
        return a <= b;
    }
}

function gt(a, b) {
    if (a.gt) {
        return a.gt(b);
    } else if (b.lt) {
        return b.lt(a);
    } else {
        return a > b;
    }
}

function ge(a, b) {
    if (a.ge) {
        return a.ge(b);
    } else if (b.le) {
        return b.le(a);
    } else {
        return a >= b;
    }
}

export { add, sub, mul, div, inv, abs, neg, sign, eq, ne, lt, le, gt, ge};