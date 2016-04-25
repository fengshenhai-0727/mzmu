define(['./run'], function(mu, _) {

    /**
     * mu.type(Any any[, String type])
     * 获得参数的数据类型 / 判断参数的数据类型
     * @param {any} any
     * @param {type} type: 'string', 'number', 'array', 'date', 'regex', 'function', 'object'
     */
    mu.type = function(any, type) {

        if(type){
            return type === _.type(type);
        }

        // vaild undefined and null
        if(any === null || any === undefined) {
            return String(any);
        }

        var reg = /\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/;
        var typeMap = objPro.toString.call(Object(any));
        typeMap = reg.exec(typeMap);

        type = typeMap ? typeMap[1].toLowerCase() : any.callee ? 'arguments' : 'object';

        return type;
        
    };

});


