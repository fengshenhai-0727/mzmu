import * as _ from 'lodash';
import { __map } from './iteratee';
import { MU } from '../mu-const';

/**
 * 浅拷贝
 */
export const __copy = _.clone;

/**
 * 深拷贝
 */
export const __clone = _.cloneDeep;

/**
 * mu.remove
 * 与_.remove 不同贵的是, mu.remove 也可以删除对象
 * @param collection
 * @param iteratee
 * @return 新的集合
 */
export function __remove(collection: Collection, iteratee: Iteratee<boolean> | KeyInx) {
    let _iteratee;

    _iteratee = typeof iteratee === 'function' ? iteratee : (value, keyInx) => keyInx === iteratee;

    return __map(collection, (value, keyInx) => {
        return _iteratee(value, keyInx) ? MU.MAP_SKIP : value;
    });
}

/**
 * mu.length()
 * @param collection
 * @private
 */
export function __length(collection: Collection) {
    return (_.isArray(collection) ? collection : _.keys(collection)).length;
}
