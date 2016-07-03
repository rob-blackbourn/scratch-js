define(['numbers'], function(numbers) {

  var Fraction = numbers.Fraction;
  var Arithmetic = numbers.Arithmetic;

  describe("Fraction less than", function() {

    it("should compare two fractions", function() {
      var a = new Fraction(1, 4);
      var b = new Fraction(1, 2);
      expect(a.lt(b))
        .toBe(true);
      expect(b.lt(a))
        .toBe(false);
    });

    it("should compare a fraction to an integer", function() {
      var a = new Fraction(1, 4);
      expect(a.lt(1))
        .toBe(true);
      expect(a.lt(0))
        .toBe(false);
    });

    it("should compare a fraction to an float", function() {
      var a = new Fraction(1, 4);
      expect(a.lt(0.5))
        .toBe(true);
      expect(a.lt(0.1))
        .toBe(false);
    });

  });
});
