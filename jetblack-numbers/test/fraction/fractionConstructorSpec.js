describe("Fraction constructor", function() {

  it("should construct a simple fraction", function() {
    var f = null;

    f = new Fraction(1, 2);
    expect(f.isNaN())
      .toBe(false);
    expect(f.numerator)
      .toEqual(1);
    expect(f.denominator)
      .toEqual(2);
  });

  it("should construct a top heavy fraction", function() {
    var f = null;

    f = new Fraction(4, 3);
    expect(f.isNaN())
      .toBe(false);
    expect(f.numerator)
      .toEqual(4);
    expect(f.denominator)
      .toEqual(3);
  });

  it("should construct and simplify a fraction", function() {
    var f = null;

    f = new Fraction(2, 4);
    expect(f.isNaN())
      .toBe(false);
    expect(f.numerator)
      .toEqual(1);
    expect(f.denominator)
      .toEqual(2);
  });

  it("should construct a fraction where the numerator is negative", function() {
    var f = null;

    f = new Fraction(-1, 2);
    expect(f.isNaN())
      .toBe(false);
    expect(f.numerator)
      .toEqual(-1);
    expect(f.denominator)
      .toEqual(2);
  });

  it("should construct a fraction where the denominator is negative", function() {
    var f = null;

    f = new Fraction(1, -2);
    expect(f.isNaN())
      .toBe(false);
    expect(f.numerator)
      .toEqual(-1);
    expect(f.denominator)
      .toEqual(2);
  });

  it("should fail to construct a fraction beacause the denominator is zero.", function() {
    var f = null;

    f = new Fraction(1, 0);
    expect(f.isNaN())
      .toBe(true);

  });

  it("should fail to construct a fraction because neither argument is an integer", function() {
    var f = null;

    f = new Fraction(1.2, 3.4);
    expect(f.isNaN())
      .toBe(true);

  });

  it("should fail to construct a fraction because the first argument is not an integer", function() {
    var f = null;

    f = new Fraction(1.2, 3);
    expect(f.isNaN())
      .toBe(true);

    f = new Fraction(1, 3.4);
    expect(f.isNaN())
      .toBe(true);

    f = new Fraction(null, null);
    expect(f.isNaN())
      .toBe(true);

  });

  it("should fail to construct a fraction because the second argument is not an integer", function() {
    var f = null;

    f = new Fraction(1, 3.4);
    expect(f.isNaN())
      .toBe(true);

  });

  it("should fail to construct a fraction with no args", function() {
    var f = null;

    f = new Fraction();
    expect(f.isNaN())
      .toBe(true);

  });

});
