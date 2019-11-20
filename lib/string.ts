/**
 * mu.format()
 * 格式化对象
 * @param value
 * @param format
 * @private
 */
import * as _ from 'lodash';
import { __type } from './__type';
import { __ifnvl, __run } from './run';
import { __isNil } from './__theory';
import { __extend } from './object';
import { __multiple } from './math';
import { __each } from './iteratee';
import { Value } from '../type';
const moment = require('moment');

/**
 * 字符创format
 * @param str
 * @param format
 * @private
 *
 * mzmu.format('江山如此多娇, {0}', ['引无数英雄竞折腰'])
 * mzmu.format('江山如此多娇, {content}', {content: '引无数英雄竞折腰'})
 * // => "江山如此多娇, 引无数英雄竞折腰"
 */
export function __stringFormat(str: string, format: any): string {
    let type = __type(format);

    if (type === 'array') {
        return str.replace(/\{(\d+?)\}/g, function(m, i) {
            return __ifnvl(format[i], m);
        });
    } else {
        return str.replace(/\{(.*?)\}/g, function(m, i) {
            return __ifnvl(_.get(format, i), m);
        });
    }
}

function __thousands(num: number | string, count: number = 3, delimiter: string = ','): string {
    let reg = new RegExp(`(\\d{1,${count}})(?=(?:\\d{${count}})+$)`, 'g');
    let str = num + '';
    let [nums] = str.split(/[%kw千万]/);
    let [pInt, pDecimal] = nums.split('.');
    return str.replace(pInt, pInt.replace(reg, `$1${delimiter}`));
}

/**
 * 数据 format
 * @param num
 * @param thousands
 * @param unit
 * @param math: 数学方法
 * @param count: 保留小数位数
 * @private
 */

interface NumberFormatOptions {
    // 千分位，默认值为 => 3
    // 根据千分位规则, 可配置分割位数，匹配 delimiter 显示
    thousands?: number;
    // 千分位分隔符，默认为 => ','
    delimiter?: string;
    // 单位
    unit?: string;
    // 每个数学单位匹配的换算值
    scaler?: number;
    // 数学方法, 默认 => 'round' 四舍五入
    math?: 'round' | 'floor' | 'ceil';
    // 保留小数位数, 不足后置补0
    count?: number;
    // 保留整数位数，不足前置补0，小数舍去
    // leng 不与其他通存
    len?: number;
}

export function __numberFormat(num: number, options: NumberFormatOptions): string {
    let { thousands = 3, unit, scaler, math, count, delimiter, len } = options;
    let rst: number | string = num;

    let unitMap = {
        percent: [100, '%'],
        '%': [100, '%'],
        permile: [1000, '‰'],
        '‰': [1000, '‰'],
        k: [1 / 1000, 'k'],
        w: [1 / 10000, 'w'],
        万: [1 / 10000, '万']
    };

    // 单位换算
    if (unit) {
        if (__isNil(scaler)) {
            [scaler, unit] = unitMap[unit] || [undefined, undefined];
        }

        if (!__isNil(scaler)) {
            // rst = rst as number * 1000;
            // rst = _.multiply(rst, scaler);
            // rst = rst / 1000;
            rst = __multiple(rst, scaler as number);
        }
    }

    // 如果截取小数长度存在，则数学方法默认为四舍五入 round
    if (!__isNil(count)) {
        if (__isNil(math)) {
            math = 'round';
        }
    }

    __run(math, () => {
        count = count || 0;
        let size = Math.abs(count);
        let pow = Math.pow(10, size);
        rst = +rst * pow;
        rst = Math[math as string](rst);
        rst = (rst + '').split('.')[0];
        rst = +rst / pow;

        // 截取固定长度
        if (count < 0) {
            let [pInt, pDecimal] = (rst + '').split('.');
            pDecimal = _.padEnd(pDecimal, size, '0');
            rst = `${pInt}.${pDecimal}`;
        }
    });

    // len不与其他方法并行
    // 直接截断方法
    if (len) {
        return _.padStart(parseInt(rst + '') + '', len, '0');
    }

    // 千分位
    if (thousands) {
        rst = __thousands(rst, thousands, delimiter);
    }

    if (unit) {
        rst = rst + unit;
    }

    return rst as string;
}

