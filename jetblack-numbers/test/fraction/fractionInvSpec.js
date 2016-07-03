define(['fraction'], function(Fraction) {


  describe("Fraction inverse", function() {

    it("should invert fraction", function() {
      var a = new Fraction(3, 4);
      var f = a.inv();
      expect(f.numerator)
        .toEqual(4);
      expect(f.denominator)
        .toEqual(3);
    });

    it("should invert a negative fraction", function() {
      var a = new Fraction(-3, 4);
      var f = a.inv();
      expect(f.numerator)
        .toEqual(-4);
      expect(f.denominator)
        .toEqual(3);
    });

  });
});
