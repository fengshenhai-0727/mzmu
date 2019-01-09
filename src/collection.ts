import * as _ from 'lodash';

export const __copy = _.clone;
export const __clone = _.cloneDeep;

/**
 * 删除
 * @param collection
 * @param keyInx
 * @private
 */
export function __deleted(collection: Collection, keyInx: KeyInx) {
    delete collection[keyInx];
    return collection;
}

/**
 * mu.length()
 * @param collection
 * @private
 */
export function __length(collection: Collection) {
    return (_.isArray(collection) ? collection : _.keys(collection)).length;
}
