import * as Utils from '../common/Utils';
import * as IA from '../common/ImageAssets';
var d = document,
    w = window,
    de = document.documentElement,
    DaKaSDK_Appid_G = '',
    DK_prohibit_flag = 'false',
    DK_close = '';
var DAKATS = {
        msg: {
            isEmptyPhone: '请输入手机号码',
            isEmptyPass: '请输入密码',
            phoneError: '请输入正确的手机号',
            isEmptyCode: '请输入验证码',
            codeError: '请输入正确验证码',
            PasswordError: '请输入6-15位长度的密码'
        },
        regExp: {
            phoneReg: /^0?(1[3,4,5,7,8]\d)\d{8}$/,
            userNameReg: /^[0-9a-zA-Z_]{6,15}$/,
            passwordReg: /^[0-9a-zA-Z,.!?`~#$%^&*()-=_+<>'"\[\]\{\}\\\|]{6,15}$/,
            codeReg: /^\d{4}$/
        },

    },
    timers = {
        inputTimer: null, // 输入法推荐文字
        smsTimer: null, // 短信验证码
        visitorBindTimer: null // 游客模式绑定弹框
    },
    //获取当前跳转地址。
    DK_URl = null;

function renderDom() {
    if (!DakaUtils.isElement('#tagDakaMask')) {
        var dakaMask = d.createElement('dakaDiv');
        d.body.appendChild(dakaMask);
        dakaMask.id = 'tagDakaMask';
        dakaMask.setAttribute('daka-data', '');
        dakaMask.className = 'dakaMask';
    }
    if (!DakaUtils.isElement('#tagDakaBox')) {
        var dakaOuterBox = d.createElement("dakaDiv");
        d.body.appendChild(dakaOuterBox);
        dakaOuterBox.id = 'tagDakaBox';
    }
    var dakaOuterBox = document.getElementById('tagDakaBox');
    var renderHtml = '';
    // renderHtml +='<dakaDiv class="dakaMask"></dakaDiv>'
    renderHtml += '<dakaDiv class="dk_login_box">';
    renderHtml += '<dakaDiv class="dk_all_login">';
    renderHtml += '<dakaDiv class="dk_header"><img src=' + IA.ICON_LOGIN.logo + ' /><span class="text">大咖微游戏</span></dakaDiv>';
    renderHtml += '<dakaDiv class="dk_login_icon"><dakaDiv name="otherLogin" daka-data="weixin"><img src=' + IA.ICON_LOGIN.wx + ' /></dakaDiv><dakaDiv name="otherLogin" daka-data="qq"><img src=' + IA.ICON_LOGIN.qq + ' /></dakaDiv><dakaDiv  name="otherLogin" daka-data="weibo" ><img src=' + IA.ICON_LOGIN.wb + '></dakaDiv></dakaDiv>';
    renderHtml += '<dakaDiv class="dk_login_phone">已绑定手机号？<span class="dk_account_box">快速登录</span></dakaDiv>';
    renderHtml += '</dakaDiv>';
    renderHtml += '<!--登录窗口-->';
    renderHtml += '<dakaDiv class="login_outer" style="display: none" id="login_box">';
    renderHtml += '<dakaDiv>';
    renderHtml += '<input autocomplete="off" type="text" class="user_name" placeholder="输入手机号" id="blTagIdUserName" maxlength="15" style="border: 1px solid rgb(235, 235, 235);">';
    renderHtml += '<dakaDiv class="del_text" style="position:absolute;"></dakaDiv>';
    renderHtml += '</dakaDiv>';
    renderHtml += '<dakaDiv class="user_pw_box" id="dk_password">';
    renderHtml += '<input autocomplete="off" type="password" class="user_pw" placeholder="密码" id="blTagIdUserPwd" maxlength="15" style="border: 1px solid rgb(235, 235, 235);">';
    renderHtml += '<dakaDiv class="del_text" style="position:absolute;"></dakaDiv>';
    renderHtml += '</dakaDiv>';
    renderHtml += '<dakaDiv class="dk_clear" id="dk_dxCode" style="display: none;">';
    renderHtml += '<input autocomplete="off" type="text" class="security_code" placeholder="输入验证码" id="tagLoginCode" maxlength="6" style="border: 1px solid rgb(235, 235, 235);">';
    renderHtml += '<dakaDiv class="dk_send_num" id="dk_login_send" ajaxState="true" daka-data="dk_login_btn">获取验证码</dakaDiv>';
    renderHtml += '</dakaDiv>';
    renderHtml += '<dakaDiv class="change_user"><dakaDiv class="change_btn" id="change_btn" daka-data="pass">短信验证登录</dakaDiv><dakaDiv class="forget_pw" id="forget_pw" daka-data="reset_pass">忘记密码？</dakaDiv></dakaDiv>';
    renderHtml += '<dakaDiv class="login_btn" id="login_btn_even">登录</dakaDiv>';
    renderHtml += '<dakaDiv class="other_login">';
    renderHtml += '<dakaSpan>其他登录方式</dakaSpan>';
    renderHtml += '<a href="javascript:;" id="wx_login" name="otherLogin" daka-data="weixin"><dakaSpan><img src=' + IA.ICON_LOGIN.wx + ' alt=""></dakaSpan></a>';
    renderHtml += '<a href="javascript:;" id="qq_login" name="otherLogin" daka-data="qq"><dakaSpan><img src=' + IA.ICON_LOGIN.qq + ' alt=""></dakaSpan></a>';
    renderHtml += '<a href="javascript:;" id="wb_login" name="otherLogin" daka-data="weibo"><dakaSpan><img src=' + IA.ICON_LOGIN.wb + ' alt=""></dakaSpan></a>';
    renderHtml += '</dakaDiv>';
    renderHtml += '</dakaDiv>';
    renderHtml += '<!--重置密码窗口-->';
    renderHtml += '<dakaDiv class="reset_pw" style="display:none;" id="reset_pw">';
    renderHtml += '<dakaDiv class="rs_p_title">重置密码</dakaDiv>';
    renderHtml += '<dakaDiv class="rs_p_u">';
    renderHtml += '<input autocomplete="off" type="text" id="dk_r_name" class="user_name" placeholder="输入手机号" maxlength="15" style="border: 1px solid rgb(235, 235, 235);">';
    renderHtml += '<dakaDiv class="del_text" style="position:absolute;"></dakaDiv>';
    renderHtml += '</dakaDiv>';
    renderHtml += '<dakaDiv class="dk_clear" >';
    renderHtml += '<input autocomplete="off" type="text" class="security_code" id="reset_pass_code" placeholder="输入验证码" id="" maxlength="6" style="border: 1px solid rgb(235, 235, 235);">';
    renderHtml += '<dakaDiv class="dk_send_num" id="dk_resed_send" ajaxState="true" daka-data="dk_reset_pass">获取验证码</dakaDiv>';
    renderHtml += '</dakaDiv>';
    renderHtml += '<dakaDiv class="user_pw_box">';
    renderHtml += '<input autocomplete="off" type="password" class="user_pw" placeholder="设置新密码" id="dk_r_n_pass" maxlength="15" style="border: 1px solid rgb(235, 235, 235);">';
    renderHtml += '<dakaDiv class="del_text" style="position:absolute;"></dakaDiv>';
    renderHtml += '</dakaDiv>';
    renderHtml += '<dakaDiv class="dk_sub">';
    renderHtml += '<dakaSpan class="cancel_btn" id="cancel_btn">取消</dakaSpan>';
    renderHtml += '<dakaSpan class="sub_btn" id="sub_btn">提交</dakaSpan>';
    renderHtml += '</dakaDiv>';
    renderHtml += '</dakaDiv>';
    renderHtml += '</dakaDiv>';
    renderHtml += '<!-- 提示框 -->';
    renderHtml += '<egretDiv class="dk_regeditSucceed childNode" id="tagTBParent"><egretDiv class="tipsBox" id="tagTipsBox"></egretDiv></egretDiv>';
    dakaOuterBox.innerHTML = renderHtml;
    DakaUtils.orientationChange();
}
renderDom();
// 获取标签
// 模块获取
// 登录
var login_box = DakaUtils.getTag('#login_box'),
    // 重置密码
    reset_pw = DakaUtils.getTag('#reset_pw'),

    // 登录蒙板
    tagDakaMask = DakaUtils.getTag('#tagDakaMask');
// 切换登录获取标签
var change_btn = DakaUtils.getTag('#change_btn'),
    forget_pw = DakaUtils.getTag('#forget_pw'),
    login_btn_even = DakaUtils.getTag('#login_btn_even'),
    dk_all_login = DakaUtils.getTag('.dk_all_login')[0],
    // 其他登录
    dk_account_box = DakaUtils.getTag('.dk_account_box')[0],
    // otherLogin = DakaUtils.getTag('[otherLogin]'),
    otherLogin = Array.prototype.slice.call(DakaUtils.getTag('[otherLogin]'), 0),
    dk_password = DakaUtils.getTag('#dk_password'),
    dk_dxCode = DakaUtils.getTag('#dk_dxCode'),
    dk_login_send = DakaUtils.getTag('#dk_login_send'),
    // 忘记密码
    cancel_btn = DakaUtils.getTag('#cancel_btn'),
    sub_btn = DakaUtils.getTag('#sub_btn'),
    dk_resed_send = DakaUtils.getTag('#dk_resed_send'),
    reset_pass_code = DakaUtils.getTag('#reset_pass_code'),
    // 获取删除按钮
    del_text = DakaUtils.getTag('.del_text'),
    // 获取文本框
    blTagIdUserName = DakaUtils.getTag('#blTagIdUserName'),
    blTagIdUserPwd = DakaUtils.getTag('#blTagIdUserPwd'),
    inputArray = Array.prototype.slice.call(document.querySelectorAll('input'), 0),
    // 修改密码输入框
    dk_r_name = DakaUtils.getTag('#dk_r_name'),
    dk_r_n_pass = DakaUtils.getTag('#dk_r_n_pass');
// 点击蒙板隐藏登录
var dakaLoginH5SDK = {
    hideLogin: function (e) {
        e.preventDefault();
        if (DK_close) {
            DaKaH5SDK.Clear();
            DakaUtils.DK_relieve();
        }
    },
    // 切换登录方式
    changeLogin: function () {
        if (this.getAttribute('daka-data') == 'pass') {
            this.setAttribute('daka-data', 'code');
            this.innerHTML = '返回密码登录';
            dk_password.style.display = 'none';
            dk_dxCode.style.display = 'block';
        } else {
            this.setAttribute('daka-data', 'pass');
            this.innerHTML = '短信验证登录';
            dk_password.style.display = 'block';
            dk_dxCode.style.display = 'none';
        }
    },
    // 忘记密码切换
    forgetPass: function () {
        dk_r_name.value = blTagIdUserName.value;
        login_box.style.display = 'none';
        reset_pw.style.display = 'block';
    },
    // 取消修改密码
    cancelPass: function () {
        login_box.style.display = 'block';
        reset_pw.style.display = 'none';
    },
    // input获取光标
    pbBlur: function () {
        DakaUtils.setCss(this, {
            border: '1px solid #ebebeb'
        });
    },
    // input失去光标
    pbFocus: function () {
        DakaUtils.setCss(this, {
            border: '1px solid #ddd'
        });
    },
    // input获取光标显示删除按钮
    inputFocus: function (e) {
        clearInterval(timers.inputTimer);
        var me = this;
        timers.inputTimer = setInterval(function () {
            if (DakaUtils.getTagVal(me)) {
                DakaUtils.setCss(me.parentNode.querySelector('.del_text'), {
                    display: 'block'
                });
            } else {
                DakaUtils.setCss(me.parentNode.querySelector('.del_text'), {
                    display: 'none'
                });
            }
        }, 300);
    },
    inputBlur: function (e) {
        e.preventDefault();
        dakaLoginH5SDK.clearInputTimer();
        var val = DakaUtils.getTagVal(this);
        if (!val) return;
    },
    // 清除删除input文本的定时器
    clearInputTimer: function () {
        clearInterval(timers.inputTimer);
    },
    // inputkeyup
    inputKeyup: function (e) {
        if (DakaUtils.getTagVal(this).length) {
            DakaUtils.setCss(this.parentNode.querySelector('.del_text'), {
                display: 'block'
            });
        } else {
            DakaUtils.setCss(this.parentNode.querySelector('.del_text'), {
                display: 'none'
            });
        }
    },
    // 第一登录入口
    show_account: function () {
        dk_all_login.style.display = 'none';
        login_box.style.display = 'block';
        DakaUtils.orientationChange();
    },

    // 登录获取验证码
    login_send: function () {
        var me = this,
            num = 60,
            type = '1',
            send_status = DakaUtils.getAttr(me, 'daka-data'),
            url = send_status == 'dk_login_btn' ? '/Api/User.captcha?mobile=' : '/Api/User.captcha?mobile=',
            uName = send_status == 'dk_login_btn' ? DakaUtils.DK_trim(blTagIdUserName.value) : DakaUtils.DK_trim(dk_r_name.value);
        if (DakaUtils.getAttr(me, 'ajaxState') == 'true') {
            if (uName == '') {
                DakaUtils.showTipsBox(DAKATS.msg.isEmptyPhone);
                return false;
            }
            if (DAKATS.regExp.phoneReg.test(uName) == false) {
                DakaUtils.showTipsBox(DAKATS.msg.phoneError);
                return false;
            }
            // uName = DakaUtils.getTagVal('#blTagIdUserName') || '';
            if (!DAKATS.regExp.phoneReg.test(uName)) {
                DakaUtils.showTipsBox(DAKATS.msg.isEmptyPhone);
                return false;
            } else {
                DakaUtils.ajax({
                    url: Utils.GC_AJAX_URL + url + uName,
                    success: function (data) {
                        if (data.code == '1') {
                            DakaUtils.setAttr(me, {
                                ajaxState: 'false'
                            });
                            DakaUtils.showTipsBox('验证码已发送至：' + (uName.replace(uName.substring(3, 7), '****')) + '\r,请注意查收');
                            timers.smsTimer = setInterval(function () {
                                if (num > 1) {
                                    DakaUtils.setTagVal(me, '重发（' + (--num) + 's）');
                                } else {
                                    clearInterval(timers.smsTimer);
                                    DakaUtils.setTagVal(me, '获取验证码');
                                    DakaUtils.setAttr(me, {
                                        ajaxState: 'true'
                                    });
                                }
                            }, 1000);
                        }
                    }
                })
            }
        }
    },
    // 登录
    loginEven: function () {
        var uName = DakaUtils.DK_trim(blTagIdUserName.value),
            uPass = DakaUtils.DK_trim(blTagIdUserPwd.value);
        // 用户名为空判断
        if (uName == '') {
            DakaUtils.showTipsBox(DAKATS.msg.isEmptyPhone);
            return false;
        }
        if (DAKATS.regExp.phoneReg.test(uName) == false) {
            DakaUtils.showTipsBox(DAKATS.msg.phoneError);
            return false;
        }

        // 密码为空判断
        if (change_btn.getAttribute('daka-data') == 'pass') {
            if (uPass == '') {
                DakaUtils.showTipsBox(DAKATS.msg.isEmptyPass);
                return false;
            }
            if (DAKATS.regExp.passwordReg.test(uPass) == false) {
                DakaUtils.showTipsBox(DAKATS.msg.PasswordError);
                return false;
            }
        }else{
            var a=DakaUtils.getTag('#tagLoginCode');
            var uCode = DakaUtils.getTagVal(a);
            if (uCode == '') {
                DakaUtils.showTipsBox(DAKATS.msg.isEmptyCode);
                return false;
            }
            if (DAKATS.regExp.codeReg.test(uCode) == false) {
                DakaUtils.showTipsBox(DAKATS.msg.codeError);
                return false;
            }
        }
        DakaUtils.ajax({
            url: Utils.GC_AJAX_URL + '/Api/User.login?mobile=' + uName + '&password=' + uPass + '&backUrl=' + DK_URl,
            type: "POST",
            success: function (data) {
                if (data.code == '1') {
                    DakaUtils.cookie.set('DK_Player',JSON.stringify(data.data));
                    // DAKATS.DK_URl ? window.location.href = DAKATS.DK_URl : window.location.reload();
                    window.location.reload();
                } else {
                    DakaUtils.showTipsBox(data.msg);
                }
            }
        });
    },
    // 找回密码 Api/User.resetPwd?mobile=18511076187&captcha=1234&password=123456
    reset_pass: function () {
        var uName = DakaUtils.DK_trim(dk_r_name.value),
            uCode = parseInt(DakaUtils.DK_trim(reset_pass_code.value)),
            uPass = DakaUtils.DK_trim(dk_r_n_pass.value);
        if (uName == '') {
            DakaUtils.showTipsBox(DAKATS.msg.isEmptyPhone);
            return false;
        }
        if (DAKATS.regExp.phoneReg.test(uName) == false) {
            DakaUtils.showTipsBox(DAKATS.msg.phoneError);
            return false;
        }
        if (uCode == '') {
            DakaUtils.showTipsBox(DAKATS.msg.isEmptyCode);
            return false;
        }
        if (DAKATS.regExp.codeReg.test(uCode) == false) {
            DakaUtils.showTipsBox(DAKATS.msg.codeError);
            return false;
        }
        if (uPass == '') {
            DakaUtils.showTipsBox(DAKATS.msg.isEmptyPass);
            return false;
        }
        if (DAKATS.regExp.passwordReg.test(uPass) == false) {
            DakaUtils.showTipsBox(DAKATS.msg.PasswordError);
            return false;
        }
        var uName = dk_r_name.value,
            uCode = reset_pass_code.value,
            uPass = dk_r_n_pass.value,
            me = dk_resed_send;
        DakaUtils.ajax({
            url: Utils.GC_AJAX_URL + '/Api/User.resetPwd',
            type: 'POST',
            data: {
                mobile: uName,
                captcha: uCode,
                password: uPass
            },
            success: function (data) {
                if (data.code == '1') {
                    DakaUtils.showTipsBox('修改密码成功');
                    reset_pw.style.display = 'none';
                    login_box.style.display = 'block';
                    blTagIdUserName.value = '';
                    dk_r_name.value = '';
                    reset_pass_code.value = '';
                    dk_r_n_pass.value = '';
                    // 清空定时器
                    clearInterval(timers.smsTimer);
                    DakaUtils.setTagVal(me, '获取验证码');
                    DakaUtils.setAttr(me, {
                        ajaxState: 'true'
                    });
                } else {
                    DakaUtils.showTipsBox(data.msg);
                }
            }
        })

    }
}
// 页面事件
var domEventArray = [
    // 窗体改变大小
    {
        tag: window,
        eventType: 'resize',
        callback: function () {
            DakaUtils.orientationChange();
        }
    },
    // 点击蒙板隐藏
    {
        tag: tagDakaMask,
        eventType: 'click',
        callback: dakaLoginH5SDK.hideLogin
    },
    {
        tag: login_btn_even,
        eventType: 'click',
        callback: dakaLoginH5SDK.loginEven
    },
    // 短信／密码登录切换
    {
        tag: change_btn,
        eventType: 'click',
        callback: dakaLoginH5SDK.changeLogin
    },
    // 忘记密码
    {
        tag: forget_pw,
        eventType: 'click',
        callback: dakaLoginH5SDK.forgetPass
    },
    // 取消修改密码
    {
        tag: cancel_btn,
        eventType: 'click',
        callback: dakaLoginH5SDK.cancelPass
    },
    {
        tag: inputArray,
        eventType: 'focus',
        callback: dakaLoginH5SDK.pbFocus
    },
    {
        tag: inputArray,
        eventType: 'blur',
        callback: dakaLoginH5SDK.pbBlur
    },
    {
        tag: [blTagIdUserName, blTagIdUserPwd, dk_r_name, dk_r_n_pass],
        eventType: 'focus',
        callback: dakaLoginH5SDK.inputFocus
    },
    {
        tag: [blTagIdUserName, blTagIdUserPwd, dk_r_name, dk_r_n_pass],
        eventType: 'blur',
        callback: dakaLoginH5SDK.inputBlur
    },
    {
        tag: [blTagIdUserName, blTagIdUserPwd, dk_r_name, dk_r_n_pass],
        eventType: 'keyup',
        callback: dakaLoginH5SDK.inputKeyup
    },
    // 登录获取验证码
    {
        tag: [dk_login_send, dk_resed_send],
        eventType: 'click',
        callback: dakaLoginH5SDK.login_send
    },
    {
        tag: dk_account_box,
        eventType: 'click',
        callback: dakaLoginH5SDK.show_account
    },
    // 重置密码
    {
        tag: sub_btn,
        eventType: 'click',
        callback: dakaLoginH5SDK.reset_pass
    }
];
DakaUtils.each(domEventArray, function (obj) {
    DakaUtils.bind(obj['tag'], obj['eventType'], obj['callback']);
});

// 清空文本框内容
DakaUtils.bind(del_text, 'click', function () {
    if (DakaUtils.siblingElem(this)) {
        DakaUtils.siblingElem(this)[0].value = '';
        this.style.display = 'none';
    }
});
// 其他登录
DakaUtils.bind(otherLogin, 'click', function () {
    var daka = DakaUtils.getAttr(this, 'daka-data');
    window.location.href = Utils.GC_AJAX_URL + '/Api/User/' + daka + '.login?backurl=' + encodeURIComponent(DAKATS.DK_URl);
})
DaKaH5SDK.login = function (json, callback) {
    if (json) {
        DK_close = json.close;
        DAKATS.DK_URl = json.backUrl;
    }
    if (tagDakaMask) {
        tagDakaMask.style.display = 'block';
        DakaUtils.DK_prohibit();
    }
    if (tagDakaBox) {
        tagDakaBox.style.display = 'block';
    }
    DakaUtils.orientationChange();
}
DaKaH5SDK.Clear = function () {
    setTimeout(function () {
        if (tagDakaMask) {
            tagDakaMask.style.display = 'none';
        }
        if (tagDakaBox) {
            tagDakaBox.style.display = 'none';
        }
        DakaUtils.setTagVal([
            DakaUtils.getTag('#blTagIdUserName'),
            DakaUtils.getTag('#blTagIdUserPwd'),
            DakaUtils.getTag('#tagLoginCode'),
            DakaUtils.getTag('#reset_pass_code'),
            DakaUtils.getTag('#dk_r_n_pass')
        ]);
        DakaUtils.setCss([login_box, reset_pw, dk_dxCode], {
            display: 'none'
        });
        DakaUtils.setCss([dk_all_login, dk_password], {
            display: 'block'
        });
    }, 20);
}