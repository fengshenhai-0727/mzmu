define(function(mu) {
	/**
	 * mu.storage(String key, Any val)
	 * localStorage 简化操作
	 * @param  {[type]} val [description]
	 * @return {[type]}     [description]
	 */
    mu.storage = function( /**{string}*/ key, /**{any}*/ val) {
        var rst;
        if (arguments.length === 1) {
            rst = localStorage.getItem(key);
            if (_.type(rst, 'string')) {
                try {
                    return JSON.parse(rst);
                } catch (e) {
                    return rst || undefined;
                }
            }else{
            	return undefined;
            }
        } else {
            rst = JSON.stringify(val);
            rst = rst.replace(/^\"(.*)\"$/, '$1');
            localStorage.setItem(key, rst);
        }
    };

    return mu;
});
