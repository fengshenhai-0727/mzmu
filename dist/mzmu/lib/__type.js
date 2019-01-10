"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function __type(val, ...compareTypes) {
    if (compareTypes.length) {
        let type = __type(val);
        let rst;
        for (let i = 0, len = compareTypes.length; i < len; i++) {
            if (type.toLowerCase() === compareTypes[i].toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    if (val === null || val === undefined) {
        return String(val);
    }
    let propCallType = Object.prototype.toString.call(Object(val));
    let type = propCallType.replace(/\[object (.*)]/g, '$1');
    type = type.replace(/.*(Element)$/i, '$1');
    return type.toLowerCase();
}
exports.__type = __type;
//# sourceMappingURL=__type.js.map