describe("Arithmetic absolute", function() {

  it("should absolute a positive fraction", function() {
    var a = new Fraction(1, 4);
    var f = Arithmetic.abs(a);
    expect(f.numerator).toEqual(1);
    expect(f.denominator).toEqual(4);
  });

  it("should absolute a negative fraction", function() {
    var a = new Fraction(-1, 4);
    var f = Arithmetic.abs(a);
    expect(f.numerator).toEqual(1);
    expect(f.denominator).toEqual(4);
  });

  it("should absolute a positive integer", function() {
    var f = Arithmetic.abs(10);
    expect(f).toEqual(10);
  });

  it("should absolute a negative integer", function() {
    var f = Arithmetic.abs(-10);
    expect(f).toEqual(10);
  });

  it("should absolute a positive float", function() {
    var f = Arithmetic.abs(10.1);
    expect(f).toEqual(10.1);
  });

  it("should absolute a negative float", function() {
    var f = Arithmetic.abs(-10.1);
    expect(f).toEqual(10.1);
  });

});
