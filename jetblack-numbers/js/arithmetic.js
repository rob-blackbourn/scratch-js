(function(context) {
  "use strict";

  function Arithmetic() {
  }

  Arithmetic.add = function(a, b) {
    if (a.add) {
      return a.add(b);
    } else if (b.add) {
      return b.add(a);
    } else {
      return a + b;
    }
  };

  Arithmetic.sub = function(a, b) {
    if (a.sub) {
      return a.sub(b);
    } else if (b.add && b.neg) {
      return b.neg().add(a);
    } else {
      return a - b;
    }
  };

  Arithmetic.mul = function(a, b) {
    if (a.mul) {
      return a.mul(b);
    } else if (b.mul) {
      return b.mul(a);
    } else {
      return a * b;
    }
  };

  Arithmetic.div = function(a, b) {
    if (a.div) {
      return a.div(b);
    } else if (b.inv && b.mul) {
      return b.inv().mul(a);
    } else {
      return a / b;
    }
  };

  Arithmetic.abs = function(a) {
    if (a.abs) {
      return a.abs();
    } else {
      return Math.abs(a);
    }
  };

  Arithmetic.neg = function(a) {
    if (a.neg) {
      return a.neg();
    } else {
      return -a;
    }
  };

  Arithmetic.inv = function(a) {
    if (a.inv) {
      return a.inv();
    } else {
      return 1/a;
    }
  };

  Arithmetic.sign = function(a) {
    if (a.sign) {
      return a.sign();
    } else {
      return Math.sign(a);
    }
  };

  if (typeof define === "function" && define.amd) {
    define(function () {
      return Arithmetic;
    });
  } else if (typeof exports === "object") {
    module.exports = Arithmetic;
  } else {
    context.Arithmetic = Arithmetic;
  }

})(this);
