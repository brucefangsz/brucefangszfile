declare var require: any;
import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as Public from '../../common/Public';
import * as IA from '../../common/ImageAssets';
import { Link, hashHistory } from 'react-router';

require('./Mine.css');
// 正则
const PHONEREG = Utils.DAKAREG;
// DOM方法
const DOM = Utils.ElementUtile;
const Reg = Utils.DAKAREG;
var E = Utils.ElementUtile;
let pageNumer = 1,ajaxState = false;
export class MinePlayed extends React.Component<any, any>{
    constructor() {
        super();
        this.state = {
            playedList: [],
            totalRows : 0,
        };
    }
    componentDidMount() {
        getPlayedList().then(data => {
            if (data) {
                this.setState({ 
                    playedList: data.list,
                    totalRows : data.totalRows
                });
            }
        })
        Utils.Scroll( ()=> {
            if(E.getTag('#tagM_PGames') && E.isElement(E.getTag('#tagM_PGames'))){
                let games = E.getTag('#tagM_PGames').getElementsByClassName('M_Main_Played_Mod');
                if(games && games.length){
                    if(games.length < this.state.totalRows){
                        if(!ajaxState){
                            ajaxState = true;
                            E.pageLoading(E.getTag('#tagM_PGames'));
                            setTimeout(() => {
                                getPlayedList().then( data => {
                                    E.unPageLoading(E.getTag('#tagM_PGames'));
                                    this.setState({ playedList: this.state.playedList.concat(data.list) });
                                    ajaxState = false;
                                });
                            },500);
                        }
                    }    
                }
            }
        })       
    }
    componentWillUnmount(){
        pageNumer = 1;
        Utils.Scroll( ()=> {});
    }
    gobackClick() {
        hashHistory.goBack();
    }
    render() {
        let b: any, playNum: any;
        if (this.state.playedList.length) {
            let a = this.state.playedList;
            b = a.map((c: any) => {
                return (
                    <div className="M_Main_Played_Mod">
                        <img src={c.gameinfo_icon} alt="" />
                        <div>
                            <span>{c.game_name}</span>
                            <div>{c.players}人在玩 {c.lastPlayTime}</div>
                        </div>
                        <Link to={`/play/${c.gId}`}><div className="M_Main_Play_In">接着玩</div></Link>
                    </div>
                )
            })
            playNum = (this.state.totalRows);
        } else {
            b = (<div className="R__No_Data"><img src={IA.DEFAULT_PIC.no_game} alt="" /></div>);
            playNum = '0';
        }
        return (
            <div className="R__Modules M_Main_Played" id="tagM_PGames">
                <div className="R__Header">
                    <Link to='' onClick={this.gobackClick}>
                        <div className="R__BackBtn"></div>
                    </Link>
                    玩过的游戏
                </div>
                <div className="M_Main_All">哇喔！我玩过 <span>{playNum}</span> 款游戏</div>
                {b}
            </div>
        )
    }
}
async function getPlayedList() {
    let data = await Utils.Ajax({
        method: 'GET',
        url: '/Api/Lib/Index.playgames',
        data: {pageId : pageNumer}
    })
    if (data.code == '1') {
        ++pageNumer;
        return (
            data.data
        )
    }
}
