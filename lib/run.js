import { __sofunc } from './__sofunc';
import { __noop } from './__noop';
import { __isEmpty, __isNil } from './__theory';
/**
 * mu.empty(val: any, trueFunc: SoFunc, falseFunc: SoFunc = __noop)
 * 如果为空，则输出
 * @param val
 * @param trueFunc
 * @param falseFunc
 * @private
 *
 * mu.empty([], (item) => {
 *   return 'empty';
 * }, () => {
 *   return 'no empty';
 * });
 *
 * // => 'empty'
 */
export function __empty(val, trueFunc, falseFunc = __noop) {
    return __isEmpty(val) ? __sofunc(trueFunc, val) : __sofunc(falseFunc, val);
}
// todo format
/**
 * mu.ifempty(val: any, trueValue: Value, falseValue?: Value)
 * @param val
 * @param trueValue
 * @param falseValue
 * @private
 *
 * mu.ifempty({}, [])
 * // => []
 *
 * mu.ifempty('abc', [])
 * // => 'abc'
 *
 * mu.ifempty('abc', [], 'def')
 * // => 'def'
 */
export function __ifempty(val, trueValue, falseValue) {
    falseValue = __isNil(falseValue) ? val : falseValue;
    return __isEmpty(val) ? trueValue : falseValue;
}
/**
 * mu.ifnvl(val: any, trueValue: Value, falseValue?: Value)
 * @param val
 * @param trueValue
 * @param falseValue
 * @private
 *
 * mu.ifnvl(void 0, 'aaa')
 * mu.ifnvl('bbbb', 'ccccc', 'BBBBB')
 */
export function __ifnvl(val, trueValue, falseValue) {
    falseValue = __isNil(falseValue) ? val : falseValue;
    return __isNil(val) ? trueValue : falseValue;
}
/**
 * mu.exist(val: any, trueFunc: SoFunc, falseFunc: SoFunc = __noop)
 * @param val
 * @param trueFunc
 * @param falseFunc
 * @private
 */
export function __exist(val, trueFunc, falseFunc = __noop) {
    return !__isNil(val) ? __sofunc(trueFunc, val) : __sofunc(falseFunc, val);
}
/**
 * mu.exist(val: any, trueFunc: SoFunc, falseFunc: SoFunc = __noop)
 * @param val
 * @param trueFunc
 * @param falseFunc
 * @private
 */
export function __if(val, trueFunc, falseFunc = __noop) {
    return val ? __sofunc(trueFunc, val) : __sofunc(falseFunc, val);
}
/**
 * mu.run(val: any, trueFunc?: SoFunc, falseFunc?: SoFunc)
 * 在mu.empty上更进一步, val 若为函数，先运行后进行判断
 * so mu.run(func) 支持单函数，就是一种闭包的某种写法
 * @param val
 * @param trueFunc
 * @param falseFunc
 * @private
 *
 * # 类似闭包的写法
 * mu.run(() => {
 *      ...
 * })
 *
 * # 三元写法
 * mu.run(condition, trueFunc, falseFunc)
 */
export function __run(val, trueFunc, falseFunc) {
    let rst = __sofunc(val);
    // 如果trueFunc和falseFunc都不存在
    if (__isNil(trueFunc) && __isNil(falseFunc)) {
        return rst;
    }
    return __isEmpty(rst) ? __sofunc(falseFunc, rst) : __sofunc(trueFunc, rst);
}
