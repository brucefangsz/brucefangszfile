import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as GiftItem from '../../common/GiftItem';
import * as GameItem from '../../common/GameItem';
import * as OTF from '../../common/ObjectTypeFormat';
import * as IA from '../../common/ImageAssets';
import { Link } from 'react-router';
require('../games/Games.css');
let E = Utils.ElementUtile;
export class MineGiftList extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            giftListMein: '',
            giftShowMein: '',
            shadeHeight : Utils.WindowInfo.windowSize().h
        };
    }
    componentDidMount() {
        Utils.WindowResize( () => {
            this.setState({shadeHeight : Utils.WindowInfo.windowSize().h});
        });
        Utils.Shadow( () => {
            E.setCss(E.getTag('#G_Gift_Info'),{display : 'none'});
        });
        getGiftList().then(data => {
            this.setState({ giftListMein: data });
        });
    }
    render() {
        let shadeStyle = {
            height : this.state.shadeHeight + 'px'
        }
        return (<div className="R__Modules G_GI_Modules">
            <div className="R__Header">
                <Link to="/mine">
                    <div className="R__BackBtn"></div>
                </Link>
                我的礼包
                </div>
            {this.state.giftListMein}
            {giftShow('')}
        </div>);
    }
}
async function getGiftList() {
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/Lib/Gift.lists',
        data: { type: 'my', clearCache: '1' }
    });
    let giftHtml: any, giftShow: any;
    if (data.code == '1') {
        if (data.data) {
            giftHtml = getGift(data.data);
        }
        return (
            <div>{giftHtml}</div>
        );
    }else if(data.code=='0'){
        return (
            <div className="R__No_Data"><img src={IA.DEFAULT_PIC.no_gift} alt=""/></div>
        )
    }
}
function getGift(soucre: any) {
    let readyToGift = soucre.map((a: OTF.GameInfo) => {
        let b = a.gameinfo_icon;
        a.giftMine = true;
        return (
            <div className="G_Gift_List">
                <div className="G_GL_Name"><img src={b} alt="" /><span>{a.game_name}</span></div>
                <GiftItem.GiftView GiftInfo={a} />
            </div>
        );
    })
    return (
        <div className="G_Gift_List_Contend M_Gift_List_Contend">{readyToGift}</div>
    )
}
// 查看礼包弹窗
function giftShow(soucre: any) {
    return (
        <div className="G_Gift_Info" id="G_Gift_Info">
            <div className="G_Gift_I_Title">恭喜领号成功</div>
            <span className="G_Gift_Close">×</span>
            <div className="G_Gift_Use">
                <div className="G_Gift_Use_T">
                    使用方法：<span id="giftMsg">进入游戏点击主城-福利-兑换码处输入即可领取</span>
                </div>
                <div id="giftCodeDiv" className="G_Gift_Code">
                    <span className="">礼包码：</span>
                    <span id="giftCode" className="G_Gift_Code_T">uGB9ZSmwFfgw</span>
                    <span className="">长按复制</span>
                </div>
                <div id="giftStartGame" className="G_Gift_Play">开始游戏</div>
            </div>
        </div>
    );
}