import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as GiftItem from '../../common/GiftItem';
import * as GameItem from '../../common/GameItem';
import * as OTF from '../../common/ObjectTypeFormat';
import * as IA from '../../common/ImageAssets';
import { Link } from 'react-router';
let C = Utils.Control;
export class GiftListMein extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            giftListMein: '',
            giftShowMein: ''
        };
    }
    componentDidMount() {
        getGiftList().then(data => {
            this.setState({ giftListMein: data });
        })
    }
    render() {
        return (<div>
            {/*{getGiftList}*/}
            {this.state.giftListMein}
        </div>);
    }
}
async function getGiftList() {
    if (C.loginState()) {
        // 
        Utils.SDK.clear();
        let data = await Utils.Ajax({
            method: '',
            url: '/Api/Lib/Gift.lists',
            data: { type: 'my', clearCache: '1' }
        });

        let giftHtml: any, giftShow1: any;
        if (data.code == '1') {
            if (data.data) {
                giftHtml = getGift(Utils.obj2Arr(data.data));
                giftShow1 = giftShow(data.data);
            }
            return (
                <div className="G_Gift_List_Contend">{giftHtml}{giftShow1}</div>
            );
        }else if(data.code=='0'){
            return (<div className="R__No_Data"><img src={IA.DEFAULT_PIC.no_gift} alt=""/></div>)
        }
    } else {
        Utils.SDK.login({ close: true }, '');
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
        <div>{readyToGift}</div>
    )
}
// 查看礼包弹窗
function giftShow(a: any) {
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
                <Link to="" id="giftStartGame" className="G_Gift_Play" >开始游戏</Link>
            </div>
        </div>
    );
}
