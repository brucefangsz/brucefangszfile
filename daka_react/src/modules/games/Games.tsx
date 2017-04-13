declare var require: any;

import * as React from 'react';
import { Link } from 'react-router';
import * as Utils from '../../common/Utils';
import * as Menu from '../../common/Menu';
import * as IA from '../../common/ImageAssets';
import * as OTF from '../../common/ObjectTypeFormat';
import * as BannerItem from '../../common/BannerItem';
import * as GameItem from '../../common/GameItem';
require('./Games.css');
// export class Games extends React.Component<any, { data?: AjaxGameInfo }>{
export class Games extends React.Component<any, any>{
    constructor() {
        super();
        this.state = {
            banner: '',
            topNav: '',
            playGames: '',
            featuredGames: '',
            newGames: '',
            bbs: '',
            hotGames: '',
            commendGames: '',
            classicGames: '',
            gameShow: ''
        };
    }
    componentDidMount() {
        this.setState({ banner: <Banner /> });
        TopNav().then(data => {
            this.setState({ topNav: data });
        });
        PlayGames().then(data => {
            this.setState({ playGames: data });
        });
        FeaturedGames().then(data => {
            this.setState({ featuredGames: data });
        });
        // this.setState({bbs : <Bbs/>});
        // NewGames().then(data => {
        //     this.setState({newGames : data});
        // });
        // HotGames().then(data => {
        //     this.setState({hotGames : data});
        // });
        // CommendGames().then(data => {
        //     this.setState({commendGames : data});
        // });
        // ClassicGames().then(data => {
        //     this.setState({classicGames : data});
        // })
        GameShow().then(data => {
            this.setState({ gameShow: data });
        });
    }
    render() {
        let banner = this.state.banner,
            topNav = this.state.topNav,
            playGames = this.state.playGames,
            featuredGames = this.state.featuredGames,
            bbs = this.state.bbs,
            newGames = this.state.newGames,
            hotGames = this.state.hotGames,
            commendGames = this.state.commendGames,
            classicGames = this.state.classicGames,
            gameShow = this.state.gameShow;

        return (<div className="R__Modules">
            {banner}
            {topNav}
            {playGames}
            {featuredGames}
            {bbs}
            {newGames}
            {hotGames}
            {commendGames}
            {classicGames}
            {gameShow}
        </div>);
    }
}
// Banner
class Banner extends React.Component<any, any>{
    constructor() {
        super();
        this.state = { banner: '' };
    }
    componentDidMount() {
        this.Ajax().then(data => {
            this.setState({ banner: <BannerItem.Banner bannerArray={data} /> });
        });
    }
    async Ajax() {
        let data = await Utils.Ajax({
            method: '',
            url: '/Api/Lib/Index.banner',
            data: {}
        });
        if (data.code == 1) {
            let elements = data.data.map((banner: OTF.BannerInfo) => {
                return banner;
            });
            return elements;
        }
    }
    render() {
        return <div className="G_Banner_Modules">{this.state.banner}</div>;
    }
}
// 顶部导航
async function TopNav() {
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/RedDot.base',
        data: {
            type: 2,
            status: 1
        }
    });
    let elements: JSX.Element = <div></div>;
    if (data.code == 1) {
        elements = <div className="R__SmallNav_NewGameTag"></div>;
    }
    let navbar = [
        {
            name: <div><img src={IA.ICON_MENU_GAMES.newGames} /><br />新游{elements}</div>,
            to: '/ng'
        },
        {
            name: <div><img src={IA.ICON_MENU_GAMES.rank} /><br />排行</div>,
            to: '/gr'
        },
        {
            name: <div><img src={IA.ICON_MENU_GAMES.gift} /><br />礼包</div>,
            to: '/gc'
        },
        {
            name: <div><img src={IA.ICON_MENU_GAMES.search} /><br />搜索</div>,
            to: '/search'
        }
    ];
    return (<div className="R__Container R__SmallNav_Modules"><Menu.TopMenuView menus={navbar} /></div>);
}
// 玩过的游戏
async function PlayGames() {
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/Lib/Index.playgames',
        data: { from: 'index' }
    });
    if (data.code == 1) {
        let temproary = data.data.list;
        let elements = temproary.map((li: OTF.GameInfo,index : number) => {
                         
            let iconInfo: OTF.SmallIconView = {
                class: '',
                icon_url: li.gameinfo_icon,
                gId:li.game_id
            }
            if(index >= 3){
                return false;
            }
            return Utils.IconView(iconInfo);
        });
        return (
            <div className="G_PG_Modules">
                
                    <div className="G_PG_Container">
                        <span>嘿，你{data.msg}</span>
                        <div className="G_PG_GameIcon">
                            <ul>
                                {elements}
                                <li>
                                    <Link to="/mineplayed"><div className="R__RightArrows"></div></Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                
            </div>
        )
    }
}
// 精品推荐
async function FeaturedGames() {
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/Lib/Index.featured',
        data: {}
    });
    if (data.code == 1) {
        let gameList = data.data[0],
            category = gameList.category,
            elements = gameList.game_data.map((game: OTF.GameInfo, index: number) => {
                game.category = category;
                game.index = index;
                return (<GameItem.BigView gameInfo={game} key={game.game_id} />);
            });
        return (
            <div className="R__Container G_FG_Modules">
                <div className="R__Container_Title">
                    <h1>{gameList.category}</h1>
                </div>
                <div className="G_FG_Container">
                    <ul>
                        {elements}
                    </ul>
                    <Link to="/games/ag">
                        <div className="G_FG_MoreGame">
                            全部游戏
                            <div className="G_FG_MoreGameIcon"></div>
                        </div>
                    </Link>
                </div>
            </div>);
    }
}
// 论坛
class Bbs extends React.Component<any, any>{
    constructor() {
        super();
        this.state = { bbs: '' };
    }
    componentDidMount() {
        this.Ajax().then(data => {
            this.setState({ bbs: data });
        });
    }
    handleClick(e: any) {
        e.nativeEvent.stopImmediatePropagation();
       
    }
    async Ajax() {
        let data = await Utils.Ajax({
            method: '',
            url: '/Api/Lib/Index.indexbbs',
            data: { from: 'index' }
        });
        if (data.code == 1) {
            let bbsArray = Utils.obj2Arr(data.data);
            let elements = bbsArray.map((bbs: any) => {
                let gi: OTF.GameInfo = bbs.game_info;
                return (
                    <div className="G_Bbs_Slide" key={bbs.circle_id} onClick={(e) => this.handleClick(e)} data-type="00000">
                        <div className="G_Bbs_Header" data-type="123">
                            <span className="G_Bbs_Tag">
                                {bbs.tag}
                            </span>
                        </div>
                        <Link to="">
                            <div className="G_Bbs_Info" data-type="！！！是帅帅">
                                <img className="G_Bbs_Icon" src={gi.gameinfo_icon} data-type="4555" />
                                <div className="G_Bbs_Title" data-type="789">#{gi.game_name}#</div>
                                <span className="G_Bbs_Slogon">
                                    {bbs.title}
                                </span>
                            </div>
                        </Link>
                    </div>);
            });
            return <div className="G_Bbs_Container">{elements}</div>;
        }
    }
    render() {
        let bbs = this.state.bbs;
        return (<div className="G_Bbs_Modules">{bbs}</div>);
    }
}
// 游戏展示
async function GameShow() {
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/Lib/Index.specialList',
        data: {}
    });
    if (data.code == 1) {
        let element = data.data.map((special: any) => {
            let games = special.game_data.map((game: OTF.GameInfo) => {
                return (<GameItem.ListItemView gameInfo={game} key={game.game_id} />);
            });
            return GameShowModule(special.ad_pic, games);
        });
        return (
            <div>
                {element}
            </div>
        )
    }
}
function GameShowModule(banner: any, elements: any) {
    return (<div className="R__Container R__GV_Modules G_GS_Module">
        <div className="R__GV_Container">
            <Link to="">
                <img className="R__GV_Banner" src={banner} />
            </Link>
            {elements}
        </div>
    </div>);
}
// 新游
// Promise设置返回值类型
// async function NewGames(): Promise<AjaxGameInfo | undefined> {
async function NewGames() {
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/Lib/Game.newGame',
        data: {}
    });
    if (data.code == 1) {
        let elements = data.data.map((game: OTF.GameInfo) => {
            return (<GameItem.ListItemView gameInfo={game} key={game.game_id} />);
        });
        return (
            <div className="R__Container R__GV_Modules">
                <div className="R__Container_Title">
                    <h1> 这些游戏都玩过吗？</h1>
                    <span className="R__Container_FloatRight">
                        <Link to="">
                            <div className="R__MoreIcon"></div>
                        </Link>
                    </span>
                </div>
                <div className="R__GV_Container">
                    <Link to="">
                        <img className="R__GV_Banner" src="https://image.egret.com/img1000/2017/01/1484221146.0568_2222.jpg" />
                    </Link>
                    {elements}
                </div>
            </div>
        );
    }
}