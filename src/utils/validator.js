/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return reg.test(email)
}

/**
 * @param {string} mobile
 * @returns {Boolean}
 */
export function validMobile(mobile) {
    const reg = /^1[1-9][0-9]{9}$/
    return reg.test(mobile);
}

/**
 * @param {Array} array
 * @returns {Boolean}
 */
export function isArray(array) {
    return Object.prototype.toString.call(array) === '[object Array]';
}

/**
 * @param {Object} obj
 * @returns {Boolean}
 */
export function isObject(obj) {
    // 函数、对象、数组、并且不为NaN
    const type = typeof obj;
    return type === 'object' && !!obj;
}

/**
 * @param {Object} obj
 * @returns {Boolean}
 */
export function isUndefined(obj) {
    return obj === void 0;
}