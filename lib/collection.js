import * as _ from 'lodash';
export const __copy = _.clone;
export const __clone = _.cloneDeep;
/**
 * 删除
 * @param collection
 * @param keyInx
 * @private
 */
export function __deleted(collection, keyInx) {
    delete collection[keyInx];
    return collection;
}
/**
 * mu.length()
 * @param collection
 * @private
 */
export function __length(collection) {
    return (_.isArray(collection) ? collection : _.keys(collection)).length;
}
