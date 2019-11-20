import * as _ from 'lodash';
import { __isNil, __isEmpty, __isExist } from './__theory';
import { __ifnvl, __run, __exist } from './run';
import { __each, __map } from './iteratee';
import { __type } from './__type';
import { __downOne } from './utils';
import { MtObject } from '../type';

/**
 * mu.extend(isDeep: boolean, ...targets: any[])
 * 将两个或更多对象的内容合并到第一个对象
 * 从最后一个target合并到倒数第二个，以此类推
 * isDeep = true, 合并为递归，实现深拷贝
 * @param args
 * @private
 * @return 一个新的对象
 */
export function __extend(...args: any[]): any {
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
                // return false 直接跳出遍历
                // return true 只是跳过当前
                return true;
            }
            if (deep && __isExist(srcValue) && (_.isPlainObject(value) || _.isArray(value))) {
                src[key] = __extend(true, srcValue, value);
            } else {
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
export function __tile(obj: object) {
    if (typeof obj !== 'object') {
        return obj;
    }

    let isBaseType = (item) => __type(item, 'string', 'number', 'boolean', 'function', 'regex', 'symbol', 'null', 'undefined');
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
        } else {
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
export function __stack(obj: { [propName: string]: any }) {
    let rst = {};

    __each(obj, (value, key) => {
        _.set(rst, key, value);
    });

    return rst;
}

export const __untile = __stack;

/**
 * 解析路径中带[*]的路径
 * @param obj
 * @param path
 */
let analysisPath = function(obj, path) {
    let reg = /\[\s*\*\s*]/;

    let paths = [];

    let getPaths = function(paths, obj, path): string[] {
        if (!reg.test(path)) {
            paths.push(path);
        } else {
            let _path = path.replace(reg, '|||');
            let [first, suffix] = _path.split('|||');

            let data = _.get(obj, first);

            if (_.isObject(data) || _.isArray(data)) {
                __each(data, (v, key) => {
                    let __path = `${first}[${key}]${suffix}`;
                    getPaths(paths, obj, __path);
                });
            } else {
                throw new TypeError(`path -> ${path} error`);
            }
        }

        return paths;
    };

    return getPaths(paths, obj, path);
};

/**
 * 根据路径获取值
 * @param obj
 * @param path
 * @private
 */
export function __get(obj: MtObject, path: string) {
    let rst = __map(analysisPath(obj, path), (path) => _.get(obj, path));
    return __downOne(rst);
}

/**
 * 根据路径设置值
 */
export function __set(src: MtObject, pathValMap: MtObject);
export function __set(src: MtObject, path: string, value: any);
export function __set(...args) {
    let len = args.length;
    if (args.length === 2) {
        let [src, pathValMap] = args;
        __each(pathValMap, (val, path) => {
            __set(src, path as string, val);
        });
    } else if (len === 3) {
        let [src, path, value] = args;
        __each(analysisPath(src, path), (path) => {
            _.set(src, path, value);
        });
    }
}

/**
 * 针对特殊的对象面位量,
 * 它只有一组属性值对
 * @private
 */
export function __oneKey(obj: Record<string, any>) {
    const keys = _.keys(obj);
    return keys.length === 1 ? keys[0] : keys;
}

/**
 * 针对特殊的对象面位量,
 * 它只有一组属性值对
 * @private
 */
export function __oneVal(obj: Record<string, any>) {
    const vals = _.values(obj);
    return vals.length === 1 ? vals[0] : vals;
}

