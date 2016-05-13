/**
 * 集合
 */

define(function(mu) {
    /**
     * mu.remove(Collection src, Any item)
     * 删除集合中的某一项
     * @param  src
     * @param  item
     * @return {Object|Array}
     *
     * exp.
     *
     * mu.remove({a:1, b:2, c:3, d:4, e:5}, function(v, k){
	 *	    return v % 2 === 0
	 *	})
     * // -> {a: 1, c: 3, e: 5}
     *
     * mu.remove([1,2,3,4,5], function(v, k){
	 *     	return v % 2 === 0
	 * })
     * // ->[1, 3, 5]
     *
     */
    mu.remove = function(/**{collection}*/ src, /**{any}*/ item) {

        if(_.isFunction(item)) {
            _.each(src, function(v, k) {
                if(item.call(null, v, k, src)) {
                    src = _.remove(src, k);
                }
            });
        } else {
            if(_.isArray(src) && _.isNumeric(item)) {
                src.splice(item, 1);
            } else {
                delete src[item];
            }
        }

        return src;
    };

    /**
     * mu.len(Collection obj)
     * 返回对象的长度(或属性的个数)
     * @param obj
     * @returns {int}
     */
    mu.len = function(/**{collection}*/ obj) {
        if(_.isObject(obj)) {
            return _.keys(obj).length;
        }

        if(_.isArray(obj) || _.isFunction(obj)) {
            return obj.length;
        }

        return String(obj).length;
    };

    /**
     * mu.flat(Object obj)
     * 扁平化呈现数据
     * @param obj
     * @returns {object}
     *
     * exp.
     *
     * mu.flag(['a', 'b', {'c':1}])
     * // -> {[0]: "a", [1]: "b", [2].c: 1}
     *
     * mu.flat({
     *     "data": {
     *         "containerId": 47,
     *         "containerKey": "TM-ZP9KRX",
     *         "containerName": "test 1.4.2",
     *         "createUserId": "10003",
     *         "updateUserId": "10003"
     *     }
     * })
     *
     * // -> {
     *      data.containerId: 47,
     *      data.containerKey: "TM-ZP9KRX",
     *      data.containerName: "test 1.4.2",
     *      data.createUserId: "10003",
     *      data.updateUserId: "10003"
     *  }
     *
     */
    mu.flat = mu.chainToFlat = function(/**{collection}*/ obj) {

        var arrKey = function(index) {
            return '[' + index + ']';
        };

        var rst = {};

        _.each(obj, function(v, k, obj) {
            var key = _.isArray(obj) ? arrKey(k) : k;
            if(typeof v === 'object') {
                _.each(_.flat(v), function(vv, kk) {
                    rst[key + '.' + kk] = vv;
                });
            } else {
                rst[key] = v;
            }
        });

        return rst;
    };

    /**
     * mu.flatToCharin(Object obj)
     * 将扁平化对象转为链型对象
     * @params obj
     */
    mu.flatToChain = function(/**{object}*/ obj) {
        var reg = /^[(\d+)]$/g;
        var rst = {};

        var setVal = function(key, i, l, v) {


            var isArray = reg.test(key);
            if(isArray) {
                key = reg.exec(key)[1];
                if(!_.isArray(rst)) {
                    rst = [];
                }
            }

            rst[key] = {};

            if(i === l) {
                rst[key] = v;
            }
        };

        _.each(obj, function(val, prop) {
            var part = prop.split('.');
            var l = part.length;
            _.each(part, function(key, i) {

                setVal(key, i, l);
            });
        });

        return rst;
    };

    /**
     * mu.find()
     * 查找集合中中符合条件的第一项
     * @param collect
     * @param fn
     * @returns {*}
     */
    mu.find = function(/**{collection}*/ collect, /**{any}*/ fn) {
        var rst;

        _.each(collect, function(v, i, src) {
            if(fn.call(null, v, i, src)) {
                rst = v;
                return false;
            }
        });

        return rst;
    };

    /**
     * mu.find()
     * 查找数组中符合条件的第一项的索引值
     * @param arr
     * @param fn
     * @returns {*}
     */
    mu.findIndex = function(/**{array}*/ arr, /**{any}*/ fn) {
        var rst;

        mu.run(!_.isFunction(fn), function() {
            var val = fn;
            fn = function(v) {
                return val === v;
            };
        });

        _.each(arr, function(v, i, src) {
            if(fn.call(null, v, i, src)) {
                rst = i;
                return false;
            }
        });

        return rst;
    };

    mu.query = function() {

    };

    mu.queryIndex = function() {

    };

    mu.prop = function(/**Object*/ collect, /**String*/ propStr) {

        var args = _.args(arguments), keys;
        var rst = collect || window;

        if(args.length > 2){
            keys = args.slice(1);
        }else{
            keys = propStr.split('.');
        }

        for(var i = 0, key; (key = keys[i++]);) {
            if(!_.isExist(rst[key]) || !rst.hasOwnProperty(key)) {
                return;
            }

            rst = rst[key];
        }

        return rst;
    };


    // mu.get
     
    // mu.pick = function(/**Object*/ collect, /**Function*/ fn, /**Object|Array*/ initData, /**Object*/ context){
    //     var rst;

    //     _.run(initData, function(data){
    //         rst = data;
    //     }, function(){
    //         rst = _.isObject(collect) ? {} : [];
    //     });

    //     _.each(collect, function(item, i){
    //         var cb = fn.call(context, item, i);

    //         if(cb){



    //         }


    //     });







    // }; 


    return mu;
});