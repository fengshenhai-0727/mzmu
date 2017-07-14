define([
    '../base',
    '../string',
    '../array'
    //'../date'
], function() {

    /**
     * mu.format()
     * 各种类型的值, 格式化成字符串
     * @param src
     * @param method
     * @returns {*}
     *
     * exp.
     *
     * mu.format('Hello {0}, {1}!', 'Mizi', 'Welcome')
     * // -> "Hello Mizi, Welcome!"
     *
     *  mu.format('Hello {name}, {word}!', {name: 'mizi', word: 'welcome'})
     *  // -> Hello mizi, welcome!
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
     * mu.format(1234567890.1234)
     * '1,234,567,890.1234'
     */
    mu.format = function(/**{any}*/ src, /**{string, number}*/ method) {
        var args = _.args(arguments);
        var format;

        src = args.shift();

        var numfomart = function(str) {
            return str.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g, ',$1');
        };

        switch(_.type(src)) {
            // 字符串替换 String.format
            case 'string':
                return _.run(args, function() {
                    if(args.length === 1 && mu.isObject(args[0])) {
                        return src.replace(/\{(.*?)\}/g, function(m, i) {
                            return _.ifnvl(_.prop(args[0], i), m);
                        });
                    } else {
                        return src.replace(/\{(\d+)\}/g, function(m, i) {
                            return _.ifnvl(args[i], m);
                        });
                    }
                }, function() {
                    return src;
                });

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
                    {key: 'y{4}', val: y},
                    {key: 'y{2}', val: _.leftpad(y % 100, 2)},
                    {key: 'q', val: q},
                    {key: 'M{2}', val: _.leftpad(M, 2)},
                    {key: 'M', val: M},
                    {key: 'w', val: w},
                    {key: 'd{2}', val: _.leftpad(d, 2)},
                    {key: 'd', val: d},
                    {key: 'h{2}', val: _.leftpad(h, 2)},
                    {key: 'h', val: h},
                    {key: 'm{2}', val: _.leftpad(m, 2)},
                    {key: 'm', val: m},
                    {key: 's{2}', val: _.leftpad(s, 2)},
                    {key: 's', val: s},
                    {key: 'S{2}', val: S}
                ];

                format = args.shift() || '';

                if(!format) {
                    return '';
                }

                _.each(dateVals, function(o) {
                    var reg = new RegExp('(' + o.key + ')', 'g');
                    format = format.replace(reg, o.val);
                });

                return format;

            // 将数字转为科学计数法, 输出字符串
            // 科学计数法为整数
            // todo -> percent
            // todo -> substr decimal length
            case 'number':
                /**
                 * method
                 * 'fn:type:count'
                 */
                method = method || '';
                var mds = method.split(':');
                var fn = mds[0] || 'round';
                var count, size, pow, rst;

                switch(mds.length) {
                    // 数字千分位 (若是小数 默认四舍五入)
                    case 1:
                        return numfomart(Math[fn](src).toString());
                    // 截取小数位数, 默认四舍五入
                    // 可强制截取小数位数, 如, 10 -> 10.00
                    // 当size为负数时 , 保留强制保留小数位数
                    case 2:
                        count = mds[1];
                        size = Math.abs(count);
                        pow = Math.pow(10, size);
                        rst = Math[fn](src * pow);

                        if(count < 0) {
                            var reg = new RegExp('(?=(?!^)(?:))(\\\d{' + size + '}$)', 'g');
                            rst = rst || _.leftpad(0, size + 1);
                            return rst.toString().replace(reg, '.$1');
                        } else {
                            return (rst / pow).toString();
                        }

                    // 化成百分数(percent) 或 千分数(permille)
                    case 3:
                        var sign = mds[1] || 'percent';
                        count = mds[2];

                        var method_ = fn + ':' + count;

                        if(sign === 'percent'){
                            return _.format(src * 100, method_) + '%';
                        } else if(sign === 'permile') {
                            return _.format(src * 1000, method_) + '‰';
                        }

                }
        }
    };

    return mu;

});