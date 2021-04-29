/** @module helpers **/

/**
 *
 * @param   {number} value
 * @returns {boolean} confirm this is a integer
 */
export function isNumber(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return true;
  }
  return false;
}

/**
 *
 * @param   {number} value [[Description]]
 * @returns {boolean} confirm this is a positve number
 */
export function isPositiveNumber(value) {
  if (isNumber(value) && value > 0) {
    return true;
  }
  return false;
}

/**
 *
 * @param   {number} position to validate
 * @param   {[[Type]]} boundaries to validate position against
 * @returns {boolean}
 */
export function isPosSafe(pos, posBounds) {
  if (pos < 0 || pos > Number.parseInt(posBounds, 10)) {
    return false;
  }
  return true;
}

export function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}
