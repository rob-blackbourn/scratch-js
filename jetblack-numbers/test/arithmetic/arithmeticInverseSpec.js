define(['numbers'], function(numbers) {

  var Fraction = numbers.Fraction;
  var Arithmetic = numbers.Arithmetic;

  describe("Arithmetic inverse", function() {

    it("should invert a positive fraction", function() {
      var a = new Fraction(1, 4);
      var f = Arithmetic.inv(a);
      expect(f.numerator)
        .toEqual(4);
      expect(f.denominator)
        .toEqual(1);
    });

    it("should invert a negative fraction", function() {
      var a = new Fraction(-1, 4);
      var f = Arithmetic.inv(a);
      expect(f.numerator)
        .toEqual(-4);
      expect(f.denominator)
        .toEqual(1);
    });

    it("should invert a positive integer", function() {
      var f = Arithmetic.inv(10);
      expect(f)
        .toEqual(0.1);
    });

    it("should invert a negative integer", function() {
      var f = Arithmetic.inv(-10);
      expect(f)
        .toEqual(-0.1);
    });

    it("should invert a positive float", function() {
      var f = Arithmetic.inv(10.1);
      expect(f)
        .toEqual(1 / 10.1);
    });

    it("should invert a negative float", function() {
      var f = Arithmetic.inv(-10.1);
      expect(f)
        .toEqual(1 / -10.1);
    });

  });
});
