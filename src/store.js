/** @module Store */

export const lostList = []; // manages grid points of lost robots

const _mars = new WeakMap();

/**
 * Storage object and methods
 */
export default class Store {
  constructor() {
    _mars.set(this, new Map());
  }

  /**
   *
   * @throws {Error} only add martians or robots
   * @param   {Array} ...martian: add one... or add many
   * @returns {number} size of mars Map
   */
  add(...martian) {
    const mars = _mars.get(this);

    martian.forEach((m) => {
      try {
        if (['Martian', 'Robot'].includes(m.type)) {
          mars.set(m.name, m);
        }
      }
      catch (e) {
        throw new Error('Can only store Martians and Robots.');
      }
    });

    return mars.size;
  }

  /**
   *
   * @param   {object}   martian to act on
   * @returns {boolean} reflect if boolean was successful
   */
  update(martian) {
    const mars = _mars.get(this);

    if (mars.has(martian.name)) {
      mars.set(martian.name, martian);
    }

    return mars.has(martian.name);
  }

  /**
   *
   * @param   {string} martianName: use as key to delete from mars
   * @returns {boolean} confirm deletion
   */
  remove(martianName) {
    const mars = _mars.get(this);
    return mars.delete(martianName);
  }

  /**
   *
   * @param   {string} martianName: key to retrieve
   * @returns {object} martian/robot or undefined
   */
  get(martianName) {
    const mars = _mars.get(this);
    return mars.get(martianName);
  }

  /**
   *
   * @returns {Map} return all mars contents
   */
  getAll() {
    const mars = _mars.get(this);
    return mars;
  }
}
