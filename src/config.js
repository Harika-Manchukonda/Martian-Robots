/** module config */

import { isPositiveNumber, storageAvailable } from './helpers';

/*
 * Default values
 */
export const MAX_COORD = 50;
export const MAX_INSTRUCTION = 100;
export const X_BOUNDS = 5;
export const Y_BOUNDS = 3;

/**
 * set boundaries for mars as object literal
 * and return a boundaries a map with our points
 */
let x, y;
export const bounds = {
  set x(value) {
    x = (isPositiveNumber(value) && value <= MAX_COORD) ? value : X_BOUNDS;
    if (storageAvailable('localStorage')) {
      localStorage.xBounds = x;
    }
  },
  get x() {
    return x;
  },
  set y(value) {
    y = (isPositiveNumber(value) && value <= MAX_COORD) ? value : Y_BOUNDS;
    if (storageAvailable('localStorage')) {
      localStorage.yBounds = y;
    }
  },
  get y() {
    return y;
  },
  get point() {
    return new Map([['x', x], ['y', y]]);
  },
  get isSet() {
    return (x > 0 && y > 0);
  }
};


let _lostList = []; // manages grid points of lost robots
export const lostList = {
  push(value) {
    _lostList.push(...value);
    localStorage.lostList = JSON.stringify(_lostList);
  },

  get items() {
    return _lostList;
  },

  reset() {
    _lostList = [];
  }
}
