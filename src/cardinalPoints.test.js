/* global describe:false, before:false, it:false */

import CardinalPoints from './classes/cardinalPoints';

const assert = require('chai').assert;

describe('cardinalPoints.js', () => {
  it('CardinalPoints{}', () => {
    const cp = new CardinalPoints();
    assert.strictEqual(cp.getDegree('N'), 0, 'N is a point');
    assert.strictEqual(cp.getDegree('SE'), undefined, 'SE is not a point');
    assert.strictEqual(cp.getPointName(270), 'W', 'W = 270°');
    assert.strictEqual(cp.getPointName(271), undefined, '271 doesnt correspond a point');
    assert.strictEqual(cp.isValidPoint('SE'), false, 'SE is not a point');
  });
});
