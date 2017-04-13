import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as GiftItem from '../../common/GiftItem';
import * as GameItem from '../../common/GameItem';
import * as IA from '../../common/ImageAssets';
import * as OTF from '../../common/ObjectTypeFormat';
import { Link } from 'react-router';
const DOM = Utils.ElementUtile;
const Reg = Utils.DAKAREG;
let user = Utils.Control.user.get().mobile;
export class MineSafly extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {

        };
        this.subClick = this.subClick.bind(this);
    }
    componentDidMount() {
        let M_Code_Mod: any, M_Show_Phone: any, M_SubChange: any;
        M_Code_Mod = document.getElementById('M_Code_Mod'),
            M_Show_Phone = document.getElementById('M_Show_Phone'),
            M_SubChange = document.getElementById('M_SubChange');
        if (user) {
            M_Show_Phone.style.display = "block"; M_Code_Mod.style.display = "none";
            DOM.setAttr(M_SubChange, { 'data-subChange': 'change' });
            M_SubChange.innerHTML = "更改帐号"
        } else {
            M_Show_Phone.style.display = "none"; M_Code_Mod.style.display = "block";
            DOM.setAttr(M_SubChange, { 'data-subChange': 'sub' });
            M_SubChange.innerHTML = "提交"
        }
    }

    async getCodeClick(e: any) {
        let M_Status: any;
        let M_Phone: any = document.getElementById('M_Phone');
        let M_Phone_val = DOM.getTagVal(M_Phone);
        let M_Code_Num:any = document.getElementById('M_Code_Num');
        M_Status = e.target.getAttribute('data-status');
        if (M_Status == 'false') {
            return;
        }
        if (!M_Phone_val) {
            Utils.tipsBox('请输入手机号');
            return false;
        } else {
            if (!Reg.telReg.test(M_Phone_val)) {
                Utils.tipsBox('请输入正确手机号');
                return false;
            }
        }
        let data = await Utils.Ajax({
            method: 'GET',
            url: '/Api/User.captcha',
            data: { 'mobile': M_Phone_val }
        })
        if (data.code == '1') {
            let num = 60, timer: any;
            M_Code_Num.setAttribute('data-status', 'false');
            timer = setInterval(() => {
                num--;
                M_Code_Num.innerHTML = '重获验证码(' + num + ')s';
                if (num <= 0) {
                    clearInterval(timer);
                    M_Code_Num.setAttribute('data-status', 'true');
                    M_Code_Num.innerHTML='获取验证码';
                }
            }, 1000)
            Utils.tipsBox('获取成功');
        } else {
            Utils.tipsBox(data.msg);
        }
    }
    async subClick(e: any) {
        let M_Code_Mod: any, M_Show_Phone: any, M_SubChange: any;
        M_Code_Mod = document.getElementById('M_Code_Mod'),
            M_Show_Phone = document.getElementById('M_Show_Phone'),
            M_SubChange = document.getElementById('M_SubChange');

        if ((DOM.getAttr(e.target, 'data-subChange')) == 'sub') {
            let M_Phone = document.getElementById('M_Phone'),
                M_Code = document.getElementById('M_Code'),
                M_Pass = document.getElementById('M_Pass');
            let M_Phone_val = DOM.getTagVal(M_Phone),
                M_Code_val = DOM.getTagVal(M_Code),
                M_Pass_val = DOM.getTagVal(M_Pass);
            if (!M_Phone_val) {
                Utils.tipsBox('请输入手机号');
                return false;
            } else {
                if (!Reg.telReg.test(M_Phone_val)) {
                    Utils.tipsBox('请输入正确手机号');
                    return false;
                }
            }
            if (!M_Code_val) {
                Utils.tipsBox('请输入验证码');
                return false;
            } else {
                if (!Reg.codeReg4.test(M_Code_val)) {
                    Utils.tipsBox('请输入正确的验证码');
                    return false;
                }
            }
            if (!M_Pass_val) {
                Utils.tipsBox('请输入密码');
                return false;
            } else {
                if (!Reg.passReg.test(M_Pass_val)) {
                    Utils.tipsBox('请输入正确的密码');
                    return false;
                }
            }
            let data = await Utils.Ajax({
                method: 'POST',
                url: '/Api/Lib/User.verify',
                data: {
                    'mobile': M_Phone_val,
                    'verifycode': M_Code_val,
                    'password': M_Pass_val,
                    'clearCache': '1',
                }
            })
            if (data.code == '1') {
                M_Show_Phone.style.display = 'block'; M_Code_Mod.style.display = 'none';
                DOM.setAttr(M_SubChange, { 'data-subChange': 'change' });
                M_Show_Phone.innerHTML = '手机号：' + data.data.mobile;
                M_SubChange.innerHTML='更改';
                DOM.setTagVal(M_Phone,''),
                DOM.setTagVal(M_Code,''),
                DOM.setTagVal(M_Pass,''),
                Utils.tipsBox('绑定成功');
            } else {
                Utils.tipsBox(data.msg);
            }
        } else {
            M_Show_Phone.style.display = 'none'; M_Code_Mod.style.display = 'block'; DOM.setAttr(M_SubChange, { 'data-subChange': 'sub' });M_SubChange.innerHTML='提交';
        }

    }
    render() {
        return (
            <div>
                <div className="M_Main_Safly">
                    <div className="M_Main_Safly_Box">
                        <img src={IA.MINE_IMG.phone_safly} alt="" />
                        <div className="M_Main_Safly_Title" >
                            <Link to="/mine"><img src={IA.MINE_IMG.mine_back} alt="" /></Link>
                            手机认证</div>
                        <span>绑定手机号，有助于找回账号密码</span>
                    </div>
                    <div className="M_Main_Safly_Code">
                        <div className="M_Main_Safly_Phone" id="M_Show_Phone">手机号：{user}</div>
                        <div id="M_Code_Mod">
                            <div><input type="text" placeholder="请输入您的手机号" id="M_Phone" />
                                <div className="M_Main_Safly_GetCode" onClick={this.getCodeClick.bind(this)} data-status="true" id="M_Code_Num">
                                    获取验证码
                                </div>
                            </div>
                            <div><input type="text" placeholder="请输入验证码" id="M_Code" /></div>
                            <div><input type="password" placeholder="请输入6到15位登录密码" id="M_Pass" /></div>
                        </div>
                    </div>
                </div>
                <div className="M_Main_Safly_Sub"><div onClick={this.subClick} data-subChange="sub" id="M_SubChange">提交</div></div>
            </div>
        )
    }
}