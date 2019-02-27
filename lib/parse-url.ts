/**
 * parseURL
 * URL 解构
 * 不封装在main.ts, 单独调用
 * @param url
 */
import * as _ from 'lodash';
import { __param2Obj, __param } from './utils';
import { __run, __ifnvl } from './run';
import { __noop } from './__noop';
import { ifnvl } from '.';
import { __isEmpty } from './__theory';
import { __extend } from './object';

export function parseURL(url?: string) {
    let l = window.location;
    url = url || l.href;
    let parser = document.createElement('a');
    parser.href = url;

    let URI = {
        // 完整的URL地址
        source: parser.href,
        // URL协议(不带:)
        protocol: parser.protocol || l.protocol,
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
        search: parser.search.replace(/^\?/, ''),
        // get 请求参数对象
        query: {},
        // 锚点
        hash: parser.hash.replace(/^#/, ''),
        // FTP 或其他协议的账号
        username: parser.username,
        // FTP 或其他协议的密码
        password: parser.password,
        // 文件后缀
        ext: null,
        protocolname: void 0,
        rebuild: void 0,
        reform: void 0
    };

    // 查询对象
    URI.query = __param2Obj(URI.search);

    // 文件后缀名
    URI.ext = __run(_.last(URI.pathname.split('/')), (item) => {
        var arr = item.split('.');
        if (arr.length > 1) {
            return _.last(arr);
        } else {
            return null;
        }
    });

    // 协议名
    URI.protocolname = URI.protocol.replace(/\:$/, '');

    /**
     * 基于JS的router信息
     */
    let router = {
        // router 地址
        router: URI.hash.split('?')[0],
        // router search
        routerSearch: URI.hash.split('?')[1],
        // router 参数
        routerQuery: {}
    };

    __run(router.routerSearch, (routerSearch) => {
        router.routerQuery = __param2Obj(routerSearch);
    });

    URI = _.extend(URI, router);

    /**
     * 按照参数重组URL
     * @param opts
     */
    URI.rebuild = function(opts) {
        opts = __extend(true, URI, opts);

        __run(opts.query, function(query) {
            opts.search = __param(query);
        });

        let routerSearch = __run(opts.routerQuery, function(query) {
            return __param(query);
        });

        routerSearch = routerSearch ? '?' + routerSearch : '';

        opts.hash = __ifnvl(opts.router, opts.hash) + routerSearch;

        parser = _.extend(parser, opts);

        return parser.href;
    };

    /**
     * 通过回调函数重写URL部分参数
     * @param fn
     */
    URI.reform = (fn) => {
        let opts = fn.call(null, URI);

        if (__isEmpty(opts)) {
            return console.error('回调函数必须返回对象');
        }

        return URI.rebuild(opts);
    };

    return URI;
}

/**
 * rebuildURL
 * 重组一个链接
 * @param oldurl
 * @param opts
 * @returns {string}
 */
export function rebuildURL(/**{string}*/ oldurl, /**{object}*/ opts) {
    return parseURL(oldurl).rebuild(opts);
}
