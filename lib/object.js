import * as _ from 'lodash';
import { __isEmpty, __isExist } from './__theory';
import { __exist } from './run';
import { __each } from './iteratee';
import { __type } from './__type';
/**
 * mu.extend(isDeep: boolean, ...targets: any[])
 * 将两个或更多对象的内容合并到第一个对象
 * 从最后一个target合并到倒数第二个，以此类推
 * isDeep = true, 合并为递归，实现深拷贝
 * @param args
 * @private
 * @return 一个新的对象
 */
export function __extend(...args) {
    if (__isEmpty(args)) {
        return void 0;
    }
    let [deep, src, targets] = __exist(args.shift(), (value) => {
        return __type(value, 'boolean') ? [value, args.shift(), args] : [false, value, args];
    });
    __each(targets, (item) => {
        __each(item, (value, key) => {
            let srcValue = src[key];
            if (value === srcValue) {
                return false;
            }
            if (deep && __isExist(srcValue) && (_.isPlainObject(value) || _.isArray(value))) {
                src[key] = __extend(true, srcValue, value);
            }
            else {
                src[key] = value;
            }
        });
    });
    return src;
}
/**
 * mu.tile
 * 将一个对象平铺展开
 * @private
 */
export function __tile(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }
    let isBaseType = (item) => __type(item, 'string', 'number', 'function', 'regex', 'symbol', 'null', 'undefined');
    let path = (key, context) => {
        if (typeof key === 'number' && __type(context, 'array')) {
            return `[${key}]`;
        }
        return key;
    };
    let rst = {};
    __each(obj, (item, key, context) => {
        let k = path(key, context);
        if (isBaseType(item)) {
            rst[k] = item;
        }
        else {
            __each(__tile(item), (subItem, subKey, subContext) => {
                let kk = path(subKey, subContext);
                rst[`${k}.${kk}`] = subItem;
            });
        }
    });
    return rst;
}
/**
 * mu.stack
 * as mu.untile
 * 平铺堆叠成对象
 * @param obj
 * @private
 */
export function __stack(obj) {
    let rst = {};
    __each(obj, (value, key) => {
        _.set(rst, key, value);
    });
    return rst;
}
export const __untile = __stack;