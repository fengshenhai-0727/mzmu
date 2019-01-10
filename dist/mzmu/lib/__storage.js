"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseStorage(storage, key, value) {
    if (!key) {
        return {
            remove: function (key) {
                return storage.removeItem(key);
            },
            clear: function () {
                return storage.clear();
            }
        };
    }
    if (value == null) {
        let rst = storage.getItem(key);
        try {
            return JSON.parse(rst);
        }
        catch (e) {
            return rst || undefined;
        }
    }
    return storage.setItem(key, JSON.stringify(value).replace(/^"(.*)"$/, '$1'));
}
function __storage(key, value) {
    return baseStorage(window.localStorage, key, value);
}
exports.__storage = __storage;
function __sessionStorage(key, value) {
    return baseStorage(window.localStorage, key, value);
}
exports.__sessionStorage = __sessionStorage;
//# sourceMappingURL=__storage.js.map