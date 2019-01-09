"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var moment_1 = require("moment");
var __type_1 = require("./__type");
var run_1 = require("./run");
var __theory_1 = require("./__theory");
var object_1 = require("./object");
var math_1 = require("./math");
var iteratee_1 = require("./iteratee");
function __stringFormat(str, format) {
    var type = __type_1.__type(format);
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
function __thousands(num, count, delimiter) {
    if (count === void 0) { count = 3; }
    if (delimiter === void 0) { delimiter = ','; }
    var reg = new RegExp("(\\d{1," + count + "})(?=(?:\\d{" + count + "})+$)", 'g');
    var str = num + '';
    var nums = str.split(/[%kw千万]/)[0];
    var _a = nums.split('.'), pInt = _a[0], pDecimal = _a[1];
    return str.replace(pInt, pInt.replace(reg, "$1" + delimiter));
}
function __numberFormat(num, options) {
    var _a;
    var _b = options.thousands, thousands = _b === void 0 ? 3 : _b, unit = options.unit, scaler = options.scaler, math = options.math, count = options.count, delimiter = options.delimiter, len = options.len;
    var rst = num;
    var unitMap = {
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
            _a = unitMap[unit] || [undefined, undefined], scaler = _a[0], unit = _a[1];
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
    run_1.__run(math, function () {
        count = count || 0;
        var size = Math.abs(count);
        var pow = Math.pow(10, size);
        rst = +rst * pow;
        rst = Math[math](rst);
        rst = (rst + '').split('.')[0];
        rst = +rst / pow;
        if (count < 0) {
            var _a = (rst + '').split('.'), pInt = _a[0], pDecimal = _a[1];
            pDecimal = _.padEnd(pDecimal, size, '0');
            rst = pInt + "." + pDecimal;
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
    var mt = moment_1.default(date);
    return mt.format(format);
}
exports.__dateFormat = __dateFormat;
function __format(value, format, dateLike) {
    if (dateLike === void 0) { dateLike = false; }
    var type = __type_1.__type(value);
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
            var options = {
                thousands: 3
            };
            if (__type_1.__type(format, 'object')) {
                options = object_1.__extend(options, format);
            }
            else {
                format = format || '';
                format = format.split(':');
                var math = void 0, count = void 0, unit = void 0;
                switch (format.length) {
                    case 1:
                        math = format[0];
                        break;
                    case 2:
                        math = format[0], count = format[1];
                        math = math || 'round';
                        break;
                    case 3:
                        math = format[0], unit = format[1], count = format[2];
                        unit = unit || 'percent';
                        math = math || 'round';
                        break;
                }
                options = object_1.__extend(options, { math: math, unit: unit, count: count });
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
    iteratee_1.__each(str.split('%'), function () {
        str = decodeURIComponent(str);
    });
    return str;
}
exports.__deepDecodeURIComponent = __deepDecodeURIComponent;
exports.__leftpad = function (str, length, symbol) {
    if (symbol === void 0) { symbol = '0'; }
    return _.padStart(str, length, symbol);
};
//# sourceMappingURL=string.js.map