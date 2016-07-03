define(['numbers'], function(numbers) {

  var Fraction = numbers.Fraction;
  var Arithmetic = numbers.Arithmetic;

  describe("Fraction negate", function() {

    it("should make a positive fraction negative", function() {
      var a = new Fraction(1, 2);
      var f = a.neg();
      expect(f.numerator)
        .toEqual(-1);
      expect(f.denominator)
        .toEqual(2);
    });

    it("should make a negative fraction positive", function() {
      var a = new Fraction(-1, 2);
      var f = a.neg();
      expect(f.numerator)
        .toEqual(1);
      expect(f.denominator)
        .toEqual(2);
    });

  });
});
