import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as GiftItem from '../../common/GiftItem';
import * as GameItem from '../../common/GameItem';
import * as OTF from '../../common/ObjectTypeFormat';
import { Link } from 'react-router';
export class GiftList extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            giftList: ''
        };
    }
    componentDidMount() {
        giftList().then(data => {
            this.setState({ giftList: data });
        });
    }
    render() {
        let giftList = this.state.giftList;
        return (<div className="">{giftList}</div>);

    }
}
async function giftList() {
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/Lib/Gift.lists',
        data: {}
    });
    let giftHtml: any, giftShow1: any;
    if (data.code == '1') {
        if (data.data) {
            giftHtml = getGift(Utils.obj2Arr(data.data));
            giftShow1 = giftShow(data.data);
        }
        return (
            <div>{giftHtml}{giftShow1}</div>
        );
    }
}
function getGift(soucre: any) {
    let readyToGift = soucre.map((a: OTF.GameInfo) => {
        let b = a.gameinfo_icon;
        a.giftMine = false;
        return (
            <div className="G_Gift_List">
                <div className="G_GL_Name"><img src={b} alt="" /><span>{a.game_name}</span></div>
                <GiftItem.GiftView GiftInfo={a} />
            </div>
        );

    })
    return (
        <div className="G_Gift_List_Contend">{readyToGift}</div>
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
                <Link to="" id="giftStartGame" className="G_Gift_Play" >开始游戏</Link>
            </div>
        </div>
    );
}
