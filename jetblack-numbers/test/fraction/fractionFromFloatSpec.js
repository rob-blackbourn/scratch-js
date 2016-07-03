describe("Fraction fromFloat", function() {

  it('should convert simple float', function() {
    var f = Fraction.fromFloat(0.5);
    expect(f.numerator).toEqual(1);
    expect(f.denominator).toEqual(2);
  });

  it('should convert complex float', function() {
    var f = Fraction.fromFloat(1.0 / 3.0);
    expect(f.numerator).toEqual(1);
    expect(f.denominator).toEqual(3);
  });

  it('should convert simple negative float', function() {
    var f = Fraction.fromFloat(-0.5);
    expect(f.numerator).toEqual(-1);
    expect(f.denominator).toEqual(2);
  });

  it('should convert negative complex float', function() {
    var f = Fraction.fromFloat(-1.0 / 3.0);
    expect(f.numerator).toEqual(-1);
    expect(f.denominator).toEqual(3);
  });

});
