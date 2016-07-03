define(['fraction'], function(Fraction) {

  describe("Fraction divide", function() {

    it("should divide two fractions", function() {
      var a = new Fraction(1, 4);
      var b = new Fraction(1, 2);
      var f = a.div(b);
      expect(f.numerator)
        .toEqual(1);
      expect(f.denominator)
        .toEqual(2);
    });

    it("should divide a fraction by an integer", function() {
      var a = new Fraction(1, 4);
      var f = a.div(2);
      expect(f.numerator)
        .toEqual(1);
      expect(f.denominator)
        .toEqual(8);
    });

    it("should divide a fraction by a float", function() {
      var a = new Fraction(1, 4);
      var f = a.div(0.5);
      expect(f)
        .toEqual(0.5);
    });

    it("should divide a fraction by a string", function() {
      var a = new Fraction(1, 4);
      var f = a.div(" hello");
      expect(Number.isNaN(f))
        .toBe(true);
    });

    it("should fail to divide a fraction by NaN", function() {
      var a = new Fraction(1, 4);
      var f = a.div(Number.NaN);
      expect(Number.isNaN(f))
        .toBe(true);
    });

  });

});
