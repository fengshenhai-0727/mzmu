import * as _ from 'lodash';
import { __type } from './__type';
import { __ifnvl } from './run';
import { __isEmpty } from './__theory';
import { MU } from '../mu';
import { __or } from './utils';
import { Collection, Iteratee, Many } from '../type';

// 迭代器

/**
 * mu.each(collection: Collection | string | number, iteratee: Iteratee<void | boolean>)
 * 遍历迭代器
 * 支持数组和字符串遍历
 * 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出
 *
 * @param collection
 * @param iteratee
 * @private
 */
export function __each(collection: Collection | string | number, iteratee: Iteratee<void | boolean>): void {
    if (_.isNil(collection)) {
        return void 0;
    }

    if (typeof collection === 'string') {
        collection = (collection as string).split('');
        return __each(collection, iteratee);
    }

    if (_.isInteger(collection) && collection > 0) {
        collection = new Array(collection);
        collection = _.map(collection, (v, inx) => inx + 1);
        return __each(collection, iteratee);
    }

    /**
     * fix with mizi.20190909
     * _.each 会遍历 likeArray 的对象，如 对象中有 length 的属性
     * 修改后使用 forOwn 避免出现如此情况
     */
    return _.forOwn(collection, iteratee);
}

/**
 * mu.map(collection: Collection | string | number, iteratee: Iteratee<Many<any | '::SKIP' | '__remove_map__'>>, target: Collection)
 *
 * 史上最强的map函数
 *
 * 返回一个基于target的Collection对象, 其每一项值为 iteratee 遍历后返回的结果;
 * 若返回'::SKIP' | '__remove_map__', 则跳过当前项
 *
 * @param collection
 * @param iteratee
 * @param target
 * @private

 * mu.map([1,2,3], function(v, i){ return v*2; })
 * // -> [2, 4, 6]
 *
 * mu.map({a: 'Mizi', b: 'Zichu'}, function(v, k){ return v + ' Lin'})
 * // -> {a: 'Mizi Lin', b: 'Zichu Lin'}
 *
 * ## 移除数组中的 undefined, 返回新数组
 * mu.map([1, undefined, undefined, 3], function(v, i){
 *    if(v === undefined){
 *      return '__remove_map__';
 *    }else{
 *      return v;
 *    }
 * })
 *
 * // -> [1, 3]
 *
 * ## 将数组转为对象, 用数组的索引最为对象的key, 值为值
 * mu.map(['mizi', 'zichu', 'xiaoming'], function(v){return v;}, {});
 * // ->  {0: 'mizi', 1: 'zichu', 2: 'xiaoming'}
 *
 * ## 将数组转为对象, 值为key, 索引为值
 * mu.map(['mizi', 'zichu', 'xiaoming'], function(v, i){
 *    return {
 *      '__key__': v,
 *      '__val__': i
 *    };
 * }, {});
 * // -> {mizi: 0, zichu: 1, xiaoming: 2}
 *
 * ## 将对象转为一维数组, 值为数组值
 * mu.map({a:'mizi', b: 'zichu'}, function(v){ return v; }, [])
 * // -> ['mizi', 'zichu']
 *
 */

export function __map(collection: Collection | string | number, iteratee: Iteratee<Many<any | '__remove_map__'>>, target?: [] | {}): any {
    let type = __type(target || collection);
    let _target = type === 'object' ? {} : [];

    collection = _.cloneDeep(collection);
    __each(collection, (value, key, context) => {
        let rst = iteratee(value, key, context);

        if (rst === MU.MAP_BREAK) {
            return false;
        }

        if (!__or(rst, MU.MAP_SKIP, MU.MAP_REMOVE)) {
            if (type === 'object') {
                if (_.has(rst, '__key__')) {
                    _target[rst.__key__] = __ifnvl(rst.__value__, rst.__val__);
                } else {
                    _target[key] = rst;
                }
            } else {
                (_target as any[]).push(rst);
            }
        }
    });

    return _target;
}
