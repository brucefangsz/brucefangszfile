import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as IA from '../../common/ImageAssets';
import { Link,hashHistory } from 'react-router';
const ajaxUrl = Utils.GC_AJAX_URL;
const GAME_CATE = {
    "1": '角色扮演',
    "2": '动作冒险',
    "3": '飞行射击',
    "5": '策略塔防',
    "6": '体育竞技',
    "7": '益智休闲',
    "8": '棋牌桌游',
    "9": '模拟经营',
    "10": '挂机放置',
    "11": '跑酷竞速',
    "12": '社区养成',
    "13": '战争策略',
    "14": '其他',
}
type GAME_CATE_KEY = keyof typeof GAME_CATE;


export class GameInfo extends React.Component<any, any>{
    constructor() {
        super();
        this.state = {
            gameinfo: ''
        };
    }
    componentDidMount() {
        this.GameInfoHtml().then(data => {
            this.setState({ gameinfo: data });
        });
    }
    handleClick(e: any) {
        var G_GI_Text:any=document.getElementById('G_GI_Text'),
            G_GI_Status:any=document.getElementById('G_GI_Status');
        if (e.target.getAttribute('data-status') == 'true') {
            e.target.setAttribute('data-status', 'false');
            G_GI_Text.style.height = "40px";
            G_GI_Text.style.display = '-webkit-box';
            G_GI_Status.innerHTML='∨';
        } else {
            e.target.setAttribute('data-status', 'true');
            G_GI_Text.style.height = "auto";
            G_GI_Text.style.display = 'block';
            G_GI_Status.innerHTML='∧';
        }
    }
    goBack(){
        hashHistory.goBack();
    }
    async  GameInfoHtml() {
        let data = await Utils.Ajax({
            method: '',
            // /Api/Lib/Game.info?gameId=1004
            url: '/Api/Lib/Game.info',
            data: { gameId: this.props.params.id }
        })
        let gameinfohtml: any;
        let game_img: any;

        if (data.code == 1) {
            let gi = data.data,
                gci: GAME_CATE_KEY = gi.game_category_id,
                gp = gi.gameinfo_publicity_pic,
                bg = {
                    background: 'url(' + gi.gameinfo_gc_bg_http + ')', backgroundSize: "100% 100%"
                };
            return (
                game_img = getGamePic(gp),
                <div className="G_GameInfo">
                    <div className="G_GI_Banner" style={bg}>
                        <div className="G_GI_Bg"></div>
                        <div className="G_GI_Back" onClick={this.goBack}>
                            <img src={IA.GAMEINFO_IMG.back_btn} alt="" />
                        </div>
                        <div className="G_GI_GameName">
                            <img src={gi.gameinfo_icon} alt="" />
                            <span className='G_GI_GN'>{gi.game_name}</span>
                            <span className="G_GI_GT">{GAME_CATE[gci]}</span>
                        </div>
                        <Link to={`/play/${gi.game_id}`}>
                        <div className="G_GI_GS_BTN">开始游戏</div>
                        </Link>
                    </div>
                    {/*
                    <div className='G_GI_BBS_LINK'>
                        <div><Link to=''><span className="">游戏论坛</span><img src={IA.GAMEINFO_IMG.bbs_icon} alt="" /><span className="R__NoLineFeed G_GI_BBS_T">{data.data.top.title}?{data.data.top.title}:{gi.show_users}人在玩</span><div className="R__RightArrows G_GI_POS"></div></Link></div>
                        <div><Link to=''><span className="">游戏礼包</span><img src={IA.GAMEINFO_IMG.gift_icon} alt="" /><span className="G_GI_BBS_T">{data.data.gift_total}款礼包，价值{data.data.gift_price}元</span><div className="R__RightArrows G_GI_POS"></div></Link></div>
                    </div>
                    */}
                    <div className="G_GI_GP">
                        <div >{game_img}</div>
                    </div>
                    <div className='G_GI_Text'>
                        <div className='G_GI_Title'>游戏简介</div>
                        <p onClick={this.handleClick.bind(this)} data-status="false" id="G_GI_Text">{gi.gameinfo_describe}</p>
                        <div onClick={this.handleClick.bind(this)} data-status="false" className="G_GI_Status" id="G_GI_Status">∨</div>
                    </div>
                </div>
            )
        }
    }
    render() {
        let GameInfo = this.state.gameinfo;
        return (<div>{GameInfo}</div>);
    }
}


// 顶部游戏信息。
function getGamePic(soucre: any) {
    let gp_html = soucre.map((game_pic: string) => {
        return (
            <img src={game_pic} alt="" />
        )
    })
    return gp_html;

}