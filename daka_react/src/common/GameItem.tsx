import * as React from 'react';
import * as Utils from './Utils';
import * as IA from './ImageAssets';
import * as OTF from './ObjectTypeFormat';
import {Link} from 'react-router';

// 游戏列表--九宫格
export class BigView extends React.Component<{gameInfo:OTF.GameInfo},any>{
    render(){
        let gi = this.props.gameInfo,
            [alias,tag] = [gi.category+'-'+gi.game_name,''];
        function GameTag(){
            switch(gi.index){
                case 0 :
                    return(<div className="G_FG_TopTag G_FG_TopColor_Red"><span className="G_FG_TopTagText">热</span></div>);
                case 1 : 
                    return(<div className="G_FG_TopTag G_FG_TopColor_Green"><span className="G_FG_TopTagText">新</span></div>);
                case 2 :
                    if(gi.gifts){
                        return(<div className="G_FG_TopTag G_FG_TopColor_Yellow"><span className="G_FG_TopTagText">礼</span></div>);
                    }
            }
        }
        return(
            <li>
                {GameTag()}
                <Link to={`/gameInfo/${gi.game_id}`} >
                    <div className="G_FG_Header">
                        <img src={gi.gameinfo_icon} alt={alias} />
                    </div>
                </Link>
                <span className="G_FG_GameName R__NoLineFeed R__GameNameMaxWidth">{gi.game_name}</span>
                <span className="G_FG_Describe R__NoLineFeed">{gi.gameinfo_short_description}</span>
                <Link to={`/play/${gi.game_id}`}>
                    <div className="G_FG_Operation">
                        <span className="G_FG_PlayGame">进入</span>
                    </div>
                </Link>
            </li>
        );
    }
}
type ListItemsProps = {
    gameInfo : OTF.GameInfo,
}
// 游戏列表--传统
export class ListItemView extends React.Component<ListItemsProps,any>{
    render(){
        let gi = this.props.gameInfo;
        let gameAbout:any;
        if(!gi.game_show_about){
            gameAbout = gi.gameinfo_short_description;
        }else{
            gameAbout = gi.game_show_about;
        }
        let gameBtn:JSX.Element,gameBtnClass:string = 'R__GV_PlayGame ';
        if(gi.game_show_btn != '2'){
            gameBtn = <Link to={`/play/${gi.game_id}`}>
                    <span className={gameBtnClass}>进入</span>
                </Link>;
        }else{
            gi.isOk == '1' ? gameBtnClass += 'R__GV_PlayGame_Checked' : '';
            gameBtn = <span className={gameBtnClass} data-index={gi.elementIndex} data-gos_id={gi.gos_id} onClick={gi.game_callback}>预约</span>;
        }
        return(
        <div className="R__GV_Item">
            <div className="R__GV_Info">
                <Link to={`/gameInfo/${gi.game_id}`}>
                    {gi.isOk == '1' ? <img className="G_NG_YY" src={IA.ICON_NEW_GAME.yy}/> : ''}
                    {gi.index ? GameRankBadge(gi.index) : ''}
                    <img className="R__GV_GameIcon" src={gi.gameinfo_icon} />
                    <div className={gi.index ? 'R__GV_GameTextShort' : 'R__GV_GameText'}>
                        <p className="R__GV_Header">
                            <span className="R__GV_GameName">{gi.game_name}</span> 
                            {gi.labels ? <GameLabel labels={gi.labels}/> : ''}
                        </p>
                        <p className="R__GV_GameAbout">
                            {gameAbout}
                        </p>
                    </div>
                </Link>
                {gameBtn}
            </div>
        </div>);
    }
}

export class GameLabel extends React.Component<any,any>{
    render(){
        let labelArray:IA.GAME_LABEL_KEY[] = this.props.labels;
        let labels = labelArray.map((label) => {
            return(<img key={label.toString()} src={IA.GAME_LABEL[label]} />);
        });
        return(<span className="R__GV_GameTag">{labels}</span>);
    }
}
// 排行榜--排名徽章
export function GameRankBadge(num:number){
    let temporary = <div className="R__GV_Rank_Num">{num}</div>,
        imgPath;
    switch(num){
        case 1 : 
            imgPath = IA.ICON_GAME_RANK.goldMedal;
            break;
        case 2 :
            imgPath = IA.ICON_GAME_RANK.silverMedal;
            break;
        case 3 :
            imgPath = IA.ICON_GAME_RANK.bronzeMedal;
            break;
    }
    if(num<=3){
        temporary = <img className="R__GV_Rank_Icon" src={imgPath}/>;
    }
    return temporary;
}

//游戏icon 游戏名称 进入游戏  {data=gameInfo} go1是否有进入游戏标签
export class GameSingle extends React.Component<any, any> {
    render() {
        let g = this.props.data;
        return (
            <Link to={`/play/${g.game_id}`}>
            <div className="M_My_Game_Icon">
                <img className="lazy" src={g.icon}/>
                <span>{g.name}</span>
                {this.props.go ? '<span className="gamePlay text-blue">进&nbsp;&nbsp;入</span>' : ''}
            </div>
            </Link>
        );
    }

}