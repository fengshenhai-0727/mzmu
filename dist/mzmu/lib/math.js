"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iteratee_1 = require("./iteratee");
function getDecimalLen(num) {
    let decimals = (num + '').split('.')[1] || '';
    return decimals.length;
}
function __add(...nums) {
    let max = Math.max(...iteratee_1.__map(nums, (num) => getDecimalLen(num)));
    let rst = 0;
    let pow = Math.pow(10, max);
    iteratee_1.__each(nums, (num) => {
        rst = rst + num * pow;
    });
    return rst / pow;
}
exports.__add = __add;
function __subtract(...nums) {
    let first = nums.shift();
    nums = iteratee_1.__map(nums, (num) => -num);
    return __add.apply(this, [first, ...nums]);
}
exports.__subtract = __subtract;
function __multiple(num1, num2) {
    let pow1 = Math.pow(10, getDecimalLen(num1));
    let pow2 = Math.pow(10, getDecimalLen(num2));
    return (num1 * pow1 * (num2 * pow2)) / (pow1 * pow2);
}
exports.__multiple = __multiple;
function __divide(num1, num2) {
    let pow1 = Math.pow(10, getDecimalLen(num1));
    let pow2 = Math.pow(10, getDecimalLen(num2));
    return (num1 * pow1) / (num2 * pow2) / (pow1 / pow2);
}
exports.__divide = __divide;
//# sourceMappingURL=math.js.map