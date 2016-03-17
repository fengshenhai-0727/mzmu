/**
 * mu.js
 * 类似undestore的JS方法库
 */
(function(window, undefined) {
    'use strict';

    // 创建闭包全局
    var root = this;
    var mu, _;

    var arrPro = Array.prototype,
        objPro = Object.prototype;


    var REG = {
        CHINESE: /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/g,
        TRIM: /(^\s*)|(\s*$)/g,
        TRIM_LEFT: /(^\s*)/g,
        TRIM_RIGHT: /(\s*$)/g
    };


    // 创建对象式的调用方式， 返回一个包装器
    // 包装器对象中包含所有的 mu 方法
    // mu 为一个函数对象，实例服从单例模式
    // 模拟 Underscore 的 _(obj)

    mu = _ = function(/**any*/ obj) {
        //如果参数为_对象，说明已经实例化过了，所以直接返回
        if(obj instanceof _) {
            return obj;
        }
        //如果实例化时没有使用new，那么在这里包装一下，使得this指向该实例
        if(!(this instanceof _)) {
            return new _(obj);
        }
        //将obj保存在内部属性__wrapped__中
        this.__wrapped__ = obj;
        //链式访问权限
        this.__chain__ = false;
    };


//})()





    /**
     * ifunction_
     * 如果参数是function, 就允许它, 否则返回原参数
     * @@private method
     * @param {any} fn
     * @param {array} args
     * @param {object} context
     * @protected
     */
    _.iffn =  function (fn, args, context){
        if(typeof fn === 'function'){
            return fn.apply(context, args || []);
        }

        return fn;
    };

    /**
     * mu.run(con, inbox, outbox, judgement)
     * 如果 if con = true -> inbox ::else -> outbox
     * @param {any} con, con 判断的条件遵从运算符 if
     * @param {any} inbox
     * @param {any} outbox
     * @returns {*}
     */

    /**
     * ex.
     *
     *   mu.run(function(){
     *       ...conditon...
     *   })
     *
     *   mu.run(con, function(con){
     *       ...condition...
     *   })
     *
     *   mu.run(con, 'if ture', 'if else')
     */
    mu.run = function (con, inbox, outbox){
        var b = _.iffn(con);

        if(arguments.length ===1){
            return b;
        }

        var p = typeof con === 'function' ? b : con;
        return b ? _.iffn(inbox, [con]) : _.iffn(outbox, [con]);
    };

    /**
     * mu.exist
     * 如果con 存在 -> inbox ::else outbox
     * @param {any} con : not function
     * @param {any} inbox
     * @param {any} outbox
     * @returns {*}
     */
    mu.exist = function(con, inbox, outbox) {
        var b = _.isExist(con);
        var p = typeof con === 'function' ? b : con;
        return b ? _.iffn(inbox, [con]) : _.iffn(outbox, [con]);
    };






    /**
     * mu.noop();
     * 空函数
     */
    mu.noop = function() {
    };


    /**
     * mu.type(Any any[, String type])
     * 获得参数的数据类型 / 判断参数的数据类型
     * @param {any} any
     * @param {type} type: 'string', 'number', 'array', 'date', 'regex', 'function', 'object'
     */
    mu.type = function(any, type) {

        return _.run(type, function(type) {
            return type === _.type(any);
        }, function(type) {
            // vaild undefined and null
            if(any === null || any === undefined) {
                return String(any);
            }

            var reg = /\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/;
            var typeMap = objPro.toString.call(Object(any));
            typeMap = reg.exec(typeMap);

            type = typeMap ? typeMap[1].toLowerCase() : any.callee ? 'arguments' : 'object';

            return type;
        });
    };




    /**
     * mu.isBaseType(T t)
     * 判断对象是否为基本类型
     * 基本类型： null, undefined, string, number, boolean
     * @param any
     * @returns {boolean}
     */
    mu.isBaseType = function(/**{any}*/ any) {
        return Object(any) !== any;
    };

    /**
     * mu.isNull(Any any)
     * @param any
     * @returns {boolean}
     */
    mu.isNull = function(/**{any}*/ any){
        return any === undefined;
    };

    /**
     * mu.isUndefined(Any any)
     * @param any
     * @returns {boolean}
     */
    mu.isUndefined = function(/**{any}*/ any){
        return any === null;
    };

    /**
     * mu.isNumeric
     * @param any
     * @returns {boolean}
     *
     * // todo
     */
    mu.isNumeric = function(/**{any}**/ any) {
        return !isNaN(parseFloat(any)) && isFinite(any);
    };

    /**
     * mu.isInteger(Any any)
     * 判断是否整数
     * @param any
     * @return {boolean}
     */
    mu.isInteger = function(/**{any}*/ any){
        return _.isNumeric(any) && any === parseInt(any);
    };

    /**
     * mu.isWindow(Object win)
     * 判断一个对象是否是为window对象
     * @param win
     * @returns {*|boolean}
     */
    mu.isWindow = function(/**{object}*/ win) {
        return !!(win && win === win.window);
    };

    /**
     * mu.isElement(Any any)
     * 判断该对象是否 element
     * @param any
     * @returns {boolean}
     */
    mu.isElement = function(/**{any}*/ any) {
        return !!(any && any.nodeType === 1) && !_.isPlainObject(any);
    };

    /**
     * mu.isDate(Any any)
     * @param any
     * @returns {boolean}
     */
    mu.isDate = function(/**{any}*/ any){
        return _.type(any, 'date');
    };

    /**
     * mu.isDateLike(Any any)
     * 一切有效的可以转为日期格式的值(不包括 Invalid Date)
     * @param any
     * @returns {boolean}
     */

    /**
     *  exp.
     *
     *  mu.isDateLike(1457948891718)
     *  //-> true
     *
     *  mu.isDateLike('abdde')
     *  //-> false
     */
    mu.isDateLike = function(/**{any}*/ any){
        var d = new Date(any);
        return d.toString() !== 'Invalid Date';
    };

    /**
     * mu.isArray(Any any)
     * @param any
     * @returns {*}
     */
    mu.isArray = function(/**{Any}*/ any) {
        return _.type(any, 'array');
    };

    /**
     * mu.isObject(Any any)
     * @param any
     * @returns {*}
     */
    mu.isObject = function(/**{Any}*/ any) {
        return _.type(any, 'object');
    };

    /**
     * mu.isFunction(Any any)
     * @param any
     * @returns {boolean}
     */
    mu.isFunction = function(/**{Any}*/ any){
        return typeof any === 'function';
    };

    /**
     * mu.isEmptyObject(Any any)
     * 空对象
     * @param obj
     */
    mu.isEmptyObject = function(/**{Any}*/ obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    };


    /**
     * mu.isPlainObject(Any any)
     * 判断一个any是否是一个纯对象 (通过 new Object 或 {})创建
     * @param obj
     */

    /**
     * exp.
     * 只有纯对象(对象字面量)才为true
     *
     * mu.isPlainObject({})
     * //-> true
     *
     * mu.isPlainObject(window)
     * //-> false
     *
     * mu.isPlainObject(document)
     * //-> false
     *
     * mu.isPlainObject(null)
     * //-> false
     *
     * mu.isPlainObject(undefined)
     * //-> false
     *
     * var cls = new mu();
     * mu.isPlainObject(cls)
     * //-> false
     */
    mu.isPlainObject = function(/**{Any}*/ obj) {
        if(_.isObject(obj)) {
            Object.getPrototypeOf || (Object.getPrototypeOf = function(obj) {
                return obj['__proto__'] || obj.prototype || (obj.constructor && obj.constructor.prototype) || Object.prototype;
            });

            return Object.getPrototypeOf(obj) === Object.prototype;
        }

        return false;
    };

    /**
     * mu.isEmpty(Any any)
     * 判断对象是否为空值
     * @param {any} any
     * @param {boolean} reversal: 反转方法结果
     */

    /**
     * exp.
     * 假值: 使用if或!!运算符得出结果为 false 的值
     * 不纯在的值: null || undefined
     * 空值: 假值, 空数组, 0, 空对象
     *
     * mu.isEmpty({})
     * //-> true
     *
     * mu.isEmpty([])
     * //-> true
     *
     * mu.isEmpty('   ')
     * //-> true
     *
     * mu.isEmpty(0)
     * //-> true
     *
     * mu.isEmpty(false)
     * //-> true
     *
     * mu.isEmpty(null)
     * //-> true
     *
     * mu.isEmpty(undefined)
     * //-> true
     *
     */
    mu.isEmpty = function(/**{Any}*/ any) {
        var rst = !any;

        if(!rst) {
            switch(_.type(any)) {
                case 'string':
                    rst = any.replace(/(^\s*)|(\s*$)/g, '').length === 0;
                    break;
                case 'array':
                    rst = any.length === 0;
                    break;
                case 'object':
                    rst = _.isEmptyObject(any);
                    break;
                case 'date':
                    rst = !_.isDateLike(any);
                    break;
            }
        }

        return rst;
    };

    /**
     * mu.isExist(Any any)
     * 判断对象是否存在
     * @param {any} any
     */

    /**
     * exp.
     * 假值: 使用if或!!运算符得出结果为 false 的值
     * 不纯在的值: null || undefined
     * 空值: 假值, 空数组, 0, 空对象
     *
     * mu.isExist({})
     * //-> true
     *
     * mu.isExist([])
     * //-> true
     *
     * mu.isExist('   ')
     * //-> true
     *
     * mu.isExist(0)
     * //-> true
     *
     * mu.isExist(false)
     * //-> true
     *
     * mu.isExist(null)
     * //-> false
     *
     * mu.isExist(undefined)
     * //-> false
     *
     */
    mu.isExist = function(/**{Any}*/ any) {
        return !(any === null || any === undefined);
    };

    /**
     * mu.isArrayLike(Any any)
     * 一切看起来像数组的东西(arguments, node 等)
     * @param any
     *
     * PS. copy underscore
     */

    /**
     * exp.
     * 数组 and 伪数组对象
     *
     * mu.isArrayLike({length: 100})
     * //-> false
     *
     * mu.isArrayLike([])
     * //-> true
     *
     * mu.isArrayLike(document.querySelectorAll('div'))
     * //-> true
     *
     * mu.isArrayLike(arguments)
     * //->true
     */

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    mu.isArrayLike = function(/**{Any}*/ any) {
        var length = _.isExist(any) && typeof any === 'object' && !_.isPlainObject(any) && any.length;
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };





    /**
     * mu.ifnvl(Any src, Any target)
     * 如果 src 为 null 或 undefined 则输出 target 否则 输出 src 或 fn 的值
     * @param src
     * @param target
     */

    /**
     * exp.
     *
     * var p;
     *
     * mu.ifnvl(p, 'mu.js')
     * //-> mu.js
     *
     * p = 'MU';
     *
     * mu.ifnvl(p, 'mu.js)
     * //-> MU
     *
     * mu.ifnvl(p, 'mu.js', function(src, target){
     *  return src + '.JS';
     * }
     * //-> MU.JS
     *
     * mu.ifnvl('', 'mu.js')
     * //-> ''
     *
     * mu.ifnvl(false, 'mu.js')
     * //-> false
     *
     * mu.ifnvl([], 'mu.js')
     * //-> []
     *
     */
    mu.ifnvl = function(/**{any}*/ src, /**{any}*/ target, /**{function}*/ fn){
        return _.isExist(src) ? (fn ? fn.call(null, src, target) : src ) : target;
    };

    /**
     * mu.ifempty(Any src, Any target, Function fn)
     * if src === empty ? target : ( fn || src )
     * @param src
     * @param target
     * @param fn
     * @returns {{any}}
     */

    /**
     * exp.
     *
     * var p;
     *
     * mu.ifempty(p, 'mu.js')
     * //-> mu.js
     *
     * p = 'MU';
     *
     * mu.ifempty(p, 'mu.js)
     * //-> MU
     *
     * mu.ifempty(p, 'mu.js', function(src, target){
     *  return src + '.JS';
     * }
     * //-> MU.JS
     *
     * mu.ifempty('', 'mu.js')
     * //-> mu.js
     *
     * mu.ifempty(false, 'mu.js')
     * //-> mu.js
     *
     * mu.ifempty([], 'mu.js')
     * //-> mu.js
     *
     */
    mu.ifempty = function(/**{any}*/ src, /**{any}*/ target, /**{function}*/ fn){
        return !_.isEmpty(src) ? (fn ? fn.call(null, src, target) : src ) : target;
    };

    /**
     * exp.
     *
     * var p;
     *
     * mu.ifif(p, 'mu.js')
     * //-> mu.js
     *
     * p = 'MU';
     *
     * mu.ifif(p, 'mu.js)
     * //-> MU
     *
     * mu.ifif(p, 'mu.js', function(src, target){
     *  return src + '.JS';
     * }
     * //-> MU.JS
     *
     * mu.ifif('', 'mu.js')
     * //-> mu.js
     *
     * mu.ifif(false, 'mu.js')
     * //-> mu.js
     *
     * mu.ifif([], 'mu.js')
     * //-> []
     *
     * mu.ifif({}, 'mu.js')
     * //-> {}
     *
     */
    mu.ifif = function(/**{any}*/ src, /**{any}*/ target, /**{function}*/ fn){
        return src ? (fn ? fn.call(null, src, target) : src ) : target;
    };
//mu.has = function(con, inbox, outbox){
//    return _.run(con, inbox, outbox, function(con) {
//        if(typeof con === 'string'){
//            con = con.replace(/(^s*)|(s*$)/g, "");
//        }
//
//        if(typeof con === 'object'){
//
//        }
//
//        con = con || false;
//
//
//
//        return con !== undefined && con !== null;
//    });
//};
/**
 * 暗黑小工具
 */



    /**
     * mu.args(Arguments args)
     * 将 Arguments 转为一个数组
     * @param args
     * @returns {Array.<T>}
     */
    mu.args = function(/**Arguments*/args) {
        return Array.prototype.slice.call(args, 0);
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
     * 获得当前JS允许的环境(浏览器, 设备, 系统)
     */
    var NG = window.navigator,
        UA = NG.userAgent.toLowerCase(),
        AV = NG.appVersion,
        TV = parseFloat(AV);

    /**
     * mu.envi(String name)
     * 获得当前JS运行的环境(浏览器, 设备, 系统)
     * @param name
     * @returns {*}
     */
    mu.envi = function(/**{string}*/ name) {

        var b_ = function(name) {
            return parseFloat(UA.split(name + '/')[1]) || undefined;
        };

        var envi = _.envi;

        switch(name) {
            // ADOBE AIR
            case 'air':
                return UA.indexOf('adobeair') >= 0;
            // KHTML 浏览器排版引擎
            case 'khtml':
                return AV.indexOf('konqueror') >= 0 ? TV : undefined;
            // webkit 浏览器引擎
            case 'webkit':
            // Trident -> MSHTML 浏览器排版引擎
            case 'trident':
            // Google chrome 浏览器
                return b_(name);

            // Gecko 浏览器引擎
            case 'gecko':

                return _.run(UA.indexOf('Gecko') >= 0 && !envi('khtml') && !envi('webkit') && !envi('trident'), null, function(){
                    return TV;
                });

            case 'chrome':
                return b_(name);
            // Apple Safari 浏览器
            case 'safari':
                return AV.indexOf('Safari') >= 0 && !envi('chrome') && b_('version');
            case 'air3':
                return UA.indexOf('adobeair') >= 0;
        }
    };
/**
 * 迭代器
 */



    /**
     * mu.each(Any any, Function fn[, Object context])
     * 遍历数据对象或集合
     * @param any
     * @param fn(val, key, src)
     * @param context
     */
    mu.each = function(/**{any}*/ any, /**{function}*/ fn, /**[Object]*/ context) {
        var i = 0;

        switch(_.type(any)) {
            case 'number':
                while(i < any) {
                    if(fn.call(context, i, i + 1, any) === false) {
                        break;
                    }

                    i++;
                }
                break;
            case 'array':
            case 'string':

                for(var l = any.length; i < l; i++) {
                    if(fn.call(context, any[i], i, any) === false) {
                        break;
                    }
                }

                break;
            case 'object':

                for(i in any) {
                    if(any.hasOwnProperty(i)) {
                        if(fn.call(context, any[i], i, any) === false) {
                            break;
                        }
                    }
                }

                break;
        }

    };

    /**
     * mu.map(Object|Array obj, Function fn[, Object|Array initData, Object context)
     * 映射源头, 生成新的对象或数组
     * 史上最强大的 map
     * @param obj
     * @param fn
     * @param initData
     * @param context
     * @returns {array}
     *
     * exp.
     *
     * mu.map([1,2,3], function(v, i){ return v*2; })
     * // -> [2, 4, 6]
     *
     * mu.map({a: 'Mizi', b: 'Zichu'}, function(v, k){ return v + ' Lin'})
     * // -> {a: 'Mizi Lin', b: 'Zichu Lin'}
     *
     * ## 移除数组中的 undefined, 返回新数组
     * mu.map([1, undefined, undefined, 3], function(v, i){
     *    if(v === undefined){
     *      return '__remove_map__';
     *    }else{
     *      return v;
     *    }
     * })
     *
     * // -> [1, 3]
     *
     * ## 将数组转为对象, 用数组的索引最为对象的key, 值为值
     * mu.map(['mizi', 'zichu', 'xiaoming'], function(v){return v;}, {});
     * // ->  {0: 'mizi', 1: 'zichu', 2: 'xiaoming'}
     *
     * ## 将数组转为对象, 值为key, 索引为值
     * mu.map(['mizi', 'zichu', 'xiaoming'], function(v, i){
     *    return {
     *      '__key__': v,
     *      '__val__': i
     *    };
     * }, {});
     * // -> {mizi: 0, zichu: 1, xiaoming: 2}
     *
     * ## 将对象转为一维数组, 值为数组值
     * mu.map({a:'mizi', b: 'zichu'}, function(v){ return v; }, [])
     * // -> ['mizi', 'zichu']
     *
     */
    mu.map = function(/**{object|array}*/ obj, /**{function}*/ fn, /**[object|array]*/ initData, /**[Object]*/ context) {
        if(!(obj && fn && _.isFunction(fn))) {
            return obj;
        }

        var rst = initData ? initData : _.isArrayLike(obj) ? [] : {};

        _.each(obj, function(v, k) {
            var cb = fn.call(context, v, k, obj);

            if(cb !== '__remove_map__') {
                if(_.isObject(rst)) {
                    if(cb && cb.__key__) {
                        rst[cb.__key__] = cb.__val__;
                    } else {
                        rst[k] = cb;
                    }
                } else {
                    rst[rst.length] = cb;
                }
            }
        });

        return rst;

    };

    /**
     * mu.extend([Boolean isDeep,] Object src, Object ...target)
     * 将src的属性覆盖到target上，若有相同的属性，会完全覆盖
     * target 从后向前覆盖
     * @param isDeep 是否深层覆盖
     * @param src
     * @param target...
     * @returns {{object}}
     *
     * exp.
     *
     * mu.extend({a:{d: 2}, b:2}, {a:{e:3}, c:4})
     * // -> {a:{e:3}, b:2, c:4}
     *
     * mu.extend(true, {a: {d: 2}, b:2}, {a:{e:3}, c:4})
     * // -> {a:{d:2, e:3}, b:2, c:4}
     *
     * mu.extend({}, {}, {}...)
     */
    mu.extend = function(/**{boolean}*/ isDeep, /**{object}*/ src, /**[object...]*/ target) {
        var args = _.args(arguments);

        if(_.type(isDeep, 'boolean')) {
            isDeep = args.shift();
        } else {
            isDeep = false;
        }

        src = args[0];

        // support object and array
        if(typeof src !== 'object') {
            return src;
        }

        _.each(args, function(target) {
            _.each(target, function(oo, kk) {
                if(isDeep) {
                    src[kk] = typeof oo === 'object' ? _.extend(true, src[kk] || _.reorigin(oo), oo) : oo;
                } else {
                    src[kk] = oo;
                }
            });
        });

        return src;
    };
/**
 * 迭代器
 */



    /**
     * mu.copy(Any any)
     * 浅拷贝
     * @param any
     * @returns {{any}}
     */
    mu.copy = function(/**{any}*/ any) {
        return _.extend({}, any);
    };

    /**
     * mu.clone(Any any)
     * 克隆, 深拷贝
     * @param any
     * @returns {{any}}
     */
    mu.clone = function(/**{any}*/ any) {
        return _.extend(true, {}, any);
    };

/**
 * 数组
 */


















    /**
     * mu.trim(String str, String position)
     * 去除字符串两端空格符
     * @param str
     * @param postion
     * @returns {*}
     */
    mu.trim = function(/**{string}*/ str, /**{string}*/ postion){
        postion = postion || 'all';

        var reg = {
            'all': REG.TRIM,
            'left': REG.TRIM_LEFT,
            'right': REG.TRIM_RIGHT
        };

        return str.replace(reg[postion] || '', '');
    };

    /**
     * mu.substr(String str, Int max, Int back, String chart)
     * @param str 需要截取的长度的字符串
     * @param max 字符串最大长度
     * @param adjust 最后显示的调整长度
     * @param symbol 跟随字符串...
     * @returns {{string}}
     */
    mu.substr = function(/**{string}*/ str, /**{int}*/ max, /**{int}*/ adjust, /**{string}*/ symbol) {
        adjust = adjust || 3;
        symbol = _.ifnvl(symbol, '...');

        var len = str.length;

        if(!max || len >= str) {
            return str;
        }

        return str.substr(0, max - adjust) + symbol;
    };

    /**
     * mu.leftpad(String s, Int l[, String symbol])
     * 左侧补全字符串
     * @param s
     * @param l
     * @param symbol
     * @returns {{string}}
     */
    mu.leftpad = function(/**{string}*/ s, /**{int}*/ l, /**[string]*/ symbol){
        s = s + '';
        symbol = symbol || '0';

        s = String(s);

        while(s.length<l){
            s = symbol + s;
        }

        return s;
    };
/**
 * 时间
 */



    /**
     * mu.now()
     * 当前时间
     * @returns {Date}
     */
    mu.now = function() {
        return new Date();
    };

    /**
     * mu.timestamp(Date date[, Boolean isShort])
     * 获得当前时间的时间戳, 默认为当前时间
     * @param date
     * @param initType 将某类型的时间设为0 'hhmmssSS'
     * @param short 是否显示短时间戳
     * @returns {number|Date}
     *
     * exp.
     *
     * mu.timestamp(new Date(1458207651074))
     * //-> 1458207651074
     *
     * mu.timestamp(new Date(1458207651074), 0)
     * //-> 1458207651074
     *
     * mu.timestamp(new Date(1458207651074), 1)
     * //-> 1458207651000
     *
     * mu.timestamp(new Date(1458207651074), 2)
     * //-> 1458207651
     *
     */
    mu.timestamp = function(/**{date}*/ date, /**[{string}]*/ initType, /**[boolean]*/ short) {
        date = date || new Date();

        var typeObj = {
            yyyy: 'setFullYear',
            MM: 'setMonth',
            dd: 'setDate',
            hh: 'setHours',
            mm: 'setMinutes',
            ss: 'setSeconds',
            SS: 'setMilliseconds'
        };

        if(initType){
            _.each(typeObj, function(fn, type){
                if(initType.indexOf(type) > -1){
                    date[fn](0);
                }
            });
        }

        var rst = +date;

        return short ? ( Math.floor(rst / 1000) ) : rst;
    };

    /**
     * mu.diff(Date start, Date end)
     * 两个时间相隔
     * @param start
     * @param end
     */
    mu.diff = function(/**{date}*/ start, /**{date}*/ end){

    };


    /**
     * mu.format()
     * 各种类型的值, 格式化成字符串
     * @param src
     * @returns {*}
     *
     * exp.
     *
     * mu.format('Hello {0}, {1}!', 'Mizi', 'Welcome')
     * // -> "Hello Mizi, Welcome!"
     *
     * mu.format( new Date(1458114893684),  'yyyy年MM月dd日 hh:mm:ss SS 第q季度 星期w')
     * // -> "2016年03月16日 15:54:53 684684 第1季度 星期3"
     *
     * mu.format( new Date(1458114893684),  'yy年M月d日 h:m:s SS 第q季度 星期w')
     * // -> "16年3月16日 15:54:53 684 第1季度 星期3"
     *
     * mu.format(1234567890)
     * // '1,234,567,890'
     *
     * mu.format('1234567890.1234')
     * '1,234,567,890.1234'
     */
    mu.format = function(/**{any}*/ src) {
        var args = _.args(arguments);
        var format;

        src = args.shift();

        var numfomart = function(str){
            return str.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g,',$1');
        };

        switch( _.type(src) ){
            // 字符串替换 String.format
            case 'string':
                if(_.isEmpty(args)){
                    return numfomart(src);
                }else{
                    return src.replace(/\{(\d+)\}/g, function(m, i) {
                        return args[i] || m;
                    });
                }

                break;
            // 日期按既定格式输出字符串 dateformat
            case 'date':

                var y = src.getFullYear(),
                    M = src.getMonth() + 1,
                    q = Math.ceil(M / 3),
                    w = src.getDay(),
                    d = src.getDate(),
                    h = src.getHours(),
                    m = src.getMinutes(),
                    s = src.getSeconds(),
                    S = src.getMilliseconds();

                var dateVals = [
                    {key: 'y{4}',  val: y},
                    {key: 'y{2}',  val: _.leftpad(y % 100, 2)},
                    {key: 'q',  val: q},
                    {key: 'M{2}',  val: _.leftpad(M,2)},
                    {key: 'M',  val: M},
                    {key: 'w',  val: w},
                    {key: 'd{2}',  val: _.leftpad(d,2)},
                    {key: 'd',  val: d},
                    {key: 'h{2}',  val: _.leftpad(h,2)},
                    {key: 'h',  val: h},
                    {key: 'm{2}',  val: _.leftpad(m,2)},
                    {key: 'm',  val: m},
                    {key: 's{2}',  val: _.leftpad(s,2)},
                    {key: 's',  val: s},
                    {key: 'S{2}',  val: S}
                ];

                format = args.shift() || '';

                if(!format){
                    return '';
                }

                _.each(dateVals, function(o){
                    var reg = new RegExp('('+ o.key +')', 'g');
                    format = format.replace(reg, o.val);
                });

                return format;

            // 将数字转为科学计数法, 输出字符串
            case 'number':
                return numfomart(src + '');
        }
    };


window.mu = mu;
})(window);