module.exports = implodePath

/**
 * Constructs path from array with path parts
 *
 * - consolidates the path building in single function
 *  and resolves issues/inconsistencies with slashes
 *
 * @param {Array} aPathParts
 */
function implodePath (aPathParts) {
    if (Array.isArray(aPathParts) === true) {
        return aPathParts.join('/');
    } else {
        throw new Error('function implodePath accepts arrays only!');
    }
};
