/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return reg.test(email)
}