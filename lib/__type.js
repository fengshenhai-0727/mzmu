/**
 * mu.type(type: string, compareType?: string)
 *
 * 只判断基本类型
 * @param val!: 需要判断的类型
 * @param compareTypes?: 需要比较的类型，若为多个，则以或结果输出
 */
export function __type(val, ...compareTypes) {
    if (compareTypes.length) {
        let type = __type(val);
        let rst;
        for (let i = 0, len = compareTypes.length; i < len; i++) {
            if (type.toLowerCase() === compareTypes[i].toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    if (val === null || val === undefined) {
        return String(val);
    }
    let propCallType = Object.prototype.toString.call(Object(val));
    let type = propCallType.replace(/\[object (.*)]/g, '$1');
    type = type.replace(/.*(Element)$/i, '$1');
    return type.toLowerCase();
}
