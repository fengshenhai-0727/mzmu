define(function(){

    /**
     *
     * @param condition
     * @param fn
     * @param elsefn
     * @returns {*}
     */

    mu.run = function run(condition, fn, elsefn ){
        return condition ? fn.call(null, condition) : elsefn.call(null, condition);
    };

});