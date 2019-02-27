"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var utils_1 = require("./utils");
var run_1 = require("./run");
var __theory_1 = require("./__theory");
var object_1 = require("./object");
function parseURL(url) {
    var l = window.location;
    url = url || l.href;
    var parser = document.createElement('a');
    parser.href = url;
    var URI = {
        source: parser.href,
        protocol: parser.protocol || l.protocol,
        host: parser.host,
        hostname: parser.hostname || l.hostname,
        port: parser.port,
        origin: l.origin,
        pathname: parser.pathname.replace(/^([^\/])/, '/$1'),
        path: parser.pathname.replace(/^(.*)?\/.*/, '$1'),
        search: parser.search.replace(/^\?/, ''),
        query: {},
        hash: parser.hash.replace(/^#/, ''),
        username: parser.username,
        password: parser.password,
        ext: null,
        protocolname: void 0,
        rebuild: void 0,
        reform: void 0
    };
    URI.query = utils_1.__param2Obj(URI.search);
    URI.ext = run_1.__run(_.last(URI.pathname.split('/')), function (item) {
        var arr = item.split('.');
        if (arr.length > 1) {
            return _.last(arr);
        }
        else {
            return null;
        }
    });
    URI.protocolname = URI.protocol.replace(/\:$/, '');
    var router = {
        router: URI.hash.split('?')[0],
        routerSearch: URI.hash.split('?')[1],
        routerQuery: {}
    };
    run_1.__run(router.routerSearch, function (routerSearch) {
        router.routerQuery = utils_1.__param2Obj(routerSearch);
    });
    URI = _.extend(URI, router);
    URI.rebuild = function (opts) {
        opts = object_1.__extend(true, URI, opts);
        run_1.__run(opts.query, function (query) {
            opts.search = utils_1.__param(query);
        });
        var routerSearch = run_1.__run(opts.routerQuery, function (query) {
            return utils_1.__param(query);
        });
        routerSearch = routerSearch ? '?' + routerSearch : '';
        opts.hash = run_1.__ifnvl(opts.router, opts.hash) + routerSearch;
        parser = _.extend(parser, opts);
        return parser.href;
    };
    URI.reform = function (fn) {
        var opts = fn.call(null, URI);
        if (__theory_1.__isEmpty(opts)) {
            return console.error('回调函数必须返回对象');
        }
        return URI.rebuild(opts);
    };
    return URI;
}
exports.parseURL = parseURL;
function rebuildURL(oldurl, opts) {
    return parseURL(oldurl).rebuild(opts);
}
exports.rebuildURL = rebuildURL;
//# sourceMappingURL=parse-url.js.map