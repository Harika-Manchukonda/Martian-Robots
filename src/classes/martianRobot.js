/** @module Martian Robot **/

import Martian from './martian';
import { isPositiveNumber, isPosSafe } from '../helpers';
import { bounds, lostList } from '../config';

const _processMotion = new WeakMap();
const _hasScent = new WeakMap();

/*
 * defines a martian robot and its current state
 * a martian robot will "fall off" the boundaries of mars
 * or be inhibited from falling off where another robot has fallen off
 * @extends Martian
 */
export default class MartianRobot extends Martian {

   /**
   *
   * @param {string}   name        robot name: defaults to time string
   * @param {number} x           robot x coordinate: default to zero
   * @param {number} y           robot y coordinate: default to zero
   * @param {string}   orientation
   * robot orientation, must be a valid CardinalPoint or will default to north
   * @param {boolean} isAlive     robot status, defaults to true
   */
  constructor(name, x, y, orientation) {
    super(name, x, y, orientation);
    this._x = (isPositiveNumber(x) && x <= bounds.point.get('x')) ? x : 0;
    this._y = (isPositiveNumber(y) && y <= bounds.point.get('y')) ? y : 0;
    this._isAlive = true;

    /**
     * Private methods via WeakMaps:
     * http://exploringjs.com/es6/ch_classes.html#_private-data-via-weakmaps
     *
     * I wanted utility/helper functions. By definition I don't want these to show up
     * as a robot method. At first I thought, utility module/class thingermabob i.e. robotHelpers.js.
     * But that seemed to depart from "encapsulation" and the "single responsibility principle"; also the internets says thats a anti-pattern/code smell
     * This method works well, but the internets also says its a bit of a memory hog.
     * Its making each instantiation more expensive;
     * in my head these helpers should only exist once and be called on-demand. *shrugs*
     *
     * @param {number} tempPos: position to move to if valid
     * @param {string} axis: x or y axis to move along
     */
    _processMotion.set(this, (tempPos, axis) => {
      const hs = _hasScent.get(this);

      switch (hs(this.point, tempPos, bounds.point.get(axis))) {
        case 0:
          break;
        case 1:
          this._isAlive = false;
          lostList.push([this.point]);
          break;
        case 2:
          this[axis] = tempPos;
          break;
        default:
          // do nothing
      }
    });

    /**
     * Lost robots leave a robot “scent” which we store in `lostList[]`.
     * The scent prohibits future robots from dropping off the world at the same grid point.
     * The scent is left at the last grid position the robot occupied before disappearing over the edge.
     * We ignore instructions to to move “off” the world from a grid point from which a robot has been lost.
     *
     * @param {string} pointStr: 'x,y' coords
     * @param {number} tempPos: instructed position
     * @param {number} axisBounds: intructed boundary axis
     * @returns {boolean || null}:
     * - 0: check if location has scent by looking in the lost list
     * then if the next move is fatal, don't move robot
     *
     * - 1: if location does NOT have a scent and the next move is fatal let it happen,
     * but add the location to the lost list and update the bot status to LOST
     *
     * - 2: if the next move is safe let it happen
     */
    _hasScent.set(this, (pointStr, tempPos, axisBounds) => {
      if (lostList.items.find((point => point === pointStr)) &&
        !isPosSafe(tempPos, axisBounds)) {
        return 0;
      }
      else if (!isPosSafe(tempPos, axisBounds)) {
        return 1;
      }

      return 2;
    });
  }

  set isAlive(value) {
    if (typeof value === 'boolean') {
      this._isAlive = value;
    }
    else {
//          this._isAlive = true;
      throw new Error('A robot can only be alive (true) or lost (false).');
    }
  }

  get isAlive() {
    return this._isAlive;
  }

  get type() {
    return 'Robot';
  }

  /**
   * orientation determines which axis to increment/decrement along
   */
  move() {
    const pm = _processMotion.get(this);

    switch (this._orientation) {
      case 'N':
        pm((this._y + 1), 'y');
        break;
      case 'S':
        pm((this._y - 1), 'y');
        break;
      case 'E':
        pm((this._x + 1), 'x');
        break;
      case 'W':
        pm((this._x - 1), 'x');
        break;
      default:
        // do nothing
    }
  }
}
