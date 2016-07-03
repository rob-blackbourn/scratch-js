define(['fraction'], function(Fraction) {

  describe("Fraction toString", function() {

    it("should display a simple fraction", function() {
      var f = new Fraction(1, 2)
        .toString();
      expect(f)
        .toEqual("1/2");
    });

    it("should display a top heavy fraction", function() {
      var f = new Fraction(3, 2)
        .toString();
      expect(f)
        .toEqual("1 1/2");
    });

    it("should display a whole number", function() {
      var f = new Fraction(1, 1)
        .toString();
      expect(f)
        .toEqual("1");
    });

    it("should display a negative simple fraction", function() {
      var f = new Fraction(-1, 2)
        .toString();
      expect(f)
        .toEqual("-1/2");
    });

    it("should display a negative top heavy fraction", function() {
      var f = new Fraction(-3, 2)
        .toString();
      expect(f)
        .toEqual("-1 1/2");
    });

    it("should display a negative whole number", function() {
      var f = new Fraction(-1, 1)
        .toString();
      expect(f)
        .toEqual("-1");
    });

    it("should display NaN", function() {
      var f = new Fraction()
        .toString();
      expect(f)
        .toEqual(Number.NaN.toString());
    });

  });
});
