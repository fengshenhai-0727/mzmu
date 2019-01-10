"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iteratee_1 = require("./iteratee");
function __transpose(arr) {
    return iteratee_1.__map(arr[0], function (v, i) {
        return iteratee_1.__map(arr, function (items) {
            return items[i];
        });
    });
}
exports.__transpose = __transpose;
//# sourceMappingURL=array.js.map