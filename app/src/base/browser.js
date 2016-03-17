define(function(mu) {

    /**
     * 获得当前JS允许的环境(浏览器, 设备, 系统)
     */
    var NG = window.navigator,
        UA = NG.userAgent.toLowerCase(),
        AV = NG.appVersion,
        TV = parseFloat(AV);

    /**
     * mu.envi(String name)
     * 获得当前JS运行的环境(浏览器, 设备, 系统)
     * @param name
     * @returns {*}
     */
    mu.envi = function(/**{string}*/ name) {

        var b_ = function(name) {
            return parseFloat(UA.split(name + '/')[1]) || undefined;
        };

        var envi = _.envi;

        switch(name) {
            // ADOBE AIR
            case 'air':
                return UA.indexOf('adobeair') >= 0;
            // KHTML 浏览器排版引擎
            case 'khtml':
                return AV.indexOf('konqueror') >= 0 ? TV : undefined;
            // webkit 浏览器引擎
            case 'webkit':
            // Trident -> MSHTML 浏览器排版引擎
            case 'trident':
            // Google chrome 浏览器
                return b_(name);

            // Gecko 浏览器引擎
            case 'gecko':

                return _.run(UA.indexOf('Gecko') >= 0 && !envi('khtml') && !envi('webkit') && !envi('trident'), null, function(){
                    return TV;
                });

            case 'chrome':
                return b_(name);
            // Apple Safari 浏览器
            case 'safari':
                return AV.indexOf('Safari') >= 0 && !envi('chrome') && b_('version');
            case 'air3':
                return UA.indexOf('adobeair') >= 0;
        }
    };

    return mu;
});