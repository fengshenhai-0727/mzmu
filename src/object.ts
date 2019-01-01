import * as _ from 'lodash';
import { __isNil, __isEmpty } from './__theory';
import { __ifnvl, __run } from './run';
import { __each } from './iteratee';
import { __type } from './__type';

/**
 * mu.extend(isDeep: boolean, ...targets: any[])
 * 将两个或更多对象的内容合并到第一个对象
 * 从最后一个target合并到倒数第二个，以此类推
 * isDeep = true, 合并为递归，实现深拷贝
 * @param targets
 * @private
 * @return 一个新的对象
 */
export function __extend(...targets: any[]): any {
    let [deep, target] = __run(targets.shift(), (value) => {
        return __type(value, 'boolean') ? [value, targets.shift()] : [false, value];
    });

    if (__isEmpty(targets)) {
        return __extend(deep, {}, targets);
    }

    let key: string, sval, tval;

    __each(targets, (item) => {
        for (key in item) {
            sval = target[key];
            tval = item[key];

            if (sval === tval) {
                continue;
            }
            if (deep && tval && (_.isPlainObject(tval) || _.isArray(tval))) {
                target[key] = __extend(true, sval, tval);
            } else if (item !== undefined) {
                target[key] = tval;
            }
        }
    });

    return target;
}
