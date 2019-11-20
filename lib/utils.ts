import * as _ from 'lodash';
import { __type } from './__type';
import { __each, __map } from './iteratee';
import { __tile, __stack } from './object';
import { __deepDecodeURIComponent } from './string';

/**
 * mu.reorigin()
 * 数据类型的控制
 * @param value
 * @private
 */
export function __reorigin(value: any) {
    return {
        string: '',
        number: 0,
        date: new Date(0),
        regex: new RegExp(''),
        object: {},
        array: [],
        function: _.noop
    }[__type(value) as string];
}

/**
 * mu.or()
 * @param src
 * @param compares
 * @private
 */
export function __or(src, ...compares: any[]) {
    let rst: boolean = false;

    __each(compares, (item) => {
        if (item === src) {
            rst = true;
            return false;
        }
    });

    return rst;
}

/**
 * mu.and()
 * @param src
 * @param compares
 * @private
 */
export function __and(src, ...compares: []) {
    let rst: boolean = true;

    __each(compares, (item) => {
        if (item !== src) {
            rst = false;
            return false;
        }
    });

    return rst;
}

/**
 * mu.upArray
 * 将其他类型数据升级为一维数组
 * @param one
 * @private
 */
export function __upArray(one: any) {
    return _.isArray(one) ? one : [one];
}

/**
 * 数组长度为1的时候，降维返回数组内容
 * @param arr
 * @private
 */
export function __downOne(arr: any[]): any {
    return arr.length === 1 ? arr[0] : arr;
}

/**
 * mu.param
 * as mu.serialize
 * 将对象转为 URL search,
 * 并同时 value encodeURIComponent
 * @param obj
 * @param url
 * @private
 */
export function __param(obj: object, url?: string): string {
    let items = __map(
        __tile(obj),
        (value, key) => {
            if (typeof value === 'string') {
                value = encodeURIComponent(__deepDecodeURIComponent(value));
            }

            return `${key}=${value}`;
        },
        []
    );

    let search = items.join('&');

    if (url) {
        let a = document.createElement('a');
        a.href = url;

        if (a.search.indexOf('?') === 0) {
            a.search = a.search + '&' + search;
        } else {
            a.search = '?' + search;
        }
        return a.href;
    }

    return search;
}

export const __serialize = __param;

/**
 * mu.paramObj
 * as mu.serializeObj
 * 将URL search 转为对象
 * @param serialize
 * @private
 */
export function __param2Obj(serialize: string) {
    let tile = __map(
        serialize.split('&'),
        (name) => {
            let [__key__, __value__] = name.split('=');
            __value__ = __deepDecodeURIComponent(__value__);
            return {
                __key__,
                __value__
            };
        },
        {}
    );

    return __stack(tile);
}

export const __serialize2Obj = __param2Obj;
