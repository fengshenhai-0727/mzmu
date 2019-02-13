"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var __type_1 = require("./__type");
var iteratee_1 = require("./iteratee");
var object_1 = require("./object");
var string_1 = require("./string");
function __reorigin(value) {
    return {
        string: '',
        number: 0,
        date: new Date(0),
        regex: new RegExp(void 0),
        object: {},
        array: [],
        function: _.noop
    }[__type_1.__type(value)];
}
exports.__reorigin = __reorigin;
function __or(src) {
    var compares = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        compares[_i - 1] = arguments[_i];
    }
    var rst = false;
    iteratee_1.__each(compares, function (item) {
        if (item === src) {
            rst = true;
            return false;
        }
    });
    return rst;
}
exports.__or = __or;
function __and(src) {
    var compares = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        compares[_i - 1] = arguments[_i];
    }
    var rst = true;
    iteratee_1.__each(compares, function (item) {
        if (item !== src) {
            rst = false;
            return false;
        }
    });
    return rst;
}
exports.__and = __and;
function __upArray(one) {
    return _.isArray(one) ? one : [one];
}
exports.__upArray = __upArray;
function __param(obj, url) {
    var items = iteratee_1.__map(object_1.__tile(obj), function (value, key) {
        if (typeof value === 'string') {
            value = encodeURIComponent(string_1.__deepDecodeURIComponent(value));
        }
        return key + "=" + value;
    }, []);
    var search = items.join('&');
    if (url) {
        var a = document.createElement('a');
        a.href = url;
        if (a.search.indexOf('?') === 0) {
            a.search = a.search + '&' + search;
        }
        else {
            a.search = '?' + search;
        }
        return a.href;
    }
    return search;
}
exports.__param = __param;
exports.__serialize = __param;
function __param2Obj(serialize) {
    var tile = iteratee_1.__map(serialize.split('&'), function (name) {
        var _a = name.split('='), __key__ = _a[0], __value__ = _a[1];
        __value__ = string_1.__deepDecodeURIComponent(__value__);
        return {
            __key__: __key__,
            __value__: __value__
        };
    }, {});
    return object_1.__stack(tile);
}
exports.__param2Obj = __param2Obj;
exports.__serialize2Obj = __param2Obj;
//# sourceMappingURL=utils.js.map