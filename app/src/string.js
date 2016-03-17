define([
    'string/trim',
    'string/substr'
], function(mu) {

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


    return mu;
});