describe('calculateNumbers', function() {
    it('should evaluate the text string', function() {
      expect(calculateNumbers('2+2')).toBe(4);
      expect(calculateNumbers('2-2')).toBe(0);
    });
});

describe('isValidNumber', function() {
  it('should not fail if input is number or operator', function() {
    expect(isValidNumber('2')).toBe(true);
    expect(isValidNumber('0')).toBe(true);
    expect(isValidNumber('-1')).toBe(true);
    expect(isValidNumber('-2344223')).toBe(true);
    expect(isValidNumber('231234234')).toBe(true);
    expect(isValidNumber('+')).toBe(false);
    expect(isValidNumber('-')).toBe(false);
    expect(isValidNumber('*')).toBe(false);

  });

  it('should fail if not number or operator', function() {
    expect(isValidNumber('A')).toBe(false);
    expect(isValidNumber('$')).toBe(false);
    expect(isValidNumber('Z')).toBe(false);
  });

});

describe('isValidOperator', function() {
  it('should not fail if operators are * - + or /', function() {
    expect(isValidOperator('+')).toBe(true);
    expect(isValidOperator('-')).toBe(true);
    expect(isValidOperator('*')).toBe(true);
    expect(isValidOperator('/')).toBe(true);

    expect(isValidOperator('2')).toBe(false);
    expect(isValidOperator('@')).toBe(false);
    expect(isValidOperator('$')).toBe(false);
    expect(isValidOperator('E')).toBe(false);
    expect(isValidOperator('5')).toBe(false);
    expect(isValidOperator('X')).toBe(false);
  });
});