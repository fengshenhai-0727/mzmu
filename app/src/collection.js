/**
 * 集合
 */

define(function(mu){
	/**
	 * mu.remove(Collection src, Any item)
	 * 删除集合中的某一项
	 * @param  item
	 * @return {collection}
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
	mu.remove = function(/**{collection}*/ src, /**{any}*/ item){

		if(_.isFunction(item)){
			_.each(src, function(v, k){
				if(item.call(null, v, k, src)){
					src = _.remove(src, k);
				}	
			});
		}else{
			if(_.isArray(src) && _.isNumeric(item)){
				src.splice(item, 1);
			}else{
				delete src[item];
			}
		}

		return src;
	};


	return mu;
});