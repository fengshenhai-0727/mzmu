/**
 * 如果val是个函数，那就执行它，prams就是它的参数
 * 否则就返回自己
 * @param val
 * @param params
 * @private
 */

export function __sofunc(val: any, ...params: any[]) {
    if (typeof val === 'function') {
        return val.apply(this, params);
    }
    return val;
}
