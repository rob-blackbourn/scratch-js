define(['numbers'], function(numbers) {

  var Fraction = numbers.Fraction;
  var Arithmetic = numbers.Arithmetic;

  describe("Fraction equals", function() {

    it("should compare fractions to be equal", function() {
      var a = new Fraction(1, 2);
      var b = new Fraction(1, 2);
      expect(a.eq(b))
        .toBe(true);
    });

    it("should compare fractions to be unequal", function() {
      var a = new Fraction(1, 2);
      var b = new Fraction(1, 4);
      expect(a.eq(b))
        .toBe(false);
    });

    it("should compare negative fractions to be equal", function() {
      var a = new Fraction(-1, 2);
      var b = new Fraction(-1, 2);
      expect(a.eq(b))
        .toBe(true);
    });

    it("should compare a fraction and an integer to be equal", function() {
      var a = new Fraction(2, 1);
      expect(a.eq(2))
        .toBe(true);
    });

    it("should compare a fraction and a float to be equal", function() {
      var a = new Fraction(1, 2);
      expect(a.eq(0.5))
        .toBe(true);
    });

  });
});
