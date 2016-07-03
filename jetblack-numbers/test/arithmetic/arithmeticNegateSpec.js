describe("Arithmetic negate", function() {

  it("should negate a positive fraction", function() {
    var a = new Fraction(1, 4);
    var f = Arithmetic.neg(a);
    expect(f.numerator).toEqual(-1);
    expect(f.denominator).toEqual(4);
  });

  it("should negate a negative fraction", function() {
    var a = new Fraction(-1, 4);
    var f = Arithmetic.neg(a);
    expect(f.numerator).toEqual(1);
    expect(f.denominator).toEqual(4);
  });

  it("should negate a positive integer", function() {
    var f = Arithmetic.neg(10);
    expect(f).toEqual(-10);
  });

  it("should negate a negative integer", function() {
    var f = Arithmetic.neg(-10);
    expect(f).toEqual(10);
  });

  it("should negate a positive float", function() {
    var f = Arithmetic.neg(10.1);
    expect(f).toEqual(-10.1);
  });

  it("should negate a negative float", function() {
    var f = Arithmetic.neg(-10.1);
    expect(f).toEqual(10.1);
  });

});
