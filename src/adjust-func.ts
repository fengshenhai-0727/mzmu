import * as _ from 'lodash';

function statement() {
    console.error('该方法已删除 in mu@v2.0.0');
}

export const have = statement;
export const injector = statement;
export const isBaseType = statement;
export const isDateLike = statement;
export const isIf = statement;
export const isNotIf = statement;
export const ifif = statement;
export const args = statement;
export const create = statement;
export const compare = statement;
export const toStringWithType = statement;
export const environment = statement;
export const insert = statement;
export const flat = statement;
export const flatWithBracket = statement;
export const flatToChain = statement;
export const timestamp = statement;

export const isNull = _.isNull;
export const isUndefined = _.isUndefined;
export const isNumeric = _.isNumber;
export const isInteger = _.isInteger;
export const isElement = _.isElement;
export const isDate = _.isDate;
export const isArray = _.isArray;
// 在 mri 对象特指 对象字面量, Object 构造函数创建, 又或纯对象
export const isObject = _.isPlainObject;
export const isPlainObject = _.isPlainObject;
export const isFunction = _.isFunction;
export const isEmptyObject = _.isEmpty;
export const isNotEmpty = !_.isEmpty;
export const isNotExist = _.isNil;
export const isArrayLike = _.isArrayLike;
export const randomInt = _.random;
export const first = _.first;
export const last = _.last;
export const unique = _.uniq;
export const intersect = _.intersection;
export const union = _.union;
export const minus = _.difference;
export const complement = _.xor;
export const clean = _.compact;
export const indexOf = _.indexOf;
export const groupArray = _.groupBy;
export const keys = _.keys;
export const vals = _.values;
export const remove = _.remove;
export const find = _.find;
export const findIndex = _.findIndex;
export const prop = _.get;
export const pick = _.pick;
export const bind = _.bind;
export const bindAll = _.bindAll;
export const debounce = _.debounce;
export const after = _.after;
export const trim = _.trim;
export const concat = _.concat;
export const now = _.now;

export const leftpad = (str: string, length: number, symbol: string = '0') => {
    return _.padStart(str, length, symbol);
};

export const intercept = (str: string, max: number, adjust: number, symbol: string) => {
    return _.truncate(str, {
        length: max,
        omission: symbol
    });
};
export function isWindow(win) {
    return !!(win && win === win.window);
}
