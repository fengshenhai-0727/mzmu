"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function statement(name) {
    return (...args) => {
        console.error(`该方法(${name})已删除 in mu@v2.0.0`);
    };
}
function warn(msg, func, ...args) {
    console.warn(msg, ', support use lodash(_) in mu@v2');
    return func(...args);
}
exports.have = statement('mu.hava');
exports.injector = statement('mu.injector');
exports.isBaseType = statement('mu.isBaseType');
exports.isDateLike = statement('mu.isDateLike');
exports.isIf = statement('mu.isIf');
exports.isNotIf = statement('mu.isNotIf');
exports.ifif = statement('mu.ifif');
exports.args = statement('mu.args');
exports.create = statement('mu.create');
exports.compare = statement('mu.compare');
exports.toStringWithType = statement('mu.toStringWithType');
exports.environment = statement('mu.environment');
exports.insert = statement('mu.insert');
exports.flat = statement('mu.flat');
exports.flatWithBracket = statement('mu.flatWithBracket');
exports.flatToChain = statement('mu.flatToChain');
exports.timestamp = statement('mu.timestamp');
exports.ready = statement('mu.ready');
exports.isNull = (value) => warn('建议使用_.isNull 替换 mu.isNull', _.isNull, value);
exports.isUndefined = (value) => warn('建议使用_.isUndefined 替换 mu.isUndefined', _.isUndefined, value);
exports.isNumeric = (value) => warn('建议使用_.isNumber 替换 mu.isNumeric', _.isNumber, value);
exports.isInteger = (value) => warn('建议使用_.isInteger 替换 mu.isInteger', _.isInteger, value);
exports.isElement = (value) => warn('建议使用_.isElement 替换 mu.isElement', _.isElement, value);
exports.isDate = (value) => warn('建议使用_.isDate 替换 mu.isDate', _.isDate, value);
exports.isArray = (value) => warn('建议使用_.isArray 替换 mu.isArray', _.isArray, value);
exports.isObject = (value) => warn('建议使用_.isObject 替换 mu.isObject', _.isObject, value);
exports.isPlainObject = (value) => warn('建议使用_.isPlainObject 替换 mu.isPlainObject', _.isPlainObject, value);
exports.isFunction = (value) => warn('建议使用_.isFunction 替换 mu.isFunction', _.isFunction, value);
exports.isEmptyObject = (value) => warn('建议使用_.isEmpty 替换 mu.isEmptyObject', _.isEmpty, value);
exports.isNotExist = (value) => warn('建议使用_.isNil 替换 mu.isNotExist', _.isNil, value);
exports.isArrayLike = (value) => warn('建议使用_.isArrayLike 替换 mu.isArrayLike', _.isArrayLike, value);
exports.randomInt = (max, min) => warn('建议使用_.random 替换 mu.randomInt', _.random, max, min);
exports.first = (value) => warn('建议使用_.first 替换 mu.first', _.first, value);
exports.last = (value) => warn('建议使用_.last 替换 mu.last', _.last, value);
exports.unique = (value) => warn('建议使用_.uniq 替换 mu.unique', _.uniq, value);
exports.intersect = (...values) => warn('建议使用_.intersection 替换 mu.intersect', _.uniq, ...values);
exports.union = (...values) => warn('建议使用_.union 替换 mu.union', _.uniq, ...values);
exports.minus = (...values) => warn('建议使用_.difference 替换 mu.minus', _.difference, ...values);
exports.complement = (...values) => warn('建议使用_.xor 替换 mu.complement', _.xor, ...values);
exports.clean = (value) => warn('建议使用_.clean 替换 mu.compact', _.compact, value);
exports.indexOf = (value, key, fromIndex) => warn('建议使用_.indexOf 替换 mu.indexOf', _.indexOf, value, key, fromIndex);
exports.groupArray = (collection, iteratee) => warn('建议使用_.groupArray 替换 mu.groupBy', _.groupBy, collection, iteratee);
exports.keys = (obj) => warn('建议使用_.keys 替换 mu.keys', _.keys, obj);
exports.vals = (obj) => warn('建议使用_.values 替换 mu.vals', _.values, obj);
exports.remove = (value, predicate) => warn('建议使用_.remove 替换 mu.remove', _.values, value, predicate);
exports.find = (collection, predicate) => warn('建议使用_.find 替换 mu.find', _.find, collection, predicate);
exports.findIndex = (collection, predicate) => warn('建议使用_.findIndex 替换 mu.findIndex', _.findIndex, collection, predicate);
exports.prop = (obj, path) => warn('建议使用_.get 替换 mu.prop', _.get, obj, path);
exports.pick = (obj, iteratee) => warn('建议使用_.pick 替换 mu.pick', _.pick, obj, iteratee);
exports.bind = (func, context, ...args) => warn('建议使用_.bind 替换 mu.bind', _.bind, func, context, ...args);
exports.bindAll = (obj, ...keys) => warn('建议使用_.bindAll 替换 mu.bindAll', _.bindAll, obj, ...keys);
exports.debounce = (func, ms) => warn('建议使用_.debounce 替换 mu.debounce', _.debounce, func, ms);
exports.after = (time, func, context) => warn('建议使用_.after 替换 mu.after', _.after, time, func, context);
exports.trim = (value) => warn('建议使用_.trim 替换 mu.trim', _.trim, value);
exports.concat = (arr, ...values) => warn('建议使用_.concat 替换 mu.concat', _.concat, arr, ...values);
exports.now = () => warn('建议使用_.now 替换 mu.now', _.now);
exports.intercept = (str, max, adjust, symbol) => {
    return _.truncate(str, {
        length: max,
        omission: symbol
    });
};
//# sourceMappingURL=adjust-func.js.map