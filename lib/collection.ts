import * as _ from 'lodash';
import { __map } from './iteratee';
import { MU } from '../mu-const';
import { __isEmpty, __isNil } from './__theory';

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

/**
 * mu.compact
 * 创建一个新的集合，去除原集合中的所有的非假值元素
 * @param collection
 * @param type
 * @param isDeep
 * @private
 */

// 不存在 undefined: 不存在
// 虚值 nil: null 或 undefined
// 假值 false: 使用运算符if计算出来的假值, 包括 null, undefined, 0, ''(空字符串)
// 空值 empty: 在假值的基础上，添加 空对象，空数组，空字符串
// 无穷 nan: NaN

function __compact(collection: Collection);
function __compact(collection: Collection, type: FalseType);
function __compact(isDeep: boolean, collection: Collection, type: FalseType);
function __compact(...args) {
    let isDeep = false,
        collection,
        type = 'false';
    let argsLen = args.length;
    if (argsLen === 1) {
        [collection] = args;
    } else if (argsLen === 2) {
        [collection, type] = args;
    } else {
        [isDeep, collection, type] = args;
    }

    // todo deep

    return __map(collection, (item, inx) => {
        switch (type) {
            case 'undefined':
                return item === undefined ? MU.MAP_SKIP : item;

            case 'nil':
                return __isNil(item) ? MU.MAP_SKIP : item;

            case 'empty':
                return __isEmpty(item) ? MU.MAP_SKIP : item;

            default:
                return item ? item : MU.MAP_SKIP;
        }
    });
}

export { __compact };
