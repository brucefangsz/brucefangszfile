import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as GameItem from '../../common/GameItem';
import * as OTF from '../../common/ObjectTypeFormat';
import * as IA from '../../common/ImageAssets';
import {Link} from 'react-router';
let C = Utils.Control,E = Utils.ElementUtile;
export class NewOpen extends React.Component<any, any>{
    constructor() {
        super();
        this.state = {
            shadeHeight : Utils.WindowInfo.windowSize().h,
            openSerive: ''
        };
    }
    componentDidMount() {
        Utils.WindowResize( () => {
            this.setState({shadeHeight : Utils.WindowInfo.windowSize().h});
        });
        Utils.Shadow( () => {
            E.setCss([E.getTag('#tagNG'),E.getTag('#tagNO_Btn')],{display : 'none'});
        });
        openSerive().then(data => {
            this.setState({ openService: data });
        });
    }
    render() {
        let openSerive = this.state.openService;
        let shadeStyle = {
            height : this.state.shadeHeight + 'px'
        }
        return (<div className="G_NG_Container">
            {openSerive}
            <BespokeOperate/>
        </div>);
    }
}
// 开服信息列表
async function openSerive() {
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/Lib/NewOpenService.lists',
        data: {}
    });
    let readyToServiceHtml: any;
    let openServiceHtml: any;
    if (data.code == 1) {
        if (data.data) {
            let readyToServe = data.data.readyToServe;
            let openService = data.data.openService;
            let despokeInfo = data.data.despokeInfo;
            if (readyToServe) {
                readyToServiceHtml = serviceModel(readyToServe, 1);
            } else {
                readyToServiceHtml = "";
            }
            if (openService) {
                openServiceHtml = serviceModel(openService, 2);
            } else {
                openServiceHtml = "";
            }
            E.setTagVal(E.getTag('#tagNO_Phone'),data.data.userMobile || '');
        }
        return (
            <div className="new_wrapper">
                <div className="R__GV_Modules">
                    {readyToServiceHtml}
                    {openServiceHtml}
                </div>
            </div>
        );

    }else{
        return (
            <div className="R__No_Data"><img src={IA.DEFAULT_PIC.no_service} alt=""/></div>
        )
    }
}
// 即将开服信息
function serviceModel(soucre: any, type: number) {
    let readyToService = soucre.map((gi : OTF.GameInfo,index : any) => {
        gi.elementIndex = index;
        gi.game_show_about = <div>
            <span className="B-fontL">{gi.service_name}</span>
            &nbsp;&nbsp;&nbsp;
            <span className="B-fontGr">{gi.open_time_date}</span></div>;
        if(type == 1){
            gi.game_show_btn = '2';
            gi.game_callback = function(event:any){
                if(event.target.classList.contains('R__GV_PlayGame_Checked')){
                    return;
                }else{
                    if(C.loginState()){
                        E.inShadow();                       
                        E.removeAttr(E.getTag('#tagNO_SendCode'),'iscode');
                        E.setAttr(E.getTag('#tagNG'),{
                            'data-gos_id' : event.target.getAttribute('data-gos_id'),
                            'data-domIndex' : event.target.getAttribute('data-index')});
                        E.setCss(E.getTag('#tagNO_Code'),{display : 'none'});
                        E.setCss([E.getTag('#tagNG'),E.getTag('#tagNO_Btn')],{display : 'block'});
                    }else{
                        Utils.tipsBox('请先登录');
                    }
                }
            }
        }
        return <GameItem.ListItemView gameInfo={gi}/>
    });
    let tmp = <div id={type == 1 ? 'tagReadyOpen' : ""}>
            <div className="G_Dividing_Line">
                <div></div><span>{type == 1 ? "即将开服" : "已开服"}</span>
            </div>
            <div className="R__GV_Container">
                {readyToService}
            </div>
        </div>;
    return (
        <div>{readyToService.length ? tmp : ''}</div>
    );
}
// 预约操作
class BespokeOperate extends React.Component<any,any>{
    bespoke(){
        if(!C.loginState()){
            Utils.SDK.login('','');
            return Utils.tipsBox('请先登录');
        }
        let gosId = E.getAttr(E.getTag('#tagNG'),'data-gos_id'),
            phone = E.getTagVal('#tagNO_Phone'),
            code = E.getTagVal('#tagNO_CodeVal');
        if(!phone){
            return Utils.tipsBox('请输入手机号!');
        }else if(!Utils.DAKAREG.telReg.test(phone)){
            return Utils.tipsBox('请输入正确的手机号!');
        }
        if(E.hasAttr(E.getTag('#tagNO_SendCode'),'isCode')){
            if(!code){
                return Utils.tipsBox('请输入验证码!');
            }else if(!Utils.DAKAREG.codeReg.test(code)){
                return Utils.tipsBox('请输入6位数字验证码!');
            }
        }
        console.info('预约');
        let obj = {
            gosId : gosId,
            mobile : phone,
            type : '1',
            code : ''
        };
        // type=2有验证码1无验证码
        if(E.hasAttr(E.getTag('#tagNO_SendCode'),'iscode')){
            obj.type = '2';
            obj.code = code;
        }else{
            obj.type = '1';
        }
        (async () => {
            // gosId : ,type : ,mobile : ,code
            let data = await Utils.Ajax({
                method : '',
                url : '/Api/Lib/NewOpenService.bespoke',
                data : obj
            });
            console.info(data)
            if(data.code == '1'){
                Utils.tipsBox(data.msg);
                closeBespoke();
                let domIndex = E.getAttr(E.getTag('#tagNG'),'data-domindex');
                let img = document.createElement('img');
                img.className = 'G_NG_YY';
                img.src = IA.ICON_NEW_GAME.yy;
                let element = E.getTag('#tagReadyOpen').getElementsByClassName('R__GV_Info')[domIndex];
                element.insertBefore(img,element.childNodes[0]);
                element.getElementsByClassName('R__GV_PlayGame')[0].classList.add('R__GV_PlayGame_Checked');
            }else{
                Utils.tipsBox(data.msg);
            }
        })();
    }
    changePhone(){
        E.setAttr(E.getTag('#tagNO_SendCode'),{isCode : true});
        E.setCss(E.getTag('#tagNO_Btn'),{display : 'none'});
        E.setCss(E.getTag('#tagNO_Code'),{display : 'block'});
    }
    sendCode(){
        if(E.hasAttr(E.getTag('#tagNO_SendCode'),'sendState')){
           return; 
        }
        E.setAttr(E.getTag('#tagNO_SendCode'),{'sendState' : true});
        let phone = E.getTagVal('#tagNO_Phone');
        if(!phone){
            return Utils.tipsBox('请输入手机号!');
        }if(!Utils.DAKAREG.telReg.test(phone)){
            return Utils.tipsBox('请输入正确的手机号!');
        }
        let gos_id = E.getAttr(E.getTag('#tagNG'),'data-gos_id');
        if(!gos_id){
            return Utils.tipsBox('该服不存在!');
        }
        (async () => {
            let data = await Utils.Ajax({
                method : '',
                url : '/Api/Lib/NewOpenService.sendSms',
                data : {gosId : gos_id,mobile : phone}
            });
            let num = 60;
            if(data.code == '1'){
                Utils.tipsBox(data.msg);
                E.getTag('#tagNO_SendCode').className = 'G_NG_YYOperate_SendCodeed';
                keyer();
                let timer = setInterval(function(){
                    if(num <= 0){
                        clearInterval(timer);
                        E.removeAttr(E.getTag('#tagNO_SendCode'),'sendState');
                        E.getTag('#tagNO_SendCode').className = 'G_NG_YYOperate_SendCode';
                        E.getTag('#tagNO_SendCode').innerHTML = '发送验证码'
                    }else{
                        keyer();
                    }
                },1000);
            }else{
                Utils.tipsBox(data.msg);
            }
            function keyer(){
                E.getTag('#tagNO_SendCode').innerHTML = '重新发送('+(--num)+'s)';
            }
        }
        )();
    }
    render(){
        let phoneLength:number = 11,
        codeLength:number = 6;
        return <div className="G_NG_YYOperate" id="tagNG">
            <div className="G_NG_YYOperate_Title">请确认手机号，领取开服礼包</div>
            <div className="G_NG_YYOperate_Phone">
                <span>+86</span>
                <input id="tagNO_Phone" type="text" maxLength={phoneLength} />
            </div>
            <div className="G_NG_YYOperate_Btn" id="tagNO_Btn">
                <div onClick={this.changePhone}>更换号码</div>
                <div onClick={this.bespoke}>立即预约</div>
            </div>
            <div className="G_NG_YYOperate_Code" id="tagNO_Code">
                <div className="G_NG_YYOperate_InputCode">
                    <input type="text" placeholder="请输入验证码" maxLength={codeLength} id="tagNO_CodeVal"/>
                </div>
                <div className="G_NG_YYOperate_SendCode" onClick={this.sendCode} id="tagNO_SendCode">发送验证码</div>
                <div className="G_NG_YYOperate_Code_Btn" onClick={this.bespoke}>立即预约</div>
            </div>
        </div>;    
    }
}
function closeBespoke(){
    E.unNoScroll();
    E.setCss([E.getTag('#tagNO_Shade'),E.getTag('#tagNG'),E.getTag('#tagNO_Btn')],{display : 'none'});
}