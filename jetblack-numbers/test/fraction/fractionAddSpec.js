describe("Fraction add", function() {

  it("should add two fractions", function() {
    var a = new Fraction(1, 4);
    var b = new Fraction(1, 2);
    var f = a.add(b);
    expect(f.numerator).toEqual(3);
    expect(f.denominator).toEqual(4);
  });

  it("should add a fraction to an integer", function() {
    var a = new Fraction(1, 4);
    var f = a.add(2);
    expect(f.numerator).toEqual(9);
    expect(f.denominator).toEqual(4);
  });

  it("should add a fraction to a float", function() {
    var a = new Fraction(1, 4);
    var f = a.add(0.5);
    expect(f).toEqual(0.75);
  });

  it("should add a fraction to a string", function() {
    var a = new Fraction(1, 4);
    var f = a.add(" hello");
    expect(f).toEqual("0.25 hello");
  });

  it("should fail to add a fraction to NaN", function() {
    var a = new Fraction(1, 4);
    var f = a.add(Number.NaN);
    expect(Number.isNaN(f)).toBe(true);
  });

});
