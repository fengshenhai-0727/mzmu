"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const __theory_1 = require("./__theory");
const run_1 = require("./run");
const iteratee_1 = require("./iteratee");
const __type_1 = require("./__type");
function __extend(...args) {
    if (__theory_1.__isEmpty(args)) {
        return void 0;
    }
    let [deep, src, targets] = run_1.__exist(args.shift(), (value) => {
        return __type_1.__type(value, 'boolean') ? [value, args.shift(), args] : [false, value, args];
    });
    iteratee_1.__each(targets, (item) => {
        iteratee_1.__each(item, (value, key) => {
            let srcValue = src[key];
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
    let isBaseType = (item) => __type_1.__type(item, 'string', 'number', 'function', 'regex', 'symbol', 'null', 'undefined');
    let path = (key, context) => {
        if (typeof key === 'number' && __type_1.__type(context, 'array')) {
            return `[${key}]`;
        }
        return key;
    };
    let rst = {};
    iteratee_1.__each(obj, (item, key, context) => {
        let k = path(key, context);
        if (isBaseType(item)) {
            rst[k] = item;
        }
        else {
            iteratee_1.__each(__tile(item), (subItem, subKey, subContext) => {
                let kk = path(subKey, subContext);
                rst[`${k}.${kk}`] = subItem;
            });
        }
    });
    return rst;
}
exports.__tile = __tile;
function __stack(obj) {
    let rst = {};
    iteratee_1.__each(obj, (value, key) => {
        _.set(rst, key, value);
    });
    return rst;
}
exports.__stack = __stack;
exports.__untile = __stack;
//# sourceMappingURL=object.js.map