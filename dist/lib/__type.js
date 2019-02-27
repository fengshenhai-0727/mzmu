"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function __type(val) {
    var compareTypes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        compareTypes[_i - 1] = arguments[_i];
    }
    if (compareTypes.length) {
        var type_1 = __type(val);
        var rst = void 0;
        for (var i = 0, len = compareTypes.length; i < len; i++) {
            if (type_1.toLowerCase() === compareTypes[i].toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    if (val === null || val === undefined) {
        return String(val);
    }
    var propCallType = Object.prototype.toString.call(Object(val));
    var type = propCallType.replace(/\[object (.*)]/g, '$1');
    type = type.replace(/.*(Element)$/i, '$1');
    return type.toLowerCase();
}
exports.__type = __type;
//# sourceMappingURL=__type.js.map