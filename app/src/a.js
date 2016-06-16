/**
 * a (location)
 * 链接, 和链接相关的方法
 *
 * URI 说明图: https://www.sitepoint.com/url-parsing-isomorphic-javascript/
 */

define(function(mu) {

    /**
     * mu.param(Object obj[, String url, Function fn])
     * 将一个对象扁平化展示成一个GET方法的参数形式 (key=value&key=value)
     * @param obj
     * @param url: url 若存在, 则返回完整的URL路径
     * @param fn: 修正 params, (URL 必须先存在)
     * @returns {string}
     */
    mu.param = function(/**{object}*/ obj, /**[string]*/ url, /**[function]*/ fn){
        if(!_.isObject(obj)){
            return void 0;
        }
        var deepDecodeURIComponent = function(v){
            mu.each(v.split('%'), function(){
                v = decodeURIComponent(v);
            });

            return v;
        };
        var p = '';
        var params = _.flatWithBracket(obj);
        // 修正参数
        if(url){
            params = fn ? fn.call(null, params, url) : params;
        }
        _.each(params, function(v, k){
            v = mu.ifnvl(v, '') + '';
            v = deepDecodeURIComponent(v);
            k = deepDecodeURIComponent(k);
            p = mu.concat(p, '&', encodeURIComponent(k), '=', encodeURIComponent(v));
        });
        return p.replace(/^\&/, '');
    };

    /**
     * mu.param2Obj(String param)
     * 将URL参数转为对象
     * @param param
     * return obj
     */
    mu.param2Obj = function(/**{string}*/ param){
        var p = param.split('&');
        return mu.map(p, function(kv){
            var __kv__ = kv.split('=');
            return {
                '__key__': __kv__[0],
                '__val__': __kv__[1]
            };
        }, {});
    };

    /**
     * mu.parseURL([String url])
     * 分析URL的各部分组成部分
     * @param url || location.href
     * @returns {*}
     */
    mu.parseURL = function(/**[string]*/url){
        var l = window.location;
        url = url || l.href;
        var parser = document.createElement('a');
        parser.href = url;

        var URI = {
            // 完整的URL地址
            source: parser.href,
            // URL协议(不带:)
            protocol: (parser.protocol || l.protocol ).replace(/\:$/, ''),
            // 当前作用域
            host: parser.host,
            // 域名
            hostname: parser.hostname || l.hostname,
            // 端口名
            port: parser.port,
            // origin
            origin: l.origin,
            // 资源路径
            pathname: parser.pathname.replace(/^([^\/])/, '/$1'),
            // 资源文件路径
            path: parser.pathname.replace(/^(.*)?\/.*/, '$1'),
            // get 请求参数
            search: parser.search.replace(/^\?/,''),
            // get 请求参数对象
            query: {},
            // 锚点
            hash: parser.hash.replace(/^#/,''),
            // FTP 或其他协议的账号
            username: parser.username,
            // FTP 或其他协议的密码
            password: parser.password,
            // 文件后缀
            ext: null
        };

        // 查询对象
        URI.query = _.param2Obj(URI.search);

        // 文件后缀名
        URI.ext = mu.run(mu.last(URI.pathname.split('/')), function(item){
            var arr = item.split('.');
            if(arr.length > 1){
                return mu.last(arr);
            }else{
                return null;
            }
        });

        // 协议名
        URI.protocolname = URI.protocol.replace(/\:$/, '');

        /**
         * 基于JS的router信息
         */
        var router = {
            // router 地址
            router: URI.hash.split('?')[0],
            // router search
            routerSearch: URI.hash.split('?')[1],
            // router 参数
            routerQuery: {}
        };

        mu.run(router.routerSearch, function(routerSearch){
            router.routerQuery = _.param2Obj(routerSearch);
        });

        URI = _.extend(URI, router);

        /**
         * 按照参数重组URL
         * @param opts
         */
        URI.rebuild = function(opts){
            opts = mu.extend(URI, opts);
            mu.run(opts.query, function(query){
                opts.search = _.param(query);
            });
            mu.run(opts.routerQuery, function(query){
                opts.hash = (opts.router || opts.hash) + '?' + _.param(opts.routerQuery);
            });
            parser = _.extend(parser, opts);
            return parser.href;
        };

        return URI;
    };

    /**
     * mu.rebuildURL
     * 重组一个链接
     * @param oldurl
     * @param opts
     * @returns {string}
     */
    mu.rebuildURL = function(/**{string}*/ oldurl, /**{object}*/ opts){
        return _.parseURL(oldurl).rebuild(opts);
    };

});