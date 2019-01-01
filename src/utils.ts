import * as _ from 'lodash';
import { __type } from './__type';
import { __each } from './iteratee';

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
export function __or(src, ...compares: []) {
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

export function __upArray(one: any) {
    return _.isArray(one) ? one : [one];
}
