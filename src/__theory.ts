/**
 * 判断是否为空
 * @param val
 * @private
 */
import * as _ from 'lodash';

// 讨论
// 虚值(不存在的值Nil | nvl), 假值(False), 空值(empty)

// 虚值: null 或 undefined
// 假值: 使用运算符if计算出来的假值, 包括 null, undefined, 0, ''(空字符串)
// 空值: 在假值的基础上，添加 空对象，空数组，空字符串

export function __isNil(val: any) {
    return val == null;
}

export function __isFalse(val: any) {
    return !val;
}

export function __isEmpty(val?: any) {
    return !val ? true : _.isEmpty(val) ? true : typeof val === 'string' ? !val.replace(/\s{0,}/g, '').length : false;
}
