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

export function __isNil(val: any) {
    return val == null;
}

export function __isExist(val: any) {
    return !__isNil(val);
}

export function __isFalse(val: any) {
    return !val;
}

export function __isEmpty(val?: any) {
    var rst = !val;

    if(!rst) {
        switch(__type(val)) {
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

export function __isNotEmpty(val?: any) {
    return !__isEmpty(val);
}