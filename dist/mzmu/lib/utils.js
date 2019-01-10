"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const __type_1 = require("./__type");
const iteratee_1 = require("./iteratee");
const object_1 = require("./object");
const string_1 = require("./string");
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
function __or(src, ...compares) {
    let rst = false;
    iteratee_1.__each(compares, (item) => {
        if (item === src) {
            rst = true;
            return false;
        }
    });
    return rst;
}
exports.__or = __or;
function __and(src, ...compares) {
    let rst = true;
    iteratee_1.__each(compares, (item) => {
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
    let items = iteratee_1.__map(object_1.__tile(obj), (value, key) => {
        if (typeof value === 'string') {
            value = encodeURIComponent(string_1.__deepDecodeURIComponent(value));
        }
        return `${key}=${value}`;
    }, []);
    let search = items.join('&');
    if (url) {
        let a = document.createElement('a');
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
    let tile = iteratee_1.__map(serialize.split('&'), (name) => {
        let [__key__, __value__] = name.split('=');
        __value__ = string_1.__deepDecodeURIComponent(__value__);
        return {
            __key__,
            __value__
        };
    }, {});
    return object_1.__stack(tile);
}
exports.__param2Obj = __param2Obj;
exports.__serialize2Obj = __param2Obj;
//# sourceMappingURL=utils.js.map