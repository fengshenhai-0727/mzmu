"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var __type_1 = require("./__type");
var run_1 = require("./run");
var mu_const_1 = require("../mu-const");
var utils_1 = require("./utils");
function __each(collection, iteratee) {
    if (_.isString(collection)) {
        collection = collection.split('');
        return __each(collection, iteratee);
    }
    if (_.isInteger(collection) && collection > 0) {
        collection = new Array(collection);
        collection = _.map(collection, function (v, inx) { return inx + 1; });
        return __each(collection, iteratee);
    }
    if (_.isNil(collection)) {
        return void 0;
    }
    return _.each(collection, iteratee);
}
exports.__each = __each;
function __map(collection, iteratee, target) {
    var type = __type_1.__type(target || collection);
    target = type === 'object' ? {} : [];
    collection = _.cloneDeep(collection);
    __each(collection, function (value, key, context) {
        var rst = iteratee(value, key, context);
        if (rst === mu_const_1.MU.MAP_BREAK) {
            return false;
        }
        if (!utils_1.__or(rst, mu_const_1.MU.MAP_SKIP, mu_const_1.MU.MAP_REMOVE)) {
            if (type === 'object') {
                if (_.has(rst, '__key__')) {
                    target[rst.__key__] = run_1.__ifnvl(rst.__value__, rst.__val__);
                }
                else {
                    target[key] = rst;
                }
            }
            else {
                target.push(rst);
            }
        }
    });
    return target;
}
exports.__map = __map;
//# sourceMappingURL=iteratee.js.map