export function __dateFormat(date: any, format: string): string {
    let mt = moment(date);
    return mt.format(format);
}

/**
 * 格式化
 * @param value
 * @param format
 * @param dateLike
 * @private
 *
 * * exp.
 *
 * ::: 字符串格式化
 * mu.format('Hello {0}, {1}!', 'Mizi', 'Welcome')
 * // -> "Hello Mizi, Welcome!"
 *
 *  mu.format('Hello {name}, {word}!', {name: 'mizi', word: 'welcome'})
 *  // -> "Hello mizi, welcome!"
 *
 * ::: 时间格式化
 * mu.format( new Date(1458114893684))
 * // -> "2016-03-16"
 *
 * // 第三个参数为 dateLike 标明将格式化的数据看起来像date的另外表现形式
 * mu.format(1458114893684, 'DD/MM/YYYY', true)
 * // -> "2016-03-16"
 *
 * ::: 数字千分位
 * mu.format(1234567890)
 * // -> '1,234,567,890'
 *
 * mu.format(1234567890.5234)
 * // -> '1,234,567,890.5234'
 *
 * mu.format(1234567890.5234, 'round')
 * // -> "1,234,567,891"
 *
 * ::: 截取小数点长度
 * mu.format(0.5264, ':2')
 * // -> '0.53'
 *
 * mu.format(0.5264, 'floor:2')
 * // -> 0.52
 *
 * mu.format(0, ':2')
 * // -> '0'
 *
 * mu.format(0, ':-2')
 * // -> '0.00'
 *
 * ::: 百分比/千分比
 * mu.format(1.2365, '::')
 * // -> "124%"
 *
 * mu.format(1.2365, '::5')
 * // -> "123.65%"
 *
 * mu.format(1.2365, '::-5')
 * // -> "123.65000%"
 *
 * mu.format(1.2365, 'round:permile:2')
 * // -> "1236.5‰"
 */
export function __format(value: Value, format?: any | any[] | NumberFormatOptions, dateLike: boolean = false) {
    let type = __type(value);

    // for date format
    if (_.isBoolean(format) && format) {
        dateLike = true;
        format = 'YYYY-MM-DD';
    }

    if (dateLike) {
        if (moment.isMoment(value) || new Date(value).toString() !== 'Invalid Date') {
            type = 'date';
        }
    }

    switch (type) {
        case 'string':
            return __stringFormat(value, format);
        case 'number':
            let options = {
                thousands: 3
            };

            if (__type(format, 'object')) {
                options = __extend(options, format);
            } else {
                format = format || '';
                format = format.split(':');

                let math, count, unit;
                switch (format.length) {
                    case 1:
                        [math] = format;
                        break;
                    case 2:
                        [math, count] = format;
                        math = math || 'round';
                        break;
                    case 3:
                        [math, unit, count] = format;
                        unit = unit || 'percent';
                        math = math || 'round';
                        break;
                }
                options = __extend(options, { math, unit, count });
            }
            return __numberFormat(value, options);
        case 'date':
            format = format || 'YYYY-MM-DD';
            format = format.replace('yyyy-MM-dd', 'YYYY-MM-DD');
            return __dateFormat(value, format);
        case 'boolean':
            return (format || ['false', 'true'])[value ? 1 : 0];
        default:
            return value.toString();
    }
}

export function __deepDecodeURIComponent(str: string) {
    __each(str.split('%'), () => {
        str = decodeURIComponent(str);
    });
    return str;
}

export const __leftpad = (str: string, length: number, symbol: string = '0') => {
    return _.padStart(str, length, symbol);
};
