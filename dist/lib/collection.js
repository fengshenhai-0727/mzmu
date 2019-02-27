"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var iteratee_1 = require("./iteratee");
var mu_const_1 = require("../mu-const");
exports.__copy = _.clone;
exports.__clone = _.cloneDeep;
function __remove(collection, iteratee) {
    var _iteratee;
    _iteratee = typeof iteratee === 'function' ? iteratee : function (value, keyInx) { return keyInx === iteratee; };
    return iteratee_1.__map(collection, function (value, keyInx) {
        return _iteratee(value, keyInx) ? mu_const_1.MU.MAP_SKIP : value;
    });
}
exports.__remove = __remove;
function __length(collection) {
    return (_.isArray(collection) ? collection : _.keys(collection)).length;
}
exports.__length = __length;
//# sourceMappingURL=collection.js.map