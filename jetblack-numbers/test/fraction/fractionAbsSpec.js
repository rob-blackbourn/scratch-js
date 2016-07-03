describe("Fraction absolute", function() {

  it("should leave a positive fraction unchanged", function() {
    var a = new Fraction(1, 2);
    var f = a.abs();
    expect(f.numerator).toEqual(1);
    expect(f.denominator).toEqual(2);
  });

  it("should make a negative fraction positive", function() {
    var a = new Fraction(-1, 2);
    var f = a.abs();
    expect(f.numerator).toEqual(1);
    expect(f.denominator).toEqual(2);
  });

});
