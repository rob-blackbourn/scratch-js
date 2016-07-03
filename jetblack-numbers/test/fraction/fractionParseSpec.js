define(['numbers'], function(numbers) {

  var Fraction = numbers.Fraction;
  var Arithmetic = numbers.Arithmetic;

  describe("Fraciton Parse", function() {

    it("Should parse a simple fraction.", function() {
      var f = Fraction.parse("1/2");
      expect(f.numerator)
        .toEqual(1);
      expect(f.denominator)
        .toEqual(2);
    });

    it("Should parse a top heavy fraction.", function() {
      var f = Fraction.parse("1 1/2");
      expect(f.numerator)
        .toEqual(3);
      expect(f.denominator)
        .toEqual(2);
    });

    it("Should parse a whole number.", function() {
      var f = Fraction.parse("2");
      expect(f.numerator)
        .toEqual(2);
      expect(f.denominator)
        .toEqual(1);
    });

    it("Should parse a simple negative fraction.", function() {
      var f = Fraction.parse("-1/2");
      expect(f.numerator)
        .toEqual(-1);
      expect(f.denominator)
        .toEqual(2);
    });

    it("Should parse a negative top heavy fraction.", function() {
      var f = Fraction.parse("-1 1/2");
      expect(f.numerator)
        .toEqual(-3);
      expect(f.denominator)
        .toEqual(2);
    });

    it("Should parse a whole negative number.", function() {
      var f = Fraction.parse("-2");
      expect(f.numerator)
        .toEqual(-2);
      expect(f.denominator)
        .toEqual(1);
    });

    it("Should parse a simple positive fraction.", function() {
      var f = Fraction.parse("+1/2");
      expect(f.numerator)
        .toEqual(1);
      expect(f.denominator)
        .toEqual(2);
    });

    it("Should parse a positive top heavy fraction.", function() {
      var f = Fraction.parse("+1 1/2");
      expect(f.numerator)
        .toEqual(3);
      expect(f.denominator)
        .toEqual(2);
    });

    it("Should parse a whole positive number.", function() {
      var f = Fraction.parse("+2");
      expect(f.numerator)
        .toEqual(2);
      expect(f.denominator)
        .toEqual(1);
    });

  });
});
