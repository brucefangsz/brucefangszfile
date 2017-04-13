import * as React from 'react';
import * as Utils from './Utils';
import * as IA from './ImageAssets';
import * as OTF from './ObjectTypeFormat';
import {Link} from 'react-router';
import * as GameItem from './GameItem';

export class ListItemView extends React.Component<{playerInfo:OTF.PlayerInfo},any>{
    render(){
        let pi = this.props.playerInfo;
        let vip:IA.PLAYER_VIP_KEY = pi.vip;
        return(
        <div className="R__GV_Item">
            <div className="R__GV_Info">
                <Link to="">
                    {GameItem.GameRankBadge(pi.index)}
                    <img className="R__GV_PlayerIcon" src={pi.avatar} />
                    <div className="R__GV_GameText">
                        <p className="R__GV_Header">
                            <span className="R__PV_PlayerName">{pi.nickname}</span> 
                        </p>
                        <p className="R__GV_GameAbout">
                            {PlayedGames(pi.games)}
                        </p>
                    </div>
                    <img src={IA.ICON_PLAYER_VIP[vip]} className="R__GV_PlayerRank" />
                </Link>
            </div>
        </div>);
    }
}
function PlayedGames(games:OTF.GameInfo[]){
    let elements = games.map((game:OTF.GameInfo) => {
        return <img src={game.gameinfo_icon} className="R__PV_GameLabel"/>;
    });
    return elements;
}