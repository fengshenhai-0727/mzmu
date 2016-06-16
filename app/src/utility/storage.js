define(function(mu) {
	/**
	 * mu.storage(String key, Any val)
	 * Storage 简化操作
     * @param storage
     * @param key
     * @param val
     * @returns {*}
     */
    mu.storage = function(/**[object]*/ storage, /**{string}*/ key, /**[any]*/ val){
        var args = _.args(arguments);

        _.run(_.type(storage, 'string'), function(){
            key = args[0];
            val = args[1];
            storage = window.localStorage;
        });

        storage = storage || window.localStorage;

        // 如果key不存在, 则认为是 Storage.clear();
        if(!key){
            return storage.clear();
        }

        return _.exist(val, function(){
            // Storage.setItem()
            storage.setItem(key, JSON.stringify(val).replace(/^\"(.*)\"$/, '$1'));
        }, function(){
            // Storage.getItem()
            var rst = storage.getItem(key);
            try {
                return JSON.parse(rst);
            } catch (e) {
                return rst || undefined;
            }
        });
    };

    return mu;
});
