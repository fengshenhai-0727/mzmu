"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const __type_1 = require("./__type");
function __isNil(val) {
    return val == null;
}
exports.__isNil = __isNil;
function __isExist(val) {
    return !__isNil(val);
}
exports.__isExist = __isExist;
function __isFalse(val) {
    return !val;
}
exports.__isFalse = __isFalse;
function __isEmpty(val) {
    var rst = !val;
    if (!rst) {
        switch (__type_1.__type(val)) {
            case 'string':
                var s = val.replace(/(^\s*)|(\s*$)/g, '');
                rst = s.length === 0 || s === '0';
                break;
            case 'array':
                rst = val.length === 0;
                break;
            case 'object':
                rst = _.isEmpty(val);
                break;
        }
    }
    return rst;
}
exports.__isEmpty = __isEmpty;
function __isNotEmpty(val) {
    return !__isEmpty(val);
}
exports.__isNotEmpty = __isNotEmpty;
//# sourceMappingURL=__theory.js.map