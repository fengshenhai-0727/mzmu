import * as _ from 'lodash';

function statement(name: string) {
    return (...args: any[]) => {
        console.error(`该方法(${name})已删除 in mu@v2.0.0`);
    };
}

function warn(msg: string, func: any, ...args: any[]) {
    console.warn(msg, ', support use lodash(_) in mu@v2');
    return func(...args);
}

/**
 * @deprecated
 */
export const have = statement('mu.hava');
/**
 * @deprecated
 */
export const injector = statement('mu.injector');
/**
 * @deprecated
 */

export const isBaseType = statement('mu.isBaseType');
/**
 * @deprecated
 */
export const isDateLike = statement('mu.isDateLike');
/**
 * @deprecated
 */
export const isIf = statement('mu.isIf');
/**
 * @deprecated
 */
export const isNotIf = statement('mu.isNotIf');
/**
 * @deprecated
 */
export const ifif = statement('mu.ifif');
/**
 * @deprecated
 */
export const args = statement('mu.args');
/**
 * @deprecated
 */
export const create = statement('mu.create');
/**
 * @deprecated
 */
export const compare = statement('mu.compare');
/**
 * @deprecated
 */
export const toStringWithType = statement('mu.toStringWithType');
/**
 * @deprecated
 */
export const environment = statement('mu.environment');
/**
 * @deprecated
 */
export const insert = statement('mu.insert');
/**
 * @deprecated
 */
export const flat = statement('mu.flat');
/**
 * @deprecated
 */
export const flatWithBracket = statement('mu.flatWithBracket');
/**
 * @deprecated
 */
export const flatToChain = statement('mu.flatToChain');
/**
 * @deprecated
 */
export const timestamp = statement('mu.timestamp');
/**
 * @deprecated
 */
export const ready = statement('mu.ready');

/**
 * @deprecated
 */
export const isNull = (value: any) => warn('建议使用_.isNull 替换 mu.isNull', _.isNull, value);
/**
 * @deprecated
 */
export const isUndefined = (value: any) => warn('建议使用_.isUndefined 替换 mu.isUndefined', _.isUndefined, value);
/**
 * @deprecated
 */
export const isNumeric = (value: any) => warn('建议使用_.isNumber 替换 mu.isNumeric', _.isNumber, value);
/**
 * @deprecated
 */
export const isInteger = (value: any) => warn('建议使用_.isInteger 替换 mu.isInteger', _.isInteger, value);
/**
 * @deprecated
 */
export const isElement = (value: any) => warn('建议使用_.isElement 替换 mu.isElement', _.isElement, value);
/**
 * @deprecated
 */
export const isDate = (value: any) => warn('建议使用_.isDate 替换 mu.isDate', _.isDate, value);
/**
 * @deprecated
 */
export const isArray = (value: any) => warn('建议使用_.isArray 替换 mu.isArray', _.isArray, value);
/**
 * @deprecated
 * 在 mri 对象特指 对象字面量, Object 构造函数创建, 又或纯对象
 */
export const isObject = (value: any) => warn('建议使用_.isObject 替换 mu.isObject', _.isObject, value);

/**
 * @deprecated
 */
export const isPlainObject = (value: any) => warn('建议使用_.isPlainObject 替换 mu.isPlainObject', _.isPlainObject, value);

/**
 * @deprecated
 */
export const isFunction = (value: any) => warn('建议使用_.isFunction 替换 mu.isFunction', _.isFunction, value);

/**
 * @deprecated
 */
export const isEmptyObject = (value: any) => warn('建议使用_.isEmpty 替换 mu.isEmptyObject', _.isEmpty, value);

/**
 * @deprecated
 */
export const isNotExist = (value: any) => warn('建议使用_.isNil 替换 mu.isNotExist', _.isNil, value);

/**
 * @deprecated
 */
export const isArrayLike = (value: any) => warn('建议使用_.isArrayLike 替换 mu.isArrayLike', _.isArrayLike, value);

/**
 * @deprecated
 */
