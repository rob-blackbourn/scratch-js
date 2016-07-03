describe("Fraction not equals", function() {

  it("should compare same fractions to be equal", function() {
    var a = new Fraction(1, 2);
    var b = new Fraction(1, 2);
    expect(a.ne(b))
      .toBe(false);
  });

  it("should compare different fractions to be not equal", function() {
    var a = new Fraction(1, 2);
    var b = new Fraction(1, 4);
    expect(a.ne(b))
      .toBe(true);
  });

  it("should compare same negative fractions to be equal", function() {
    var a = new Fraction(-1, 2);
    var b = new Fraction(-1, 2);
    expect(a.ne(b))
      .toBe(false);
  });

  it("should compare different negative fractions to be not equal", function() {
    var a = new Fraction(-1, 2);
    var b = new Fraction(-1, 4);
    expect(a.ne(b))
      .toBe(true);
  });

  it("should compare a fraction and an integer to be equal", function() {
    var a = new Fraction(2, 1);
    expect(a.ne(2))
      .toBe(false);
  });

  it("should compare a fraction and an integer to be equal", function() {
    var a = new Fraction(2, 1);
    expect(a.ne(3))
      .toBe(true);
  });

  it("should compare a fraction and a float to be equal", function() {
    var a = new Fraction(1, 2);
    expect(a.ne(0.5))
      .toBe(false);
  });

  it("should compare a fraction and a float to be equal", function() {
    var a = new Fraction(1, 2);
    expect(a.ne(0.75))
      .toBe(true);
  });

});
