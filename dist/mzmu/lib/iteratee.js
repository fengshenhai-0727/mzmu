"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const __type_1 = require("./__type");
const run_1 = require("./run");
const __theory_1 = require("./__theory");
function __each(collection, iteratee) {
    if (_.isString(collection)) {
        collection = collection.split('');
        return __each(collection, iteratee);
    }
    if (_.isInteger(collection) && collection > 0) {
        collection = new Array(collection);
        return __each(collection, iteratee);
    }
    if (_.isNil(collection)) {
        return void 0;
    }
    return _.each(collection, iteratee);
}
exports.__each = __each;
function __map(collection, iteratee, target = []) {
    let type = __type_1.__type(target);
    if (!__theory_1.__isEmpty(target)) {
        console.warn('target must be empty object or array');
        target = type === 'array' ? [] : {};
    }
    collection = _.cloneDeep(collection);
    __each(collection, (value, key, context) => {
        let rst = iteratee(value, key, context);
        if (rst !== '::BREAK' || rst !== '__remove_map__') {
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