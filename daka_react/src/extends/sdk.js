var d = document,
    w = window,
    de = document.documentElement,
    DaKaSDK_Appid_G = '',
    DK_prohibit_flag = 'false',
    DK_close = '';
// Daka工具类
window.DakaUtils = {
    nativeIsArray: Array,
    isElement: function (obj) {
        return !!(this.getTag(obj) && this.getTag(obj).nodeType === 1);
    },
    isArray: this.nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    },
    isObject: function (obj) {
        var type = typeof obj;
        return type === 'funciton' || type === 'object' && !!obj;
    },
    each: function (obj, fn) {
        if (this.isElement(obj)) {
            fn(obj);
        } else if (this.isArray(obj)) {
            for (var i = 0, length = obj.length; i < length; i++) {
                fn(obj[i])
            }
        } else {
            fn('暂时不支持object');
        }
        return this;
    },
    bind: function (obj, eventType, fn) {
        var me = this;
        if (!me.isElement(arguments[0])) {
            obj = arguments[0];
        }
        me.each(obj, function (dom, index) {
            if (me.isElement(obj)) {
                if (dom.addEventListener) { //DOM 2.0
                    dom.addEventListener(eventType, fn, false);
                } else if (dom.attachEvent) { //IE5+
                    dom.attachEvent('on' + eventType, fn)
                } else { //DOM 0
                    dom['on' + eventType] = fn;
                }
            } else {
                if (!obj) return;
                for (var i = 0, length = obj.length; i < length; i++) {
                    var dom = obj[i];
                    if (me.isElement(dom)) {
                        if (dom.addEventListener) { //DOM 2.0
                            dom.addEventListener(eventType, fn, false);
                        } else if (dom.attachEvent) { //IE5+
                            dom.attachEvent('on' + eventType, fn)
                        } else { //DOM 0
                            dom['on' + eventType] = fn;
                        }
                    }
                }
            }
        });
        return this;
    },
    //	获取标签
    getTag: function (id) {
        if ((/\#/g).test(id) && id.indexOf('#') == 0) { //判断是否为id
            return d.getElementById(id.replace(/#/g, ''));
        } else if ((/^(\[)+[a-z0-9]+(\])+$/ig).test(id)) { //判断是否为Name
            return d.getElementsByName(id.replace(/\[(\/?[a-z0-9]*)\]/ig, '$1'));
        } else if ((/\./g).test(id) && id.indexOf('.') == 0) { //判断是否为class
            return d.getElementsByClassName(id.replace('.', ''));
        } else if ((/^[a-z1-6]+$/ig).test(id)) { //判断是否为tagName
            return d.getElementsByTagName(id);
        } else {
            return id;
        }
    },
    //	获取HTML标签Value
    getTagVal: function (id) {
        return this.getTag(id) ? (this.getTag(id).value ? this.getTag(id).value.trim() : '') : '';
    },
    getAttr: function (dom, attr) {
        if (!dom) return;
        return this.isElement(dom) ? this.getTag(dom).getAttribute(attr) : '';
    },
    setAttr: function (dom, attrs) {
        if (!dom) return;
        var array = dom;
        if (!this.isArray(dom)) {
            array = [];
            array.push(dom);
        }
        for (var i = 0; i < array.length; i++) {
            if (this.isArray(array[i])) {
                for (var j = 0; j < array.length; j++) {
                    if (this.isElement(array[i][j])) {
                        for (var k in attrs) {
                            array[i][j].setAttribute(k, attrs[k]);
                        }
                    }
                }
            } else {
                if (this.isElement(array[i])) {
                    for (var k in attrs) {
                        array[i].setAttribute(k, attrs[k]);
                    }
                }
            }
        }
    },
    //	增加样式,支持多个PS:addClass(dom,'class1 class2 class3 ...')
    addClass: function (id, className) {
        if (this.isElement(id)) {
            if (className) {
                this.getTag(id).classList.add(className.replace(/\s/ig, ','));
            }
        }
    },
    //	删除样式,支持多个PS:removeClass(dom,'class1 class2 class3 ...')
    removeClass: function (id, className) {
        if (this.isElement(id)) {
            if (className) {
                this.getTag(id).classList.remove(className.replace(/\s/ig, ','));
            }
        }
    },
    toggleClass: function (id, className) {},
    getCss: function (dom, css) {
        if (!dom) return false;
        return this.getTag(dom).style[css];
    },
    //	设置CSS样式
    setCss: function (domArray, cssObj) {
        if (!domArray) {
            return false;
        }
        var array = domArray;
        if (!this.isArray(domArray)) {
            array = [];
            array.push(domArray);
        }
        for (var i = 0; i < array.length; i++) {
            if (this.isArray(array[i])) {
                for (var k = 0; k < array[i].length; k++) {
                    for (var j in cssObj) {
                        array[i][k].style[j] = cssObj[j];
                    }
                }
            } else {
                for (var j in cssObj) {
                    array[i].style[j] = cssObj[j];
                }
            }
        }
    },
    //	HTML标签赋值
    setTagVal: function (domArray, val, state) {
        if (!domArray) {
            return;
        }
        var array = domArray;
        if (!DakaUtils.isArray(domArray)) {
            array = [];
            array.push(domArray);
        }
        val = val || '';
        for (var i = 0; i < array.length; i++) {
            if (this.isArray(array[i])) {
                for (var j = 0; array[i].length; j++) {
                    if (array[i][j].tagName.toLowerCase() == 'input') {
                        array[i][j].value = val;
                    } else {
                        array[i][j].innerText = val;
                    }
                }
            } else {
                if (array[i].tagName.toLowerCase() == 'input') {
                    array[i].value = val;
                } else {
                    array[i].innerText = val;
                }
            }
        }
    },
    //	获取当前时间
    getDateTime: function () {
        var dateTime = new Date(),
            year = dateTime.getFullYear(),
            month = ((dateTime.getMonth() + 1) > 10 ? (dateTime.getMonth() + 1) : '0' + (dateTime.getMonth() + 1)),
            day = dateTime.getDate() > 10 ? dateTime.getDate() : '0' + dateTime.getDate(),
            hours = dateTime.getHours() > 10 ? dateTime.getHours() : '0' + dateTime.getHours(),
            minutes = dateTime.getMinutes() > 10 ? dateTime.getMinutes() : '0' + dateTime.getMinutes();
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
    },
    getQueryString: function (name) {
        //	针对头像地址有"?"情况 修改代码 by xueyuan
        var arr = window.location.search.substring(window.location.search.indexOf('?') + 1, window.location.search.length);
        if (typeof name != "undefined") {
            var reg = new RegExp(name + "=([^&]*)");
            var r = arr.match(reg);
            if (r != null) return unescape(r[1]);
            return null;
        } else {
            var theRequest = {};
            if (arr.length > 0) {
                var strs = arr.split("&");
                for (var i = 0; i < strs.length; i++) {
                    var tmpStrs = strs[i].split("=");
                    if (tmpStrs.length > 2) {
                        var string = strs[i].split(tmpStrs[0] + "=");
                        theRequest[tmpStrs[0]] = string[1];
                    } else {
                        theRequest[tmpStrs[0]] = tmpStrs[1];
                    }
                }
            }
            return theRequest;
        }
    },
    // cookie 操作
    cookie: {
        set: function (name, value, timeout) {
            var cookieString = name + "=" + encodeURIComponent(value);
            if (timeout > 0) {
                var date = new Date();
                date.setTime(date.getTime() + timeout * 1000);
                cookieString = cookieString + "; expires=" + date.toGMTString() + ";path=/;domain=" + d.domain;
            } else {
                cookieString = cookieString + "; expires=Session;path=/;";
            }
            d.cookie = cookieString;
            try {
                if (window.localStorage) {
                    window.localStorage[name] = value;
                }
            } catch (e) {

            }
        },
        get: function (name) {
            var strCookie = d.cookie;
            var arrCookie = strCookie.split("; ");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if (arr[0] == name) {
                    return decodeURIComponent(arr[1]);
                }
            }
            var cookieVal = "";
            try {
                if (window.localStorage) {
                    if (typeof window.localStorage[name] != "undefined") {
                        return decodeURIComponent(window.localStorage[name]);
                    }
                }
            } catch (e) {

            }
            return "";
        },
        del: function (name) {
            d.cookie = name + "=;expires=Session;path=/;" + d.domain;
            try {
                if (window.localStorage) {
                    if (typeof window.localStorage[name] != "undefined") {
                        window.localStorage.removeItem(name);
                    }
                }
            } catch (e) {

            }
        }
    },
    device: (function () {
        // 获取窗口尺寸
        // var screen = EgretSDK_getScreenSize();
        // var ua = w.navigator.userAgent.toLowerCase();
        // var type = "", browser = "unknown";
        // if (ua.indexOf("iphone") != -1) {
        // 	type = "iphone";
        // }
        // if (ua.indexOf("ipad") != -1) {
        // 	type = "ipad";
        // }
        // if (ua.indexOf("android") != -1) {
        // 	type = "android";
        // }
        // // 浏览器类型
        // if(ua.match(/micromessenger/i) == "micromessenger") {
        //     browser = "weixin";
        // } else if(ua.match(/mqqbrowser/i) == "mqqbrowser") {
        //     browser = "qq";
        // } else if(ua.match(/weibo/i) == "weibo") {
        //     browser = "weibo";
        // }
        // return {type: type, browser: browser, screen: screen};
    })(),
    // ajax
    ajax: function (setting) {
        if (window.XMLHttpRequest) {
            var data = "";
            // 传递数据
            if (typeof setting.data != "undefined") {
                if (typeof setting.data == "object") {
                    data = Object.keys(setting.data).map(function (key) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(setting.data[key]);
                    }).join('&');
                } else {
                    data = setting.data;
                }
            }
            // 传递方式
            if (typeof setting.type == "undefined") {
                setting.type = "GET"; // 默认GET方式
                if (data != "") {
                    var symbol = "?";
                    if (setting.url.indexOf("?") != -1) symbol = "&";
                    setting.url += symbol + data;
                }
            }
            
            // 默认异步方式
            if (typeof setting.async == "undefined") setting.async = true;
            // 返回数据格式，默认文本
            if (typeof setting.dataType == "undefined") setting.dataType = "json";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open(setting.type, setting.url, setting.async);
            xmlhttp.withCredentials = true;
            if (typeof setting.success == "function") {
                xmlhttp.onreadystatechange = function () {

                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var response = xmlhttp.responseText;
                        if (setting.dataType == "json") {
                            setting.success(JSON.parse(response));
                        } else if (setting.dataType == "jsonp") {
                            eval(response);
                        } else {
                            setting.success(response);
                        }
                    }
                }
            }
            if (setting.type == "POST") {
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
            xmlhttp.send(data);
        } else {
            alert("浏览器版本不支持AJAX");
        }
    },
    //数据埋点--获取Uid
    dataStatisticalUid: function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1)
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 3) | 8, 1);
        s[8] = s[13] = s[18] = s[23] = "";
        var uuid = s.join("");
        return uuid;
    },
    //数据埋点
    dataStatistical: function () {
        if (!DakaUtils.cookie.get('egretDataStatisticalUid'))
            DakaUtils.cookie.set('egretDataStatisticalUid', this.dataStatisticalUid());
        DaKaSDK_Appid_G = DakaUtils.cookie.get('egretDataStatisticalUid');
        var os_G = function () {
            var appVersion = window.navigator.appVersion;
            var isAndroid = appVersion.indexOf("Android") > -1 || appVersion.indexOf("Linux") > -1;
            var isIos = appVersion.indexOf("iPhone") > -1 || appVersion.indexOf("Mac") > -1;
            var isWindows = appVersion.indexOf("Windows") > -1;
            var os = 4;
            var brand = "";
            var version = "";
            var osInfo = {};
            if (isAndroid !== false) {
                os = 3;
                var start = appVersion.indexOf("(");
                var end = appVersion.indexOf(")");
                var info = appVersion.substring(start + 1, end);
                var infoArr = info.split(";");
                var brandStr = infoArr[infoArr.length - 1].trim();
                brand = brandStr.substring(0, brandStr.indexOf("Build") - 1);
                for (var i = infoArr.length - 1; i >= 0; i--) {
                    if (infoArr[i].indexOf("Android") > -1) {
                        version = infoArr[i].trim().substring(8);
                        break
                    }
                }
            }
            if (isIos !== false) {
                os = 1;
                var start = appVersion.indexOf("(");
                var end = appVersion.indexOf(")");
                var info = appVersion.substring(start + 1, end);
                var infoArr = info.split(";");
                brand = infoArr[0];
                for (var i = infoArr.length - 1; i >= 1; i--) {
                    if (infoArr[i].indexOf("CPU") > -1) {
                        var versionArr = infoArr[i].trim().split(" ");
                        for (var i = 1; i <= versionArr.length - 1; i++) {
                            if (versionArr[i].indexOf("_") > -1) {
                                version = versionArr[i].trim();
                                break
                            }
                        }
                        break
                    }
                }
            }
            if (isWindows !== false) {
                os = 2;
                var start = appVersion.indexOf("(");
                var end = appVersion.indexOf(")");
                var info = appVersion.substring(start + 1, end);
                var infoArr = info.split(";");
                brand = infoArr[0];
                for (var i = 1; i <= infoArr.length - 1; i++) {
                    var index = infoArr[i].indexOf("Phone");
                    if (index > -1) {
                        version = infoArr[i].substring(index + 6);
                        break
                    }
                }
            }
            osInfo["os"] = os;
            osInfo["brand"] = brand;
            osInfo["version"] = version;
            return osInfo;
        }
        var json = {
            appId: "1002",
            uid: DaKaSDK_Appid_G,
            os: os_G()['os'].toString(),
            chanId: BLUC.chanId,
            gameId: BLUC.gameId
        };
        if (arguments[0] && typeof arguments[0] == 'object') {
            json.act = "error";
            json.data = arguments[0];
        } else
            json.act = arguments[0];
        if (arguments[1])
            json.ads = arguments[1];
        var formData = new FormData();
        formData['data'] = JSON.stringify(json);
        // DakaUtils.ajax({
        //     url: 'http://pages.egret.com/page.php',
        //     type: "POST",
        //     data: formData,
        //     success: function(data) {

        //     }
        // });
    },
    // 获取屏幕尺寸
    getWindowSize: function () {
        var winWidth = 0;
        if (w.innerWidth) {
            winWidth = w.innerWidth;
        } else if ((d.body) && (d.body.clientWidth)) {
            winWidth = d.body.clientWidth;
        }
        // 通过深入Document内部对body进行检测，获取窗口大小
        if (de && de.clientWidth) {
            winWidth = de.clientWidth;
        }

        var winHeight = 0;
        if (w.innerHeight) {
            winHeight = w.innerHeight;
        } else if ((d.body) && (d.body.clientHeight)) {
            winHeight = d.body.clientHeight;
        }
        // 通过深入Document内部对body进行检测，获取窗口大小
        if (de && de.clientHeight) {
            winHeight = de.clientHeight;
        }
        return {
            w: winWidth,
            h: winHeight
        };
    },
    // 调整窗体位置
    orientationChange: function () {
        var dom = d.getElementById("tagDakaBox"),
            parent = this;
        ''
        if (dom) {
            setTimeout(function () {
                var screenSize = parent.getWindowSize();
                var top = dom.offsetHeight / 2;
                if (top < 0) top = 10;
                dom.style.marginTop = -top + 'px';
                dom.style.opacity = '1';
            }, 0);
        }
    },
    // 获取浏览器客户端信息PS：微信浏览器、phone、pc
    getClientInfo: function () {
        var sUserAgent = window.navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (sUserAgent.search(/micromessenger/i) > -1) {
            return 'weixin';
        } else if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return 'mobile';
        } else {
            return 'pc';
        }
    },
    isWX: (function () {
        if (w.navigator.userAgent.toLowerCase().search(/micromessenger/i) < 0) {
            return true;
        }
        return false;
    })(),
    // 消息提示框
    showTipsBox: function (tipsMsg) {
        var parent = this;
        if (!window.tipsBoxTimer) {
            tipsBoxTimer = setTimeout(function () {}, 0);
        }
        clearTimeout(tipsBoxTimer);
        var tagTBParent = d.getElementById('tagTBParent'),
            msgBox = d.getElementById('tagTipsBox');
        if (!tagTBParent) {} else {
            tagTBParent.style.display = 'block';
            msgBox.innerText = tipsMsg;
        }
        //全站同一两秒
        tipsBoxTimer = setTimeout(function () {
            if (parent.isElement(tagTBParent)) {
                tagTBParent.style.display = 'none';
            } else {}
        }, 2000);
    },
    siblingElem: function (elem) {
        var _nodes = [],
            _elem = elem;
        while ((elem = elem.previousSibling)) {
            if (elem.nodeType === 1) {
                _nodes.push(elem);
                break;
            }
        }

        elem = _elem;
        while ((elem = elem.nextSibling)) {
            if (elem.nodeType === 1) {
                _nodes.push(elem);
                break;
            }
        }

        return _nodes;
    },
    // 去掉字符串前后空格
    DK_trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    // 禁止滑动
    DK_prohibit: function () {
        document.addEventListener("touchmove", function (e) {
            if (!DK_prohibit_flag) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, false);
        document.body.style.overflow = 'hidden';
    },
    // 放开滑动
    DK_relieve: function () {
        DK_prohibit_flag = true;
        document.body.style.overflow = 'auto';
    },

    // 渲染窗体
    egretBoxRender: function () {

    }

};
window.DaKaSDK = {
    sdk: 'http://wan.keejoy.com',
    // sdk: 'http://me.daka.com',
    // 接口地址
    api: "http://wan.keejoy.com",
    //v2老版本需求
    apiForBall: 'https://api.egret-labs.org/v2',
    // 需要加载的其他组件
    extends: [],
    // 回调参数json
    json: {},
    // 回调方法
    callback: function () {},
    // 加载css
    loadcss: function (csss) {
        if (typeof (csss) != "object") var csss = [csss];
        var head = d.getElementsByTagName("head").item(0) || de;
        var s = new Array(),
            last = csss.length - 1,
            recursiveLoad = function (i) { //递归
                s[i] = d.createElement("link");
                s[i].setAttribute("rel", "stylesheet");
                s[i].setAttribute("type", "text/css");
                s[i].setAttribute("async", true);
                s[i].onload = s[i].onreadystatechange = function () {
                    if (!0 || this.readyState == "loaded" || this.readyState == "complete") {
                        this.onload = this.onreadystatechange = null;
                        if (i != last) recursiveLoad(i + 1);
                    }
                }
                s[i].setAttribute("href", csss[i] + "?v=" + +(Math.random() * 100000));
                head.appendChild(s[i]);
            };
        recursiveLoad(0);
    },
    // 加载JS
    loadjs: function (scripts, callback, addContainer) {
        if (typeof (scripts) != "object") var scripts = [scripts];
        if (!scripts.length) {
            return
        };
        if (typeof (addContainer) == 'undefined') {
            addContainer = 'head';
        }
        var head = d.getElementsByTagName(addContainer).item(0) || de;
        var s = new Array(),
            last = scripts.length - 1,
            recursiveLoad = function (i) { //递归
                s[i] = d.createElement("script");
                s[i].setAttribute("type", "text/javascript");
                s[i].onload = s[i].onreadystatechange = function () {
                    if (!0 || this.readyState == "loaded" || this.readyState == "complete") {
                        this.onload = this.onreadystatechange = null;
                        this.parentNode.removeChild(this);
                        if (i != last) {
                            recursiveLoad(i + 1);
                        } else {
                            callback();
                        }
                    }
                }
                s[i].setAttribute("src", scripts[i] + "?v=" + (Math.random() * 100000));
                head.appendChild(s[i]);
            };
        recursiveLoad(0);
    }
}
// 以下内容为通用接口
window.DaKaH5SDK = {
    urlParams: "",
    // 初始化
    init: function (json, callback) {
        var urlParams = DakaUtils.getQueryString();
        if (typeof urlParams != 'undefined' && DakaUtils.isObject(urlParams)) {
            DaKaSDK.urlParams = urlParams;
            // SDK调试环境
            // if (typeof urlParams['egretSdkDomain'] != "undefined") DaKaSDK.sdk = urlParams['egretSdkDomain'];
            // 接口地址
            // if (typeof urlParams['egretServerDomain'] != "undefined") DaKaSDK.api = urlParams['egretServerDomain'];
            // 需要加载的其他组件
            if (typeof urlParams['extends'] != "undefined") {
                var extendsSDK = urlParams['extends'].split(",");
                for (var i = 0; i < extendsSDK.length; i++) {
                    DaKaSDK.extends.push(DaKaSDK.sdk + "/sdk/" + extendsSDK[i] + ".js");
                }
            }
        }
        // 加载css
        DaKaSDK.loadcss([DaKaSDK.sdk + "/misc/v1/css/login.css"]);
        DaKaSDK.loadjs(DaKaSDK.extends, function () {
            // 请将此行代码置于最后
            DaKaSDK.callback({
                result: 0
            });
        });
    },
    // 定义nest需要的接口，在具体的渠道js中可以重写接口。请参照默认渠道egret.js
    // 检测用户登录
    checkLogin: function (json, callback) {
        callback(json);
    },
    // 用户登录
    login: function (json, callback) {
        callback(json);
    },
    // 登出
    logout: function (json, callback) {
        callback(json);
    },
    // 获取用户支持
    isSupport: function (json, callback) {
        callback(json);
    },
    // 是否支持分享，供nest share模块调用
    isSupportShare: function (json, callback) {
        callback(json);
    },
    // 设置分享数据，供nest share模块调用
    setShareDefaultData: function (json, callback) {
        callback(json);
    },
    // 分享，供nest share模块调用
    share: function (json, callback) {
        callback(json);
    },
    // 是否支持关注，供nest social和app模块调用
    isSupportAttention: function (json, callback) {
        callback(json);
    },
    // 打开论坛，供nest social模块使用
    openBBS: function (json, callback) {
        callback(json);
    },
    // 是否支持发送到桌面, 供nest app模块调用
    isSupportSendToDesktop: function (json, callback) {
        callback(json);
    },
    // 关注, 供nest app模块调用
    attention: function (json, callback) {
        callback(json);
    },
    // 关送到桌面, 供nest app模块调用
    sendToDesktop: function (json, callback) {
        callback(json);
    },
    // 获取自定义信息, 供nest app模块调用
    getCustomInfo: function (json, callback) {
        callback(json);
    },
    pay: function (json, callback) {
        callback(json);
    }
};
DaKaH5SDK.init();