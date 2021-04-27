/** @module CardinalPoints */

/**
 * Cardinal Points Object
 * Methods to access/verify point names and values:
 * ["N", 0], ["E", 90], ["S", 180], ["W", 270]
 */
const _points = new WeakMap();

export default class CardinalPoints {
  constructor() {
    /*
     * Private data via WeakMaps:
     * http://exploringjs.com/es6/ch_classes.html#_private-data-via-weakmaps
     */
    _points.set(this, new Map([['N', 0], ['E', 90], ['S', 180], ['W', 270]]));
  }

  /**
   *
   * @param   {string} Cardinal Point
   * @returns {number} Corresponding degree for cardinal point
   */
  getDegree(point) {
    const points = _points.get(this);
    return points.get(point.toString().toUpperCase());
  }

  /**
   *
   * @param   {number} degree
   * @returns {string} Corresponding cardinal point for degree
   */
  getPointName(degree) {
    const points = _points.get(this);
    for (const [key, value] of points) {
      if (value === Number.parseInt(degree, 10)) {
        return key;
      }
    }
    return undefined;
  }

  /**
   *
   * @param   {string} Cardinal point
   * @returns {boolean} True if point exists in Cardinal Points map
   */
  isValidPoint(point) {
    const points = _points.get(this);
    return points.has(point.toString().toUpperCase());
  }
}
