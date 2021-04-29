/* global describe:false, before:false, it:false */

import { bounds } from './config';
import { isNumber } from './helpers';

const assert = require('chai').assert;

describe('Config & Helpers', () => {
  // before(() => {
  //   bounds.x = -1;
  //   bounds.y = 15;
  // });

  // it('bounds{}', () => {
  //   assert.strictEqual(bounds.point.get('x') === 5, true, 'assigning a negative number to bounds will return the default of 5');
  //   assert.strictEqual(bounds.point.get('y') === 15, true, 'assigning a positive number to bounds will return the number');
  // });

  it('isNumber()', () => {
    assert.strictEqual(isNumber(null), false, 'Null test');
    assert.strictEqual(isNumber(undefined), false, 'undefined test');
    assert.strictEqual(isNumber('undefined'), false, 'string test');
    assert.strictEqual(isNumber(16), true, 'actual number');
    assert.strictEqual(isNumber(-1), true, 'a negative number is still a number');
  });
});
