/* global describe:false, before:false, it:false */

import { bounds } from './config';
import Martian from './classes/martian';
import Robot from './classes/martianRobot';
import { default as Store } from './store';

const assert = require('chai').assert;

describe('store.js', () => {
  
  it('Storage Methods', () => {
    const a = new Robot('a', 1, 1, 'E');
    const b = new Robot('b', 3, 2, 'N');
    const c = new Robot('c', 0, 3, 'W');
    const aM = new Martian('aM', 3, 2, 'N');

    const mars = new Store();
    assert.strictEqual(mars.getAll().size, 0, 'Should be zero since its just been made.');

    assert.strictEqual(mars.add(a), 1, 'Should be 1 since we just added a robot.');
    try {
      assert.strictEqual(mars.add('a', 1, [2]), 1, 'Try to add something other than a robot or martian, should fail and return last size of 1.');
    }
    catch (e) {
      console.log(e);
    }

    assert.strictEqual(mars.add(b, c, aM), 4, 'Try to add multiple robots or martians, should succeed and return size 4.');
    assert.strictEqual(mars.update(a), true, 'Return true if successfully updated.');
    assert.strictEqual(mars.update('a'), false, "Return false because it doesn't exist.");
    assert.strictEqual(mars.remove(b.name), true, 'Successfully removed');
    assert.strictEqual(mars.get(b.name), undefined, 'We just deleted this so this should be undefined.');
    assert.strictEqual(mars.getAll().size, 3, 'Should be 3 since we just tossed one.');
  });
});
