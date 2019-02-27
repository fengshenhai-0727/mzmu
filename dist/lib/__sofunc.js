"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function __sofunc(val) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    if (typeof val === 'function') {
        return val.apply(this, params);
    }
    return val;
}
exports.__sofunc = __sofunc;
//# sourceMappingURL=__sofunc.js.map