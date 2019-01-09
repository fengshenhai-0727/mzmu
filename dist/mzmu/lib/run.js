"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __sofunc_1 = require("./__sofunc");
var __noop_1 = require("./__noop");
var __theory_1 = require("./__theory");
function __empty(val, trueFunc, falseFunc) {
    if (falseFunc === void 0) { falseFunc = __noop_1.__noop; }
    return __theory_1.__isEmpty(val) ? __sofunc_1.__sofunc(trueFunc, val) : __sofunc_1.__sofunc(falseFunc, val);
}
exports.__empty = __empty;
function __ifempty(val, trueValue, falseValue) {
    falseValue = __theory_1.__isNil(falseValue) ? val : falseValue;
    return __theory_1.__isEmpty(val) ? trueValue : falseValue;
}
exports.__ifempty = __ifempty;
function __ifnvl(val, trueValue, falseValue) {
    falseValue = __theory_1.__isNil(falseValue) ? val : falseValue;
    return __theory_1.__isNil(val) ? trueValue : falseValue;
}
exports.__ifnvl = __ifnvl;
function __exist(val, trueFunc, falseFunc) {
    if (falseFunc === void 0) { falseFunc = __noop_1.__noop; }
    return !__theory_1.__isNil(val) ? __sofunc_1.__sofunc(trueFunc, val) : __sofunc_1.__sofunc(falseFunc, val);
}
exports.__exist = __exist;
function __if(val, trueFunc, falseFunc) {
    if (falseFunc === void 0) { falseFunc = __noop_1.__noop; }
    return val ? __sofunc_1.__sofunc(trueFunc, val) : __sofunc_1.__sofunc(falseFunc, val);
}
exports.__if = __if;
function __run(val, trueFunc, falseFunc) {
    var rst = __sofunc_1.__sofunc(val);
    if (__theory_1.__isNil(trueFunc) && __theory_1.__isNil(falseFunc)) {
        return rst;
    }
    return __theory_1.__isEmpty(rst) ? __sofunc_1.__sofunc(falseFunc, rst) : __sofunc_1.__sofunc(trueFunc, rst);
}
exports.__run = __run;
//# sourceMappingURL=run.js.map