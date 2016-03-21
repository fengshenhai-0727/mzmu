/**
 * 暗黑小工具
 */

define(function(mu) {

    /**
     * mu.args(Arguments args)
     * 将 Arguments 转为一个数组
     * @param args
     * @param expand
     * @returns {Array.<T>}
     */
    mu.args = function(/**Arguments*/args, /**{boolean}*/ expand, /**{int}*/ argslenth  ) {
        args = Array.prototype.slice.call(args, 0);

        if(expand){
            _.each(args, function(v, i){
                args['__' + i + '__'] = {
                    type: _.type(v),
                    val: v
                };
            });
        }

        return args;
    };

    /**
     * mu.reorigin(Any any)
     * 根据any的类型,回到any的初始状态
     * @param any
     * @returns {*}
     *
     * mu.reorigin({a:1, b:2, c:3})
     * // -> {}
     *
     * mu.reorigin([1,2,3,4,5,6, 7])
     * // -> []
     *
     */
    mu.reorigin = function(/**{any}*/ any){
        return {
            'string': '',
            'number': 0,
            'date': new Date(0),
            'regex': new RegExp(),
            'object': {},
            'array': [],
            'function': _.noop
        }[_.type(any)];
    };

    /**
     * mu.create(Any val, Any key)
     * 生成一个新的对象|数组
     * @param val
     * @param key
     *
     * mu.create(1, 'a')
     * // -> {a:1}
     *
     * mu.create(1)
     * // -> [1]
     */
    mu.create = function(/**{any}*/ val, /**[any]*/ key){
        return arguments.length === 1 ? [val] : _.run(function(){
            var obj = {};
            obj[key] = val;
            return obj;
        });
    };

    /**
     * mu.or(Any src, Any t1....tn)
     * 比较  等同于  src === t1 || src === t2 || src === t3 ...
     * 只要有一项多true, 则返回true
     * @param src
     * @param target
     * @returns {boolean}
     *
     * exp.
     *
     * mu.or(1, '1', '01', '-1', 1)
     * // ->  true
     */
    mu.or = function(/**{any}*/ src, /**{any...}*/ target){
        var args = _.args(arguments);
        src = args.shift();

        for(var i = 0, l = args.length; i < l; i ++){
            target = args[i];
            if(src === target){
                return true;
            }
        }

        return false;
    };

    /**
     * mu.and(Any src, Any t1....tn)
     * 比较  等同于  src === t1 && src === t2 && src === t3 ...
     * 只要有一项多false, 则返回false
     * @param src
     * @param target
     * @returns {boolean}
     *
     * exp.
     *
     * mu.or(1, '1', '01', '-1', 1)
     * // ->  false
     */
    mu.and = function(/**{any}*/ src, /**{any...}*/ target){
        var args = _.args(arguments);
        src = args.shift();

        for(var i = 0, l = args.length; i < l; i ++){
            target = args[i];
            if(src !== target){
                return false;
            }
        }

        return true;
    };

    /**
     * mu.toStringWithType(Any any)
     * toString + type
     * @param any
     * @returns {string}
     */
    mu.toStringWithType = function(/**{any}*/ any){
        return _.type(any) + '__' + any;
    };

    return mu;
});



