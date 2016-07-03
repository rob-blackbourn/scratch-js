define(['fraction', 'arithmetic'], function(Fraction, Arithmetic) {

  describe("Arithmetic add", function() {

    it("should add two fractions", function() {
      var a = new Fraction(1, 4);
      var b = new Fraction(1, 8);
      var c = Arithmetic.add(a, b);
      expect(c.numerator)
        .toEqual(3);
      expect(c.denominator)
        .toEqual(8);
    });

    it("should add two integers", function() {
      var c = Arithmetic.add(1, 2);
      expect(c)
        .toEqual(3);
    });

    it("should add two floats", function() {
      var c = Arithmetic.add(1.5, 2.25);
      expect(c)
        .toEqual(3.75);
    });

    it("should add a fraction to an integer", function() {
      var a = new Fraction(1, 4);
      var c = Arithmetic.add(a, 1);
      expect(c.numerator)
        .toEqual(5);
      expect(c.denominator)
        .toEqual(4);
    });

    it("should add an integer to a fraction", function() {
      var b = new Fraction(1, 4);
      var c = Arithmetic.add(1, b);
      expect(c.numerator)
        .toEqual(5);
      expect(c.denominator)
        .toEqual(4);
    });

    it("should add a fraction to a float", function() {
      var a = new Fraction(1, 4);
      var c = Arithmetic.add(a, 1.5);
      expect(c)
        .toEqual(1.75);
    });

    it("should add an float to a fraction", function() {
      var b = new Fraction(1, 4);
      var c = Arithmetic.add(1.5, b);
      expect(c)
        .toEqual(1.75);
    });

    it("should add an integer to a float", function() {
      var c = Arithmetic.add(1, 1.5);
      expect(c)
        .toEqual(2.5);
    });

    it("should add an float to an integer", function() {
      var c = Arithmetic.add(1.5, 1);
      expect(c)
        .toEqual(2.5);
    });

  });
});
