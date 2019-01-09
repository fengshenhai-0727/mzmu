function baseStorage(storage: any, key?: string, value?: any) {
    if (!key) {
        return {
            remove: function(key) {
                return storage.removeItem(key);
            },
            clear: function() {
                return storage.clear();
            }
        };
    }

    if (value == null) {
        let rst = storage.getItem(key);
        try {
            return JSON.parse(rst);
        } catch (e) {
            return rst || undefined;
        }
    }

    return storage.setItem(key, JSON.stringify(value).replace(/^"(.*)"$/, '$1'));
}

export function __storage(key?: string, value?: any) {
    return baseStorage(window.localStorage, key, value);
}

export function __sessionStorage(key?: string, value?: any) {
    return baseStorage(window.localStorage, key, value);
}
