"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var __theory_1 = require("./__theory");
var run_1 = require("./run");
var iteratee_1 = require("./iteratee");
var __type_1 = require("./__type");
function __extend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (__theory_1.__isEmpty(args)) {
        return void 0;
    }
    var _a = run_1.__exist(args.shift(), function (value) {
        return __type_1.__type(value, 'boolean') ? [value, args.shift(), args] : [false, value, args];
    }), deep = _a[0], src = _a[1], targets = _a[2];
    iteratee_1.__each(targets, function (item) {
        iteratee_1.__each(item, function (value, key) {
            var srcValue = src[key];
            if (value === srcValue) {
                return false;
            }
            if (deep && __theory_1.__isExist(srcValue) && (_.isPlainObject(value) || _.isArray(value))) {
                src[key] = __extend(true, srcValue, value);
            }
            else {
                src[key] = value;
            }
        });
    });
    return src;
}
exports.__extend = __extend;
function __tile(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }
    var isBaseType = function (item) { return __type_1.__type(item, 'string', 'number', 'function', 'regex', 'symbol', 'null', 'undefined'); };
    var path = function (key, context) {
        if (typeof key === 'number' && __type_1.__type(context, 'array')) {
            return "[" + key + "]";
        }
        return key;
    };
    var rst = {};
    iteratee_1.__each(obj, function (item, key, context) {
        var k = path(key, context);
        if (isBaseType(item)) {
            rst[k] = item;
        }
        else {
            iteratee_1.__each(__tile(item), function (subItem, subKey, subContext) {
                var kk = path(subKey, subContext);
                rst[k + "." + kk] = subItem;
            });
        }
    });
    return rst;
}
exports.__tile = __tile;
function __stack(obj) {
    var rst = {};
    iteratee_1.__each(obj, function (value, key) {
        _.set(rst, key, value);
    });
    return rst;
}
exports.__stack = __stack;
exports.__untile = __stack;
//# sourceMappingURL=object.js.map