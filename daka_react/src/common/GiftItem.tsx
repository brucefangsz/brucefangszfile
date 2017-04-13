/*
    GiftItem
*/
import * as React from 'react';
import { Link, hashHistory } from 'react-router';
import * as OTF from './ObjectTypeFormat';
import * as Utils from './Utils';
let C = Utils.Control, E = Utils.ElementUtile;
export class GiftView extends React.Component<{ GiftInfo: OTF.GameInfo }, any>{
    render() {
        let ii = this.props.GiftInfo;
        var mine = this.props.GiftInfo.giftMine;
        var playGame = this.props.GiftInfo.show_playgame_url;
        return (
            <div className="G_GL_Content">
                <Gift gift={ii.giftList} mine={mine} pg={playGame} />
            </div>
        );
    }
}

export class Gift extends React.Component<{ gift: OTF.gift[], mine: any, pg: any }, any>{
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount() {
        Utils.Shadow(() => {
            E.setCss(E.getTag('#G_Gift_Info'), { display: 'none' });
        });
    }
    async handleClick(event: any) {
        if (C.loginState()) {
            var G_Gift_Info: any = document.getElementById('G_Gift_Info'),
                giftMsg: any = document.getElementById('giftMsg'),
                giftStartGame: any = document.getElementById('giftStartGame'),
                giftCode: any = document.getElementById('giftCode'),
                giftClose: any = document.getElementsByClassName('G_Gift_Close')[0],
                gId = event.target.dataset.gameid,
                gfId = event.target.dataset.giftid,
                look = event.target.dataset.look,
                gCode = event.target.dataset.code;
            giftStartGame.setAttribute('data-play', gId);
            giftMsg.innerHTML = event.target.dataset.way;
            giftStartGame.onclick = function (event: any) {
                hashHistory.replace('/play/' + gId);
            }
            giftClose.onclick = function () {
                E.unShandow(() => {
                    E.setCss(E.getTag('#G_Gift_Info'), { display: 'none' });
                });
            }
            if (!look) {

                let data = await Utils.Ajax({
                    method: '',
                    url: '/Api/Lib/gift.used',
                    data: {
                        'gameId': gId,
                        'giftId': gfId
                    }
                })
                if (data.code == '1') {
                    giftCode.innerHTML = data.data;
                    G_Gift_Info.style.display = 'block';
                    E.inShadow();
                } else {
                    Utils.tipsBox(data.msg)
                }
            } else {
                E.inShadow();
                giftCode.innerHTML = gCode;
                G_Gift_Info.style.display = 'block';
            }

        } else {
            Utils.SDK.login({ close: true }, '');
        }
    }
    render() {
        let gift = this.props.gift;
        let mine = this.props.mine;
        let pg = this.props.pg;
        let elements = gift.map((gi: OTF.gift) => {
            let sT = Utils.conversionTime(gi.starttime), eT = Utils.conversionTime(gi.endtime);

            return (
                <p className="G_GL_Title">
                    <p>
                        <span className="G_GL_Gift_Name">{gi.name}&nbsp;&nbsp;</span>
                        <span>(剩余 {gi.rate_used}%)</span>
                    </p>
                    礼包内容：<span className="G_GL_Surplus">{gi.content}</span>
                    <p className="G_GL_Date">有效时间：{sT}至{eT}</p>

                    {mine ? <div className="G_GL_Get_Gift" onClick={this.handleClick}
                        data-way={gi.note} data-pg={pg} data-content={gi.code}
                        data-gameId={gi.game_id} data-giftId={gi.id} data-look="true" data-code={gi.code} >查看</div> : <div className="G_GL_Get_Gift"
                            onClick={this.handleClick} data-way={gi.note}
                            data-pg={pg} data-content={gi.code} data-gameId={gi.game_id} data-giftId={gi.id} >领取</div>}
                </p>);
        });
        return <div>{elements}</div>;
    }

}

