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
export function __isBaseType(value) {
    return Object(value) !== value;
}
/**
 * mu.isWindow
 * @param value
 * @private
 */
export function __isWindow(value) {
    return Object(value) !== value;
}
