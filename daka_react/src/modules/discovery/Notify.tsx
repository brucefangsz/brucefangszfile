import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as OTF from '../../common/ObjectTypeFormat';
import * as IA from '../../common/ImageAssets';
import * as MI from '../../common/MessageItem';

export class Notify extends React.Component<any,any>{
    constructor(){
        super();
        this.state = {
            systemTag : '',
            msgView : ''
        }
    }
    componentDidMount(){
        this.setState({systemTag : SystemTag()});
        // MsgView().then(data => {
        //     this.setState({msgView : data});
        // })
    }
    render(){
        console.info(this.props)
        let systemTag = this.state.systemTag,
            msgView = this.state.msgView;
        return( 
            <div className="D_Msg_Container">
                {systemTag}
                {msgView}
                {/*<div className="D_Msg_TagView">
                    <div className="D_Msg_Icon">
                        <img src="https://image.egret.com/game/gameIcon/182/91140/icon_200.png"/>
                    </div>
                    <div className="D_Msg_Title">官方私信</div>
                    <div className="D_Msg_Slogon">相约《传奇世界H5》 爱神特使教你撩妹新套路</div>
                    <div className="D_Msg_Total">8</div>
                </div>
                <div className="D_Msg_TagView">
                    <div className="D_Msg_Icon">
                        <img src="https://image.egret.com/game/gameIcon/182/91140/icon_200.png"/>
                    </div>
                    <div className="D_Msg_Title">官方私信</div>
                    <div className="D_Msg_Slogon">相约《传奇世界H5》 爱神特使教你撩妹新套路</div>
                    <div className="D_Msg_Time">2017/02/19</div>
                </div>
                <div className="D_Msg_TagView">
                    <div className="D_Msg_Icon">
                        <img src="https://image.egret.com/game/gameIcon/182/91140/icon_200.png"/>
                    </div>
                    <div className="D_Msg_Title">官方私信</div>
                    <div className="D_Msg_Slogon">
                        <span>26岁</span>
                        <span>火星人</span>
                        <span>火星人</span>
                        <span>火星人</span>
                    </div>
                    <div className="D_Msg_Chat">聊天</div>
                </div>*/}
            </div>);
    }
}
// 系统标签
function SystemTag(){
    let tags = [
        {
            linkTo : '/',
            icon : IA.ICON_MESSAGE.caller,
            title : <p>最近来访</p>,
            text : <p>查看访问过的人</p>,
            signClass : '',
            signText : '',
            signLinkTo : '/'
        },
        {
            linkTo : '/',
            icon : IA.ICON_MESSAGE.attention,
            title : <p>最近来访</p>,
            text : <p>查看关注我的人</p>,
            signClass : '',
            signText : '',
            signLinkTo : '/'
        },
        {   
            linkTo : '/',
            icon : IA.ICON_MESSAGE.comment,
            title : <p>最近评论</p>,
            text : <p>查看评论/赞过我的人</p>,
            signClass : '',
            signText : '',
            signLinkTo : '/'
        }
    ];
    let elements = tags.map((tag:OTF.MessageTagView) => {
        return <MI.TagView tagView={tag} />
    });
    return elements;
}
async function MsgView(){
    let data = await Utils.Ajax({
        method : 'get',
        url : '/Api/Lib/Msg.msglist',
        data : {}
    });
    if(data.code == 1){
        let msgArray = data.data.msgFriend.data;
        let elements = msgArray.map((tag:any) => {
            let player = tag.player;
            let mtv:OTF.MessageTagView = {
                linkTo : '/',
                icon : player.avatar,
                title : player.nickname,
                text : tag.msg,
                signClass : 'D_Msg_Time',
                signText : tag.createtime_str,
                signLinkTo : '/'
            }
            return <MI.TagView tagView={mtv} />
        });
        return elements;
    }
}