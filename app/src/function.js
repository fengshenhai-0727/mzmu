define(function(mu) {


    // mu.bind
    // mu.defer
    // mu.throttle


    mu.bind = function(/**{function}*/ fn, /**{object}*/ context, /**{any...}*/ any ){
    	
    };


    /**
     * mu.debounce(Function fn, Int wait[, Boolean immediate])
     * 弹簧函数
     * @param  immediate 决定函数实在弹簧顶部执行还是底部执行 
     *         immediate == true 函数立即执行，在弹簧时间内不再执行 (用户双击重复)
     *         immediate == false 在最后一次调用后 wait 时间后执行 （等待执行（懒加载等））
     * @return {function}
     */
    mu.debounce = function( /**{function}*/ fn, /**{int}*/ wait, /**{boolean}*/ immediate) {
        var timeout, rst;
        wait = Math.abs(wait);
        return function() {
            var context = this,
                args = arguments;

            var later = function() {
                timeout = null;
                if (!immediate){
                	run();
                } 
            };

            var run = function(){
        		rst = fn.apply(context, args);
            	context = null;
            	args = null;
            };

            var isImmediate = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (isImmediate){
            	run();
            } 

            return rst;
        };
    };

    return mu;
});