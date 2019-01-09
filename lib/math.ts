/**
 * JS世界的浮点数计算
 * 0.1+ 0.2 = 0.30000000000000004 ? why
 * 在JS中，浮点数计算，会先转为二进制
 * 0.1 => 0.0001 1001 1001 1001…（无限循环）
 * 0.2 => 0.0011 0011 0011 0011…（无限循环）
 * 计算机是不允许无限循环的，对于无限循环的小数，计算机会进行舍入处理。
 * 进行双精度浮点数的小数部分最多支持 52 位，
 * 所以两者相加之后得到这么一串 0.0100110011001100110011001100110011001100110011001100
 * 因浮点数小数位的限制而截断的二进制数字，这时候，我们再把它转换为十进制，就成了 0.30000000000000004
 */
import { __map, __each } from './iteratee';

function getDecimalLen(num: number) {
    let decimals = (num + '').split('.')[1] || '';
    return decimals.length;
}

export function __add(...nums: number[]) {
    let max = Math.max(...__map(nums, (num) => getDecimalLen(num)));
    let rst: number = 0;
    let pow = Math.pow(10, max);
    __each(nums, (num) => {
        rst = rst + num * pow;
    });
    return rst / pow;
}

export function __subtract(...nums: number[]) {
    let first = nums.shift();
    nums = __map(nums, (num) => -num);
    return __add.apply(this, [first, ...nums]);
}

export function __multiple(num1: number, num2: number) {
    let pow1 = Math.pow(10, getDecimalLen(num1));
    let pow2 = Math.pow(10, getDecimalLen(num2));
    return (num1 * pow1 * (num2 * pow2)) / (pow1 * pow2);
}

export function __divide(num1: number, num2: number) {
    let pow1 = Math.pow(10, getDecimalLen(num1));
    let pow2 = Math.pow(10, getDecimalLen(num2));
    return (num1 * pow1) / (num2 * pow2) / (pow1 / pow2);
}
