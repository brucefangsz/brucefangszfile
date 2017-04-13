declare var require: any;
const superagent = require('superagent');
let [w, d, db] = [window, document, document.body];
import * as React from 'react';
import * as OTF from './ObjectTypeFormat';
import { Link, hashHistory } from 'react-router';

// 域名
export const GC_AJAX_URL = 'http://wan.keejoy.com';
export let Control = {
    loginState: function () {
        return Control.user.get()['userToken'] ? true : false;
    },
    user: {
        get: function () {
            let ui = {
                userToken : false
            };
            if(!Control.cookie.get('DK_Player')['userToken']){
                CustomAjax({
                    method : 'GET',
                    async : false,
                    url : '/Api/lib/user.getInfo',
                    success : function(data : any){
                        if(data.code == '1'){
                            Control.cookie.set('DK_Player',JSON.stringify(data.data),'');
                        }else{
                            Control.cookie.set('DK_Player',JSON.stringify(ui),'');
                        }
                    }
                });
            }
            return Control.cookie.get('DK_Player');
        }
    },
    cookie: {
        set: function (name:any, value:any, timeout:any) {
            var cookieString = name + "=" + encodeURIComponent(value);
            if (timeout > 0) {
                var date:any = new Date();
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
        get: function (name:any) {
            var strCookie = d.cookie;
            var arrCookie = strCookie.split("; ");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if (arr[0] == name) {
                    return JSON.parse(decodeURIComponent(arr[1]));
                }
            }
            var cookieVal = "";
            try {
                if (window.localStorage) {
                    if (typeof window.localStorage[name] != "undefined") {
                        return JSON.parse(decodeURIComponent(window.localStorage[name]));
                    }
                }
            } catch (e) {

            }
            return {};
        },
        del: function (name:any) {
            // var date:any = new Date();
            // date.setTime(date.getTime() - 10000);
            // d.cookie = name + "=;expires="+date.toGMTString()+";path=/;" + d.domain;
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
}
let urlParam = '?userToken=' + (Control.user.get()['userToken'] ? encodeURIComponent(Control.user.get()['userToken']) : '');
// Ajax
export async function Ajax(setting: OTF.AjaxSetting): Promise<any | undefined> {
    try {
        setting.method = setting.method ? setting.method : 'GET';
        let url = GC_AJAX_URL + setting.url,
            dataSoure: any,
            data: OTF.AjaxResponse = {
                code: -1,
                msg: '',
                data: {}
            };
        if (setting.method.toLocaleUpperCase() == 'GET') {
            await superagent.get(url + urlParam)
                .query(setting.data)
                // .withCredentials()
                .then((data: any) => {
                    dataSoure = data;
                });
        } else {
            setting.data['userToken'] = Control.user.get()['userToken'] ? encodeURIComponent(Control.user.get()['userToken']) : '';
            await superagent.post(url)
                .type('form')
                // .withCredentials()
                .send(setting.data)
                .then((data: any) => {
                    dataSoure = data;
                });
        }
        if (dataSoure && dataSoure.status == 200) {
            if (dataSoure.body && dataSoure.body.code == 1) {
                data = {
                    code: dataSoure.body.code,
                    msg: dataSoure.body.msg,
                    data: dataSoure.body.data
                }
            } else {
                if (dataSoure.body) {
                    data = {
                        code: dataSoure.body.code,
                        msg: dataSoure.body.msg,
                        data: []
                    }
                } else {
                    data = {
                        code: -9,
                        msg: '接口无响应',
                        data: []
                    }
                }
            }
        }
        return data;
    } catch (e) {
        console.info(e);
    }
}
export function CustomAjax(setting:any){
    setting = setting || '';
    let data:any = '';
    setting.method = setting.method || 'GET';
    setting.dataType = setting.dataType || 'json';
    setting.async = typeof setting.async == 'undefined' ? true : setting.async;
    setting.url = GC_AJAX_URL + setting.url;
    if(typeof setting.data != 'undefined'){
        data = Object.keys(setting.data).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(setting.data[key]);
        }).join('&');
    }
    let xhr = new XMLHttpRequest();
    if(setting.method.toUpperCase() == 'GET'){
        if(urlParam){
            setting.url += urlParam + '&' + data;
        }else{
            setting.url += '?' + data;
        }
    }
    xhr.open(setting.method,setting.url,setting.async);
    xhr.withCredentials = true;
    if(typeof setting.success == 'function'){
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
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
    if(setting.method.toUpperCase() != 'GET'){
       xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
    }
    xhr.send(data);
}
//对象转换为数组
export function obj2Arr(obj: any) {
    let arr = [];
    for (let i in obj) {
        arr.push(obj[i]);
    }
    return arr;
}
//时间戳转时间
export function conversionTime(timestamp: string) {
    var nTimes = parseInt(timestamp);
    var time = new Date(nTimes * 1000);
    var month = time.getMonth() >= 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
    var date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate();
    return time.getFullYear() + '-' + month + '-' + date;
}
// 通用正则
export let DAKAREG = {
    emailReg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    telReg: /^1[3|4|5|7|8]\d{9}$/,
    IDReg: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
    nameReg: /^[\u4e00-\u9fa5]{2,4}$/,
    flagReg: /^([\u4e00-\u9fa5]|[a-zA-Z])+$/,
    numReg: /\d/,
    codeReg: /\d{6}/,
    codeReg4: /\d{4}/,
    passReg: /^[0-9a-zA-Z,.!?`~#$%^&*()-=_+<>'"\[\]\{\}\\\|]{6,15}$/,
}
// 
export function IconView(iconInfo: OTF.SmallIconView) {
    return (
        <li key={iconInfo.icon_url}>
            <Link to={`/play/`+iconInfo.gId}><img className={iconInfo.class} src={iconInfo.icon_url} /></Link>
        </li>);
}
export var WindowInfo = {
    windowSize: function () {
        let [winWidth, winHeight] = [0, 0];
        if (w.innerWidth) {
            winWidth = w.innerWidth;
        } else if ((d.body) && (d.body.clientWidth)) {
            winWidth = d.body.clientWidth;
        }
        // 通过深入Document内部对body进行检测，获取窗口大小
        if (db && db.clientWidth) {
            winWidth = db.clientWidth;
        }
        if (w.innerHeight) {
            winHeight = w.innerHeight;
        } else if ((d.body) && (d.body.clientHeight)) {
            winHeight = d.body.clientHeight;
        }
        // 通过深入Document内部对body进行检测，获取窗口大小
        if (db && db.clientHeight) {
            winHeight = db.clientHeight;
        }
        return { w: winWidth, h: winHeight };
    },
}
export function ClientInfo() {
    let sUserAgent: any = w.navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (sUserAgent.search(/micromessenger/i) > -1) {
        return 'weixin';
    } else if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return 'mobile';
    } else {
        return 'pc';
    }
}
var shadowBox:any = document.getElementById('tagShadowBox');
shadowBox.style.height = WindowInfo.windowSize().h + 'px';
export let ElementUtile = {
    nativeIsArray: Array,
    isArray: this.nativeIsArray || function (obj: any) {
        return toString.call(obj) === '[object Array]';
    },
    isElement: function (element: any) {
        return !!(this.getTag(element) && this.getTag(element).nodeType === 1);
    },
    getTag: function (tagName: any) {
        if ((/\#/g).test(tagName) && tagName.indexOf('#') == 0) { //判断是否为tagName
            return d.getElementById(tagName.replace(/#/g, ''));
        } else if ((/^(\[)+[a-z0-9]+(\])+$/ig).test(tagName)) { //判断是否为Name
            return d.getElementsByName(tagName.replace(/\[(\/?[a-z0-9]*)\]/ig, '$1'));
        } else if ((/\./g).test(tagName) && tagName.indexOf('.') == 0) { //判断是否为class
            return d.getElementsByClassName(tagName.replace('.', ''));
        } else if ((/^[a-z1-6]+$/ig).test(tagName)) { //判断是否为tagName
            return d.getElementsByTagName(tagName);
        } else {
            return tagName;
        }
    },
    getTagVal: function (id: any) {
        return this.getTag(id) ? (this.getTag(id).value ? this.getTag(id).value.trim() : '') : '';
    },
    setTagVal: function (id: any, val: any) {
        this.getTag(id).innerHTML = val || '';
        this.getTag(id).value = val || '';
    },
    getCss: function (element: any, style: any) {
        if (!element) return false;
        return this.getTag(element).style[style];
    },
    setCss: function (element: any, style: any) {
        if (!element) { return };
        let elementArray = [];
        if (!this.isArray(element)) {
            elementArray.push(element);
        } else {
            elementArray = element;
        }
        for (var i = 0; i < elementArray.length; i++) {
            if (this.isArray(elementArray[i])) {
                for (var k = 0; k < elementArray[i].length; k++) {
                    for (var j in style) {
                        elementArray[i][k].style[j] = style[j];
                    }
                }
            } else {
                for (var j in style) {
                    elementArray[i].style[j] = style[j];
                }
            }
        }
    },
    getAttr: function (element: any, attr: any) {
        if (!element) { return; }
        return this.isElement(element) ? this.getTag(element).getAttribute(attr) : '';
    },
    hasAttr: function (element: any, attr: any) {
        if (!element) { return; }
        return this.isElement(element) ? this.getTag(element).hasAttribute(attr) : '';
    },
    setAttr: function (element: any, attr: any) {
        if (!element) return;
        var array = element;
        if (!this.isArray(element)) {
            array = [];
            array.push(element);
        }
        for (var i = 0; i < array.length; i++) {
            if (this.isArray(array[i])) {
                for (var j = 0; j < array.length; j++) {
                    if (this.isElement(array[i][j])) {
                        for (var k in attr) {
                            array[i][j].setAttribute(k, attr[k]);
                        }
                    }
                }
            } else {
                if (this.isElement(array[i])) {
                    for (var k in attr) {
                        array[i].setAttribute(k, attr[k]);
                    }
                }
            }
        }
    },
    removeAttr: function (element: any, attr: any) {
        if (!element) return;
        var array = element;
        if (!this.isArray(element)) {
            array = [];
            array.push(element);
        }
        for (var i = 0; i < array.length; i++) {
            if (this.isArray(array[i])) {
                for (var j = 0; j < array.length; j++) {
                    if (this.isElement(array[i][j])) {
                        array[i][j].removeAttribute(attr);
                    }
                }
            } else {
                if (this.isElement(array[i])) {
                    array[i].removeAttribute(attr);
                }
            }
        }
    },
    each: function (obj: any, fn: any) {
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
    bind: function (obj: any, eventType: string, fn: any) {
        var me = this;
        if (!me.isElement(arguments[0])) {
            obj = arguments[0];
        }
        me.each(obj, function (dom: any, index: any) {
            if (me.isElement(obj)) {
                if (dom.addEventListener) {   //DOM 2.0
                    dom.addEventListener(eventType, fn, false);
                } else if (dom.attachEvent) {  //IE5+
                    dom.attachEvent('on' + eventType, fn)
                } else {  //DOM 0
                    dom['on' + eventType] = fn;
                }
            } else {
                if (!obj) return;
                for (var i = 0, length = obj.length; i < length; i++) {
                    var dom = obj[i];
                    if (me.isElement(dom)) {
                        if (dom.addEventListener) {   //DOM 2.0
                            dom.addEventListener(eventType, fn, false);
                        } else if (dom.attachEvent) {  //IE5+
                            dom.attachEvent('on' + eventType, fn)
                        } else {  //DOM 0
                            dom['on' + eventType] = fn;
                        }
                    }
                }
            }
        });
        return this;
    },
    // 禁止滚动
    inNoScroll: function () {
        this.setCss(db, {
            height: '100%',
            overflow: 'hidden'
        });
    },
    // 解除禁止滚动
    unNoScroll: function () {
        this.setCss(db, {
            height: '',
            overflow: 'visible'
        });
    },
    // 加载蒙版
    inShadow(){
        this.inNoScroll();
        shadowBox.style.display = 'block';
    },
    // 删除蒙版
    unShandow(callback : any){
        this.unNoScroll();
        shadowBox.style.display = 'none';
        if(callback){callback()};
    },
    // 加载更多
    pageLoading(element:any){
        let load = document.createElement('div');
        load.className = 'R__Loading';
        load.innerHTML = '<div>正在加载...</div><span></span>';
        element.appendChild(load);
    },
    unPageLoading(element:any){
        let load = element.getElementsByClassName('R__Loading');
        if(load && load.length){
            for(let i = 0 ; i < load.length ; i++){
                element.removeChild(load[i]);
            }
        }
    }
};
// 窗口resize()
export function WindowResize(callback: any) {
    w.onresize = function () {
        shadowBox.style.height = WindowInfo.windowSize().h + 'px';
        if (callback) { callback() };
    }
}
export function Shadow(callback: any){
    shadowBox.onclick = function(){
        ElementUtile.unShandow(callback);
    }
}
export function Scroll(callback : any){
    w.onscroll = function(){
        let bodyH = db.scrollHeight,
            clientH = db.clientHeight,
            scrollTop = db.scrollTop;
        if(scrollTop >= bodyH - clientH - 60){
        // if(scrollTop == bodyH - clientH){
            if(callback){callback()}
        }
    }
}
// 去掉字符串前后空格
export let DK_trim = function (str: string) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
// 公共提示窗口
export let tipsBox = function (val: string) {
    let tagIdTipsBox:any,top:any,left:any;
     tagIdTipsBox=document.getElementById('tagIdTipsBox');
    tagIdTipsBox.innerHTML=val;
    tagIdTipsBox.style.display='block';
    top=tagIdTipsBox.scrollHeight;left=tagIdTipsBox.scrollWidth;
    tagIdTipsBox.style.marginTop=-(top/2)+'px';
    tagIdTipsBox.style.marginLeft=-(left/2)+'px';
    console.log(top/2,left/2);
    tagIdTipsBox.style.opacity='1';
    setTimeout(function () {
        tagIdTipsBox.style.opacity='0';
        tagIdTipsBox.style.display='none';
    }, 1000);
};
// var promise = new Promise( (resolve,reject) => {
//     resolve(Ajax({
//         method : '',
//         url : '/Api/lib/user.getInfo',
//         data : {}
//     }));
// });
// promise.then(data => {
//     console.info('promise ____ ')
//     console.info(data)
//     UserInfo = data;
// });
/**
 * 登录体系
 */
require('../extends/sdk');
require('../extends/login');
declare var DaKaH5SDK: any;
export var SDK = {
    clear : function(){
        DaKaH5SDK.Clear();
    },
    login : function(json:any,callback:any){
        if(json){
            json['backUrl'] = location.href;
        }else{
            json = {
               backUrl : location.href
            };
        }
        DaKaH5SDK.login(json,callback);
    }
}