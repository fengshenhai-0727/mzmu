"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iteratee_1 = require("./iteratee");
function getDecimalLen(num) {
    var decimals = (num + '').split('.')[1] || '';
    return decimals.length;
}
function __add() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var max = Math.max.apply(Math, iteratee_1.__map(nums, function (num) { return getDecimalLen(num); }));
    var rst = 0;
    var pow = Math.pow(10, max);
    iteratee_1.__each(nums, function (num) {
        rst = rst + num * pow;
    });
    return rst / pow;
}
exports.__add = __add;
function __subtract() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var first = nums.shift();
    nums = iteratee_1.__map(nums, function (num) { return -num; });
    return __add.apply(this, [first].concat(nums));
}
exports.__subtract = __subtract;
function __multiple(num1, num2) {
    var pow1 = Math.pow(10, getDecimalLen(num1));
    var pow2 = Math.pow(10, getDecimalLen(num2));
    return (num1 * pow1 * (num2 * pow2)) / (pow1 * pow2);
}
exports.__multiple = __multiple;
function __divide(num1, num2) {
    var pow1 = Math.pow(10, getDecimalLen(num1));
    var pow2 = Math.pow(10, getDecimalLen(num2));
    return (num1 * pow1) / (num2 * pow2) / (pow1 / pow2);
}
exports.__divide = __divide;
//# sourceMappingURL=math.js.map