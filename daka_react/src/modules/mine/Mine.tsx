declare var require: any;
import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as Public from '../../common/Public';
import * as GameItem from '../../common/GameItem';
import * as IA from '../../common/ImageAssets';
import { Link } from 'react-router';
require('./Mine.css');
// DOM方法
let DOM = Utils.ElementUtile;
let C = Utils.Control;
let sign: any;
export class Mine extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            playerInfo: '',
            featuredGames: '',
        };
    }
    componentDidMount() {
        getPlayerInfo().then(data => {
            this.setState({ playerInfo: data });
        })
    }
    changeLogin() {
        Utils.SDK.login({ close: true }, '');
    }
    componentWillUnmount() {
        Utils.SDK.clear();
    }
    render() {
        let pi = this.state.playerInfo;
        if (typeof pi.playerInfo == 'undefined') {
            return <Public.Loadding />;
        }
        //我玩过的游戏
        let myGames = Utils.obj2Arr(pi.myGames).map((d: any) => {
            return <GameItem.GameSingle data={d} />
        });
        return (
            <div className="M_Main_Modules">
                <Userinfo data={pi} />
                {/* 我的礼包、积分兑换 */}
                <Userlink />
                {/* 我的游戏 */}
                <MyPlayed data={myGames} />
                {/* 我的论坛 */}
                {/*data:any,url:any,act:any,pi:any*/}
                {/*<MyList data="hh" url="hh" act="我的论坛" pi={pi} />
                <MyList data="hh" url="hh" act="我的帖子" pi={pi} />
                <MyList data="hh" url="hh" act="我的收藏" pi={pi} />*/}
                {/* <!--退出切换账号--> */}
                <Link to="/problemfeedback"><div><div className="M_Feedback">问题反馈</div></div></Link>
                <div><div className="M_SwithAccount" onClick={this.changeLogin}>切换账号</div></div>
                <MySign data={pi} />
            </div>
        );
    }

}
//获取登录后玩家信息
async function getPlayerInfo() {
    if (C.loginState()) {
        let data = await Utils.Ajax({
            method: '',
            url: '/Api/Lib/User.mine',
            data: {}
        })
        if (data.code == '1') {
            sign = data.data.check_signin;
            return data.data;
        }
    } else {
        Utils.SDK.login({close:true}, '');
        return {};
    }
}
// 我的主页头部个人信息。
class Userinfo extends React.Component<{ data: any }, any>{
    constructor() {
        super();
    }
    render() {
        let myData = this.props.data;
        type MINEIMG = typeof IA.MINE_IMG;
        type MINEIMGKEY = keyof MINEIMG;
        let vip: MINEIMGKEY = myData.playerInfo.vip;
        return (
            <div className="M_MainPage" >
                <div className="M_Mask"></div>
                <img src={myData.playerInfo.avatar} />
                <div className="M_UserInfo">
                    <span>
                        <div className="M_UserIcon">
                            <img className="lazy resizePic" id="playerAvatar" src={myData.playerInfo.avatar} />
                        </div>
                        <div className="M_UserSex">
                            <img src={myData.playerInfo.sex == '1' ? IA.MINE_IMG.sex_boy : IA.MINE_IMG.sex_girl} alt="" />
                        </div>
                    </span>
                    <div>
                        <span className="M_UserName">
                            {myData.playerInfo.nickname}
                            {vip ?
                                <div className="M_UserVip">
                                    <img src={IA.MINE_IMG[vip]} />
                                </div> :
                                null
                            }


                        </span>
                        <div className="M_UserID">
                            <span>ID：{myData.playerInfo.gc_user_id}</span><span>积分：{myData.playerInfo.point}</span>
                        </div>
                    </div>
                </div>
                <div className="B-myLabelFjDiv"><div className="B-myLabelFj"></div></div>
            </div >)

    }
}
//签到
class Userlink extends React.Component<any, any>{
    constructor() {
        super();
    }
    async signClick() {
        let data = await Utils.Ajax({
            method: 'GET',
            url: '/Api/Lib/User.signin',
            data: {}
        })
        var a: any, b: any,c:any;
        if (data.code == '1') {

            a = document.getElementById('M_Sign'),
                b = document.getElementById('mine_signin'),
                c=document.getElementById('M_How_Day');
                c.innerHTML='今日';
            b.className += ' ' + 'M_Sgin_Suc'; b.innerHTML = '已签到';
            a.style.display = "block";
        } else if (data.code == "-1") {
            a = document.getElementById('M_Sign'),
                c=document.getElementById('M_How_Day');
                c.innerHTML='明日';
            a.style.display = "block";
        }
    }
    render() {

        return (
            <div className="M_MyLink">
                {sign ? <div className="M_My_Link_Mod M_Sgin" onClick={this.signClick} id="mine_signin">未签到</div> : <div className="M_My_Link_Mod M_Sgin_Suc" onClick={this.signClick} id="mine_signin">已签到</div>}
                <Link to="/MineGiftLists">
                    <div className="M_My_Link_Mod M_Gift">我的礼包</div>
                </Link>
                <Link to="/MineSafly"><div className="M_My_Link_Mod M_Safety">账户安全</div></Link>
            </div>
        )
    }
}
//我的游戏
class MyPlayed extends React.Component<{ data: any }, any>{
    constructor() {
        super();
    }
    render() {
        return (
            <div className="M_My_Played">
                <Link to="/mineplayed">
                    <div className="M_My_P_Title">我在撸的游戏<div className="R__RightArrows" ></div></div>
                </Link>
                {
                    this.props.data.length ?
                        <div className="M_My_P_Game">
                            <div>
                                {this.props.data}
                            </div>
                            <i className="B-myGameClear"></i>
                        </div>
                        : null
                }

            </div>
        )

    }
}
//我的帖子，论坛。。
class MyList extends React.Component<{ data: any, url: any, act: any, pi: any }, any>{
    constructor() {
        super();
    }
    render() {
        return (
            <Link to={this.props.url} className="GCSTAT" data-act={this.props.act}>
                <div className="M_My_Modula">
                    <div>
                        {this.props.act}
                        <span > {this.props.pi.forums} </span>
                        <div className="R__RightArrows"></div>
                    </div>
                </div>
            </Link>
        )
    }
}
// 签到模块弹窗
class MySign extends React.Component<{ data: any }, any>{
    constructor() {
        super();
    }
    closeSign() {
        var a: any;
        a = document.getElementById('M_Sign');
        a.style.display = "none";
    }
    seeSign() {
        var a: any;
        a = document.getElementById('M_Sign_Rule');
        var showOrHide = DOM.getAttr(a, 'data-show');
        if (showOrHide == 'hide') {
            a.style.display = "block";
            DOM.setAttr(a, { 'data-show': 'show' })
        } else {
            a.style.display = "none";
            DOM.setAttr(a, { 'data-show': 'hide' })
        }

    }
    render() {
        let myData = this.props.data;
        return (
            <div className="M_Sign" id="M_Sign">
                <div className="M_Sign_Info">
                    <div className="M_Sign_Success"></div>
                    <div className="M_Sign_Text">
                        <span > <span id="M_How_Day">明日</span><span id="">签到送{myData.signin_point}</span>积分</span>
                        <p>连续签到积分会翻倍哦! <div onClick={this.seeSign}>查看积分规则</div></p>
                    </div>
                    <div className="M_Sign_Close" onClick={this.closeSign}></div>
                </div>
                <div className="M_Sign_Rule" id="M_Sign_Rule" data-show="hide">
                    <div className="M_Sign_Rule_Title"><img src={IA.MINE_IMG.mine_back} alt="" onClick={this.seeSign} /> 常见问题</div>
                    <div className="M_Sign_Rule_Contant">
                        <div className="m-rule pd-1">
                            <p className="M_Sign_Title">1、什么是白鹭积分？</p>
                            <p>白鹭积分是为了回馈广大粉丝感谢大家对白鹭游戏的支持，根据用户体验游戏，游戏中心活跃度等情况，通过累计积分的方式推出的一项长期的回馈服务。白鹭积分作为白鹭积分商城的一种货币，可用于兑换积分商城里面的各种实物奖励，游戏礼包，积分抽奖等。</p>


                            <p className="M_Sign_Title">2、如何使用积分？<a name="如何使用积分？"></a></p>
                            <p>进入积分商城，找到自己喜欢物品，点击图片就能看见商品详情以及兑换所需要的积分和兑换条件，点击兑换按钮即可。</p>

                            <p className="M_Sign_Title">3、哪些地方可以使用积分？<a name="哪些地方可以使用积分？"></a></p>
                            <p>一、游戏特权</p>
                            <p>限量游戏礼包，游戏道具随心兑换</p>
                            <p>二、商城礼物</p>
                            <p>限时限量兑换实物商品</p>
                            <p>三、积分抽奖</p>
                            <p>使用积分进行抽奖，各种礼品应有尽有</p>

                            <p className="M_Sign_Title">4、积分如何获取？<a name="积分如何获取？"></a></p>
                            <p>一、每日签到</p>
                            <p>进入游戏中心-“我的”界面，点击签到，即可获取对应的积分奖励。</p>
                            <p>连续第N天签到，当天奖励10*N积分</p>
                            <p>例如：</p>
                            <p>连续第1天签到，当天奖励10分，累计10分。</p>
                            <p>连续第2天签到，当天奖励20分，累计30分。</p>
                            <p>连续第3天签到，当天奖励30分，累计60分。</p>
                            <p>连续第21天签到，当天奖励210分，累计2310分。</p>
                            <p>......</p>
                            <p>连续签到超过21天，每天固定奖励150分。</p>
                            <p>中断签到后，当天奖励积分重新从10分开始计算，总积分累计。</p>
                            <p>二、关注、分享领积分</p>
                            <p>每天点击关注按钮，可直接获得20积分，没有关注的用户记得关注哦！</p>
                            <p>每天首次分享成功，可直接获得100积分。（分享到朋友或朋友圈才会加分）</p>
                            <p className="red">三、充值送积分</p>
                            <p className="red">游戏中心玩任意游戏充值可增加积分，1元=10积分</p>

                            <p className="M_Sign_Title">5、积分的有效期是多久？<a name="积分的有效期是多久？"></a></p>
                            <p>积分永久有效</p>

                            <p className="M_Sign_Title">6、为什么一些操作没有获得积分？</p>
                            <p>部分操作每天获得积分是有限的，比如每天第一次分享成功获得100积分，后面再次分享就不会获得积分了。</p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
