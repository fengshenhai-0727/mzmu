import { __map } from './iteratee';

/**
 * 顺时针旋转数组 90°
 * @param arr
 * @private
 */
export function __transpose(arr: any[]) {
    return __map(arr[0], function(v, i) {
        return __map(arr, function(items) {
            return items[i];
        });
    });
}
