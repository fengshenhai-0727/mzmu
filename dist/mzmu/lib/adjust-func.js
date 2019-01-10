"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function statement(name) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error("\u8BE5\u65B9\u6CD5(" + name + ")\u5DF2\u5220\u9664 in mu@v2.0.0");
    };
}
function warn(msg, func) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    console.warn(msg, ', support use lodash(_) in mu@v2');
    return func.apply(void 0, args);
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
exports.isNull = function (value) { return warn('建议使用_.isNull 替换 mu.isNull', _.isNull, value); };
exports.isUndefined = function (value) { return warn('建议使用_.isUndefined 替换 mu.isUndefined', _.isUndefined, value); };
exports.isNumeric = function (value) { return warn('建议使用_.isNumber 替换 mu.isNumeric', _.isNumber, value); };
exports.isInteger = function (value) { return warn('建议使用_.isInteger 替换 mu.isInteger', _.isInteger, value); };
exports.isElement = function (value) { return warn('建议使用_.isElement 替换 mu.isElement', _.isElement, value); };
exports.isDate = function (value) { return warn('建议使用_.isDate 替换 mu.isDate', _.isDate, value); };
exports.isArray = function (value) { return warn('建议使用_.isArray 替换 mu.isArray', _.isArray, value); };
exports.isObject = function (value) { return warn('建议使用_.isObject 替换 mu.isObject', _.isObject, value); };
exports.isPlainObject = function (value) { return warn('建议使用_.isPlainObject 替换 mu.isPlainObject', _.isPlainObject, value); };
exports.isFunction = function (value) { return warn('建议使用_.isFunction 替换 mu.isFunction', _.isFunction, value); };
exports.isEmptyObject = function (value) { return warn('建议使用_.isEmpty 替换 mu.isEmptyObject', _.isEmpty, value); };
exports.isNotExist = function (value) { return warn('建议使用_.isNil 替换 mu.isNotExist', _.isNil, value); };
exports.isArrayLike = function (value) { return warn('建议使用_.isArrayLike 替换 mu.isArrayLike', _.isArrayLike, value); };
exports.randomInt = function (max, min) { return warn('建议使用_.random 替换 mu.randomInt', _.random, max, min); };
exports.first = function (value) { return warn('建议使用_.first 替换 mu.first', _.first, value); };
exports.last = function (value) { return warn('建议使用_.last 替换 mu.last', _.last, value); };
exports.unique = function (value) { return warn('建议使用_.uniq 替换 mu.unique', _.uniq, value); };
exports.intersect = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return warn.apply(void 0, ['建议使用_.intersection 替换 mu.intersect', _.uniq].concat(values));
};
exports.union = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return warn.apply(void 0, ['建议使用_.union 替换 mu.union', _.uniq].concat(values));
};
exports.minus = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return warn.apply(void 0, ['建议使用_.difference 替换 mu.minus', _.difference].concat(values));
};
exports.complement = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return warn.apply(void 0, ['建议使用_.xor 替换 mu.complement', _.xor].concat(values));
};
exports.clean = function (value) { return warn('建议使用_.clean 替换 mu.compact', _.compact, value); };
exports.indexOf = function (value, key, fromIndex) {
    return warn('建议使用_.indexOf 替换 mu.indexOf', _.indexOf, value, key, fromIndex);
};
exports.groupArray = function (collection, iteratee) {
    return warn('建议使用_.groupArray 替换 mu.groupBy', _.groupBy, collection, iteratee);
};
exports.keys = function (obj) { return warn('建议使用_.keys 替换 mu.keys', _.keys, obj); };
exports.vals = function (obj) { return warn('建议使用_.values 替换 mu.vals', _.values, obj); };
exports.remove = function (value, predicate) { return warn('建议使用_.remove 替换 mu.remove', _.values, value, predicate); };
exports.find = function (collection, predicate) { return warn('建议使用_.find 替换 mu.find', _.find, collection, predicate); };
exports.findIndex = function (collection, predicate) {
    return warn('建议使用_.findIndex 替换 mu.findIndex', _.findIndex, collection, predicate);
};
exports.prop = function (obj, path) { return warn('建议使用_.get 替换 mu.prop', _.get, obj, path); };
exports.pick = function (obj, iteratee) { return warn('建议使用_.pick 替换 mu.pick', _.pick, obj, iteratee); };
exports.bind = function (func, context) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return warn.apply(void 0, ['建议使用_.bind 替换 mu.bind', _.bind, func, context].concat(args));
};
exports.bindAll = function (obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    return warn.apply(void 0, ['建议使用_.bindAll 替换 mu.bindAll', _.bindAll, obj].concat(keys));
};
exports.debounce = function (func, ms) { return warn('建议使用_.debounce 替换 mu.debounce', _.debounce, func, ms); };
exports.after = function (time, func, context) { return warn('建议使用_.after 替换 mu.after', _.after, time, func, context); };
exports.trim = function (value) { return warn('建议使用_.trim 替换 mu.trim', _.trim, value); };
exports.concat = function (arr) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    return warn.apply(void 0, ['建议使用_.concat 替换 mu.concat', _.concat, arr].concat(values));
};
exports.now = function () { return warn('建议使用_.now 替换 mu.now', _.now); };
exports.intercept = function (str, max, adjust, symbol) {
    return _.truncate(str, {
        length: max,
        omission: symbol
    });
};
//# sourceMappingURL=adjust-func.js.map