declare var require: any;
import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as Public from '../../common/Public';
import * as IA from '../../common/ImageAssets';
import { Link } from 'react-router';
require('./Mine.css');
const request = require('superagent');
const ajaxUrl = Utils.GC_AJAX_URL;
// 正则
const PHONEREG = Utils.DAKAREG;

// DOM方法
const DOM=Utils.ElementUtile;
const Reg=Utils.DAKAREG;
// 问题内容
let proText1:any;let proPhone:any;let proFlag=false;
export class Problem extends React.Component<any, any> {

    constructor() {
        super();
        this.state = {

        };
        this.cheackClick = this.cheackClick.bind(this)
        this.bodyChange = this.bodyChange.bind(this)
    }

    componentDidMount() {

    }
    // 输入问题
    bodyChange(e:any){
        if(DOM.getAttr(e.target,'data-value')=="proText"){
            proText1=(e.target.value);
            if(Utils.DK_trim(proText1).length>=1){
                proFlag=true;  
            }else{
                proFlag=false;    
            }
        }else{
            proPhone=(e.target.value);
        }
    }
    // 选择类型
    cheackClick(e: any) {
        if (DOM.getAttr(e.target,'data-checked') == 'true') {
            DOM.setAttr(e.target,{'data-checked':'false'});
        } else {
            DOM.setAttr(e.target,{'data-checked':'true'});
        }
    }
    subClick() {
        let checked = 'flase',proType:any,proText=document.getElementById('q_body');
        var problemsType = document.getElementsByName('problemType');
        for (var i = 0; i < problemsType.length; i++) {
            if (DOM.getAttr(problemsType[i],'data-checked') == 'true') {
                proType=DOM.getAttr(problemsType[i],'data-type');
                checked = 'true';
            }else{
            }

        }
        if (checked=='flase') {
            Utils.tipsBox('请选择问题类型');
            return false;
        }
        if(!proFlag){
            Utils.tipsBox('请输入问题内容');
            return false;
        }
        var phone=Reg.numReg.test(proPhone);
        if(!phone){
            Utils.tipsBox('请输入正确的手机号或QQ号');
            return false;
        }
         async function sub(){
            let data1=await Utils.Ajax({
                method : 'POST',
                url : '/Api/Lib/User.question',
                data : {
                'type':proType,'contact':proPhone,'body':proText1
                }
            })
            if(data1.code=='-1'){
                Utils.tipsBox('提交成功');
                window.location.href='/#/mine';
            }
         }
         sub();
    }
    render() {
        var bMaxL=50;
        return (
            <div className="R__Modules M_Main_Problem">
                <div className="R__Header">
                    <Link to="/mine">
                        <div className="R__BackBtn"></div>
                    </Link>
                    问题反馈
                </div>
                <div className="M_Main_Problem_QQ">客服QQ群：263749512 <Link to="https://jq.qq.com/?_wv=1027&k=44l8iz2"><img src={IA.MINE_IMG.QQ_talk} alt="" /></Link></div>
                <div className="M_Main_Prob_Type">
                    <div className="M_Main_Prob_Title">选择问题类型：</div>
                    <label><input type="radio" data-checked=""  onClick={this.cheackClick} name="problemType" data-type="1" />登录问题</label>
                    <label><input type="radio" data-checked="" onClick={this.cheackClick} name="problemType" data-type="2" />充值问题</label>
                    <label><input type="radio" data-checked="" onClick={this.cheackClick} name="problemType" data-type="3" />游戏无法进入</label>
                    <label><input type="radio" data-checked="" onClick={this.cheackClick} name="problemType" data-type="0" />其他</label>
                    <textarea className="" id="q_body" data-value="proText" onChange={this.bodyChange} name="body" placeholder="请描述遇到的问题 50字以内" maxLength={bMaxL}></textarea>
                    <input type="text" name="contact" placeholder="输入联系方式，了解问题进度（必填，手机或QQ）" className="form-control contacts" onChange={this.bodyChange} data-value="proPhone" />
                    <div className="M_Main_Prob_Sub" onClick={this.subClick}>提交</div>
                    <img src="https://image.egret.com/upload/month_1609/201609021050065868.jpg" alt="" />
                </div>
            </div>
        );
    }
}

