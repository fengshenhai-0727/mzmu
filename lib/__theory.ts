/**
 * 判断是否为空
 * @param val
 * @private
 */
import * as _ from 'lodash';
import { __type } from './__type';

// 讨论
// 虚值(不存在的值Nil | nvl), 假值(False), 空值(empty)

// 虚值: null 或 undefined
// 假值: 使用运算符if计算出来的假值, 包括 null, undefined, 0, ''(空字符串)
// 空值: 在假值的基础上，添加 空对象，空数组，空字符串

/**
 * mu.isNil
 * 当values每一项均为 undefined or null 的时候返回true
 */
export function __isNil(...values: any[]) {
    let rst = true;
    _.each(values, (value: any) => {
        if (!_.isNil(value)) {
            rst = false;
            return false;
        }
    });
    return rst;
}

export function __isExist(...values: any[]) {
    let rst = true;
    _.each(values, (value: any) => {
        if (_.isNil(value)) {
            rst = false;
            return false;
        }
    });
    return rst;
}

function __isEmpty__(val?: any) {
    var rst = !val;

    if (!rst) {
        switch (__type(val)) {
            case 'string':
                var s = val.replace(/(^\s*)|(\s*$)/g, '');
                rst = s.length === 0 || s === '0';
                break;
            case 'array':
                rst = val.length === 0;
                break;
            case 'object':
                rst = _.isEmpty(val);
                break;
        }
    }

    return rst;
}

export function __isEmpty(...values: any[]) {
    let rst = true;
    _.each(values, (value: any) => {
        if (!__isEmpty__(value)) {
            rst = false;
            return false;
        }
    });
    return rst;
}

export function __isNotEmpty(...values: any[]) {
    let rst = true;
    _.each(values, (value: any) => {
        if (__isEmpty__(value)) {
            rst = false;
            return false;
        }
    });
    return rst;
}
