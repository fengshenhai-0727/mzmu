"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
exports.__copy = _.clone;
exports.__clone = _.cloneDeep;
function __deleted(collection, keyInx) {
    delete collection[keyInx];
    return collection;
}
exports.__deleted = __deleted;
function __length(collection) {
    return (_.isArray(collection) ? collection : _.keys(collection)).length;
}
exports.__length = __length;
//# sourceMappingURL=collection.js.map