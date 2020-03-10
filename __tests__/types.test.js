const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean,
  getCaster
} = require('../lib/types.js');
  
describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a number', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
    });
  });
  
  describe('basic validation of strings', () => {
    it('tells if a value is a number', () => {
      expect(isString('hi')).toBeTruthy();
      expect(isString(5)).toBeFalsy();
      expect(isString(true)).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
    });
  });
  
  describe('basic validation of boolean', () => {
    it('tells if a value is a boolean', () => {
      expect(isBoolean('hi')).toBeFalsy();
      expect(isBoolean(5)).toBeFalsy();
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
    });
  });

  describe('basic validation of array', () => {
    it('tells if a value is an array', () => {
      expect(isArray('hi')).toBeFalsy();
      expect(isArray(5)).toBeFalsy();
      expect(isArray(true)).toBeFalsy();
      expect(isArray([])).toBeTruthy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
    });
  });

  describe('basic validation of object', () => {
    it('tells if a value is an object', () => {
      expect(isObject('hi')).toBeFalsy();
      expect(isObject(5)).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject([])).toBeFalsy();
      expect(isObject({})).toBeTruthy();
      expect(isObject(() => {})).toBeFalsy();
    });
  });

  describe('basic validation of function', () => {
    it('tells if a value is an function', () => {
      expect(isFunction('hi')).toBeFalsy();
      expect(isFunction(5)).toBeFalsy();
      expect(isFunction(true)).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction(() => {})).toBeTruthy();
    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });
  
    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });
  });

  describe('casters', () => {
    it('can cast values to a string', () => {
      expect(castToString('hi')).toEqual('hi');
      expect(castToString(3)).toEqual('3');
      expect(castToString(true)).toEqual('true');
    });
  
    it('throws if value is not castable to string', () => {
      expect(() => castToString({})).toThrowErrorMatchingSnapshot();
      expect(() => castToString([])).toThrowErrorMatchingSnapshot();
      expect(() => castToString(() => {})).toThrowErrorMatchingSnapshot();
    });
  });

  describe('casters', () => {
    it('can cast values to a boolean', () => {
      expect(castToBoolean('hi')).toEqual(true);
      expect(castToBoolean(3)).toEqual(true);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean(false)).toEqual(false);
    });
  
    it('throws if value is not castable to boolean', () => {
      expect(() => castToBoolean({})).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean([])).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean(() => {})).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
  });
});
