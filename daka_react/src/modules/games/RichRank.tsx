import * as React from 'react';
import {Link} from 'react-router';
import * as Utils from '../../common/Utils';
import * as OTF from '../../common/ObjectTypeFormat';
import * as PlayerItem from '../../common/PlayerItem';

export class RichRank extends React.Component<any,any>{
    constructor(){
        super();
        this.state = {hotGame : ''}
    }
    componentDidMount(){
        RichRankView().then(data => {
            this.setState({hotGame : data});
        });
    }
    render(){
        return(
            <div className="G_GR_Container">
                {this.state.hotGame}
                {PlayerRank()}
            </div>
        );
    }
}
async function RichRankView(){
    let data = await Utils.Ajax({
        method : '',
        url : '/Api/Lib/Game.richList',
        data : {}
    });
    if(data.code == 1){
        let elements = data.data.map((pi:OTF.PlayerInfo,num:number) => {
            pi.index = ++num;
            return(<PlayerItem.ListItemView playerInfo={pi} />);
        });
        return elements;
    }
}
function PlayerRank(){
    let html = <div className="G_GR_MyRank_Modules">
        <div className="G_RG_MyRank_Bg"></div>
        <div className="G_GR_MyRank_Container">
            <div className="G_GR_MyRank_Shadow"></div>
            <div className="G_GR_MyRank_ShadowTo"></div>
            <div className="G_GR_MyRank_ShadowThree">
                <div></div>
            </div>                         
            <img className="G_GR_MyRank_Icon" src="https://image.egret.com/upload/month_1604/201604150952387027.png"/>
            <div className="G_GR_MyRank_PlayedGames">
                <img className="G_GR_MyRank_GameIcon" src="https://image.egret.com/game/gameIcon/0/257/icon_200.png"/>
                <img className="G_GR_MyRank_GameIcon" src="https://image.egret.com/game/gameIcon/182/91140/icon_200.png"/>
                <img className="G_GR_MyRank_GameIcon" src="https://image.egret.com/game/gameIcon/180/90488/icon_200.png"/>
            </div>
            <span className="G_GR_MyRank_Rank">未上榜</span>
        </div>
    </div>;
    return html;
}