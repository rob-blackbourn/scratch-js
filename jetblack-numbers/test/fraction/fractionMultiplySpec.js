define(['numbers'], function(numbers) {

  var Fraction = numbers.Fraction;
  var Arithmetic = numbers.Arithmetic;

  describe("Fraction multiply", function() {

    it("should multiply two fractions", function() {
      var a = new Fraction(1, 4);
      var b = new Fraction(1, 2);
      var f = a.mul(b);
      expect(f.numerator)
        .toEqual(1);
      expect(f.denominator)
        .toEqual(8);
    });

    it("should multiply a fraction by an integer", function() {
      var a = new Fraction(1, 4);
      var f = a.mul(2);
      expect(f.numerator)
        .toEqual(1);
      expect(f.denominator)
        .toEqual(2);
    });

    it("should multiply a fraction by a float", function() {
      var a = new Fraction(1, 4);
      var f = a.mul(0.5);
      expect(f)
        .toEqual(0.125);
    });

    it("should multiply a fraction by a string", function() {
      var a = new Fraction(1, 4);
      var f = a.mul(" hello");
      expect(Number.isNaN(f))
        .toBe(true);
    });

    it("should fail to multiply a fraction by NaN", function() {
      var a = new Fraction(1, 4);
      var f = a.mul(Number.NaN);
      expect(Number.isNaN(f))
        .toBe(true);
    });

  });
});
