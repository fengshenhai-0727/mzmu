"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const moment_1 = require("moment");
const __type_1 = require("./__type");
const run_1 = require("./run");
const __theory_1 = require("./__theory");
const object_1 = require("./object");
const math_1 = require("./math");
const iteratee_1 = require("./iteratee");
function __stringFormat(str, format) {
    let type = __type_1.__type(format);
    if (type === 'array') {
        return str.replace(/\{(\d+)\}/g, function (m, i) {
            return run_1.__ifnvl(format[i], m);
        });
    }
    else {
        return str.replace(/\{(.*?)\}/g, function (m, i) {
            return run_1.__ifnvl(_.get(format, i), m);
        });
    }
}
exports.__stringFormat = __stringFormat;
function __thousands(num, count = 3, delimiter = ',') {
    let reg = new RegExp(`(\\d{1,${count}})(?=(?:\\d{${count}})+$)`, 'g');
    let str = num + '';
    let [nums] = str.split(/[%kw千万]/);
    let [pInt, pDecimal] = nums.split('.');
    return str.replace(pInt, pInt.replace(reg, `$1${delimiter}`));
}
function __numberFormat(num, options) {
    let { thousands = 3, unit, scaler, math, count, delimiter, len } = options;
    let rst = num;
    let unitMap = {
        percent: [100, '%'],
        '%': [100, '%'],
        permile: [1000, '‰'],
        '‰': [1000, '‰'],
        k: [1 / 1000, 'k'],
        w: [1 / 10000, 'w'],
        万: [1 / 10000, '万']
    };
    if (unit) {
        if (__theory_1.__isNil(scaler)) {
            [scaler, unit] = unitMap[unit] || [undefined, undefined];
        }
        if (!__theory_1.__isNil(scaler)) {
            rst = math_1.__multiple(rst, scaler);
        }
    }
    if (!__theory_1.__isNil(count)) {
        if (__theory_1.__isNil(math)) {
            math = 'round';
        }
    }
    run_1.__run(math, () => {
        count = count || 0;
        let size = Math.abs(count);
        let pow = Math.pow(10, size);
        rst = +rst * pow;
        rst = Math[math](rst);
        rst = (rst + '').split('.')[0];
        rst = +rst / pow;
        if (count < 0) {
            let [pInt, pDecimal] = (rst + '').split('.');
            pDecimal = _.padEnd(pDecimal, size, '0');
            rst = `${pInt}.${pDecimal}`;
        }
    });
    if (len) {
        return _.padStart(parseInt(rst + '') + '', len, '0');
    }
    if (thousands) {
        rst = __thousands(rst, thousands, delimiter);
    }
    if (unit) {
        rst = rst + unit;
    }
    return rst;
}
exports.__numberFormat = __numberFormat;
function __dateFormat(date, format) {
    let mt = moment_1.default(date);
    return mt.format(format);
}
exports.__dateFormat = __dateFormat;
function __format(value, format, dateLike = false) {
    let type = __type_1.__type(value);
    if (_.isBoolean(format) && format) {
        dateLike = true;
        format = 'YYYY-MM-DD';
    }
    if (dateLike) {
        if (moment_1.default.isMoment(value) || new Date(value).toString() !== 'Invalid Date') {
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
            if (__type_1.__type(format, 'object')) {
                options = object_1.__extend(options, format);
            }
            else {
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
                options = object_1.__extend(options, { math, unit, count });
            }
            return __numberFormat(value, options);
        case 'date':
            format = format || 'YYYY-MM-DD';
            format = format.replace('yyyy-MM-dd', 'YYYY-MM-DD');
            return __dateFormat(value, format);
        case 'boolean':
            return (format || ['false', 'true'])[value ? 1 : 0];
    }
}
exports.__format = __format;
function __deepDecodeURIComponent(str) {
    iteratee_1.__each(str.split('%'), () => {
        str = decodeURIComponent(str);
    });
    return str;
}
exports.__deepDecodeURIComponent = __deepDecodeURIComponent;
exports.__leftpad = (str, length, symbol = '0') => {
    return _.padStart(str, length, symbol);
};
//# sourceMappingURL=string.js.map