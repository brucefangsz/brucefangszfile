declare var require:any;
import * as React from 'react';
import {Link} from 'react-router';
import * as IA from '../../common/ImageAssets';
import * as Menu from '../../common/Menu';
require('./Games.css');
export class GameRank extends React.Component<any,any>{
    render(){
        let navbar = [
            {
                name : '热游榜',
                to : '/gr/hot'
            },
            {
                name : '新游榜',
                to : '/gr/new'
            },
            // {
            //     name : '富豪榜',
            //     to : '/gr/rich'
            // }
        ];
        return(
            <div className="R__Modules G_GR_Modules">
                <div className="R__Header">
                    <Link to="/games"><div className="R__BackBtn"></div></Link>
                    <div className="R__TitleContainer">
                        <img className="R__Icon" src={IA.ICON_GAME_RANK.cup} />
                        <div className="R__Title">排行榜</div>
                    </div>
                </div>
                <div className="G_GR_NavLabels">
                    <div className="G_GR_LeftBackground"></div>
                    <div className="G_GR_NL_Container">
                        <Menu.GameRankNavView menus={navbar} />
                    </div>
                    <div className="G_GR_RightBackground"></div>
                </div>
                <div className="R__GV_Modules G_GR_Modules">
                    <div className="R__GV_Container">
                        {this.props.children}
                        {/*<div className="R__GV_Item">
                            <div className="R__GV_Info">
                                    <img className="R__GV_Rank_Icon" src="https://image.egret.com/game/gameIcon/180/90132/icon_200.png" />
                                    <img className="R__GV_GameIcon" src="https://image.egret.com/game/gameIcon/180/90132/icon_200.png" />
                                    <div className="R__GV_GameText">
                                        <p className="R__GV_Header">
                                            <span className="R__GV_GameName R__GameNameMaxWidth">全民穿越之宫</span> 
                                            <span className="R__GV_GameTag"><img src="images/009f2ac5.icon_own.svg"/><img src="images/401af9f1.icon_gift.svg"/></span>
                                        </p>
                                        <p className="R__GV_GameAbout R__GV_WidthMedia">
                                            数百种口袋精灵，经典创新相结合，操作简单，技能绚丽丰富，休闲于指尖之中
                                        </p>
                                    </div>
                                    <span className="R__GV_PlayGame">
                                        进入
                                    </span>
                            </div>
                        </div>
                        <div className="R__GV_Item">
                            <div className="R__GV_Info">
                                    <div className="R__GV_Rank_Num">4</div>
                                    <img className="R__GV_GameIcon" src="https://image.egret.com/game/gameIcon/180/90132/icon_200.png" />
                                    <div className="R__GV_GameText">
                                        <p className="R__GV_Header">
                                            <span className="R__GV_GameName R__GameNameMaxWidth">全民穿越之宫</span> 
                                            <span className="R__GV_GameTag"><img src="images/009f2ac5.icon_own.svg"/><img src="images/401af9f1.icon_gift.svg"/></span>
                                        </p>
                                        <p className="R__GV_GameAbout R__GV_WidthMedia">
                                            数百种口袋精灵，经典创新相结合，操作简单，技能绚丽丰富，休闲于指尖之中
                                        </p>
                                    </div>
                                    <span className="R__GV_PlayGame">
                                        进入
                                    </span>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </div>
        );
    }
}