/**
 * 迭代器
 */

define(['./iterator'], function(mu) {

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

    return mu;
});



