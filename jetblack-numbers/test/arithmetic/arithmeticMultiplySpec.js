define(['numbers'], function(numbers) {

  var Fraction = numbers.Fraction;
  var Arithmetic = numbers.Arithmetic;

  describe("Arithmetic multiply", function() {

    it("should multiply two fractions", function() {
      var a = new Fraction(1, 4);
      var b = new Fraction(1, 8);
      var c = Arithmetic.mul(a, b);
      expect(c.numerator)
        .toEqual(1);
      expect(c.denominator)
        .toEqual(32);
    });

    it("should multiply two integers", function() {
      var c = Arithmetic.mul(2, 3);
      expect(c)
        .toEqual(6);
    });

    it("should multiply two floats", function() {
      var c = Arithmetic.mul(1.5, 2.25);
      expect(c)
        .toEqual(3.375);
    });

    it("should multiply a fraction by an integer", function() {
      var a = new Fraction(1, 4);
      var c = Arithmetic.mul(a, 2);
      expect(c.numerator)
        .toEqual(1);
      expect(c.denominator)
        .toEqual(2);
    });

    it("should multiply an integer by a fraction", function() {
      var b = new Fraction(1, 4);
      var c = Arithmetic.mul(2, b);
      expect(c.numerator)
        .toEqual(1);
      expect(c.denominator)
        .toEqual(2);
    });

    it("should multiply a fraction by a float", function() {
      var a = new Fraction(1, 4);
      var c = Arithmetic.mul(a, 1.5);
      expect(c)
        .toEqual(0.375);
    });

    it("should multiply a float by a fraction", function() {
      var b = new Fraction(1, 4);
      var c = Arithmetic.mul(1.5, b);
      expect(c)
        .toEqual(0.375);
    });

    it("should multiply an integer by a float", function() {
      var c = Arithmetic.mul(3, 1.5);
      expect(c)
        .toEqual(4.5);
    });

    it("should multiply a float by an integer", function() {
      var c = Arithmetic.mul(1.5, 3);
      expect(c)
        .toEqual(4.5);
    });

  });
});