export const randomInt = (max: number, min: number) => warn('建议使用_.random 替换 mu.randomInt', _.random, max, min);

/**
 * @deprecated
 */
export const first = (value: any[]) => warn('建议使用_.first 替换 mu.first', _.first, value);

/**
 * @deprecated
 */
export const last = (value: any[]) => warn('建议使用_.last 替换 mu.last', _.last, value);

/**
 * @deprecated
 */
export const unique = (value: any[]) => warn('建议使用_.uniq 替换 mu.unique', _.uniq, value);

/**
 * @deprecated
 */
export const intersect = (...values: any[]) => warn('建议使用_.intersection 替换 mu.intersect', _.intersection, ...values);

/**
 * @deprecated
 */
export const union = (...values: any[]) => warn('建议使用_.union 替换 mu.union', _.union, ...values);

/**
 * @deprecated
 */
export const minus = (...values: any[]) => warn('建议使用_.difference 替换 mu.minus', _.difference, ...values);

/**
 * @deprecated
 */
export const complement = (...values: any[]) => warn('建议使用_.xor 替换 mu.complement', _.xor, ...values);

/**
 * @deprecated
 */
export const clean = (value: any[]) => warn('建议使用_.clean 替换 mu.compact', _.compact, value);

/**
 * @deprecated
 */
export const indexOf = (value: any[], key: any, fromIndex?: number) =>
    warn('建议使用_.indexOf 替换 mu.indexOf', _.indexOf, value, key, fromIndex);

/**
 * @deprecated
 */
export const groupArray = (collection: Collection, iteratee: Iteratee<any>) =>
    warn('建议使用_.groupArray 替换 mu.groupBy', _.groupBy, collection, iteratee);

/**
 * @deprecated
 */
export const keys = (obj: any) => warn('建议使用_.keys 替换 mu.keys', _.keys, obj);

/**
 * @deprecated
 */
export const vals = (obj: any) => warn('建议使用_.values 替换 mu.vals', _.values, obj);

/**
 * @deprecated
 */
export const find = (collection: Collection, predicate: any) => warn('建议使用_.find 替换 mu.find', _.find, collection, predicate);

/**
 * @deprecated
 */
export const findIndex = (collection: Collection, predicate: any) =>
    warn('建议使用_.findIndex 替换 mu.findIndex', _.findIndex, collection, predicate);

/**
 * @deprecated
 */
export const prop = (obj: object, path: string) => warn('建议使用_.get 替换 mu.prop', _.get, obj, path);

/**
 * @deprecated
 */
export const pick = (obj: object, iteratee: Iteratee<any>) => warn('建议使用_.pick 替换 mu.pick', _.pick, obj, iteratee);

/**
 * @deprecated
 */
export const bind = (func: MtFunction, context: any, ...args: any[]) =>
    warn('建议使用_.bind 替换 mu.bind', _.bind, func, context, ...args);

/**
 * @deprecated
 */
export const bindAll = (obj: MtObject, ...keys: any[]) => warn('建议使用_.bindAll 替换 mu.bindAll', _.bindAll, obj, ...keys);

/**
 * @deprecated
 */
export const debounce = (func: MtFunction, ms: number) => warn('建议使用_.debounce 替换 mu.debounce', _.debounce, func, ms);

/**
 * @deprecated
 */
export const after = (time: number, func: MtFunction, context?: MtObject) => warn('建议使用_.after 替换 mu.after', _.after, time, func, context);

/**
 * @deprecated
 */
export const trim = (value: string) => warn('建议使用_.trim 替换 mu.trim', _.trim, value);

/**
 * @deprecated
 */
export const concat = (arr: any[], ...values: any[]) => warn('建议使用_.concat 替换 mu.concat', _.concat, arr, ...values);

/**
 * @deprecated
 */
export const now = () => warn('建议使用_.now 替换 mu.now', _.now);


export const intercept = (str: string, max: number, adjust: number, symbol: string) => {
    return _.truncate(str, {
        length: max,
        omission: symbol
    });
};
