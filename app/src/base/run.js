define(function(mu, _){

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




});