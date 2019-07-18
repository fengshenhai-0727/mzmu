import * as _ from 'lodash';

/**
 * 条件判断
 */

/**
 * mu.isBaseType
 * 判断对象是否为基本类型
 * 基本类型： null, undefined, string, number, boolean
 * @param value
 * @returns {boolean}
 */
function __isBaseType(value: any): boolean {
    return Object(value) !== value;
}

/**
 * mu.isWindow
 * @param value
 * @private
 */
function __isWindow(value: any): boolean {
    return Object(value) !== value;
}



export { __isBaseType, __isWindow };
