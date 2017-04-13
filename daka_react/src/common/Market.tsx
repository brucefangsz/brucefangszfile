/*
    有料、美女、等第三方
*/

import * as React from 'react';
import * as Utils from './Utils';

import {Link} from 'react-router';

//导航
export class Nav extends React.Component<any, any> {
    render() {
        return (
            <div id="menu_scroll_box" className="m-box">
            <ul className="m-group-title" id="m-group-menu-ul">
            <li className="on">
                <span className="m-entrance-newcommentnew hide" id="red-joke"></span>
                <a href="/Joke?chanId=20573" className="GCSTAT" data-act="有料-段子" >段子</a>
            </li>
            <li>
                <a href="/Group?chanId=20573&amp;statPV=" className="GCSTAT" data-act="有料-精选">精选</a>
                </li>
            <li>
                {/* <span className="m-entrance-newcommentnew hide" id="red-photo"></span> */}
                <a href="/Photo?chanId=20573" className="GCSTAT" data-act="有料-美图" >美图</a>
            </li>
            <li>
                <a href="/Article?chanId=20573" className="GCSTAT" data-act="有料-游戏" >游戏</a>
            </li>
            </ul>
            </div>
        );
    }
}

//段子、美女、游戏
export class Jpa extends React.Component<any, any> {
    render() {
        let g = this.props.data;
        let type = this.props.type; //joke,photo,article
        return (
            <div  className="bbs-bg-white myDT mt-10 bbs-page">
                <div className="bbs-commentBox">
                    <a href="/Comment.info?chanId=20573&amp;type_id=2375&amp;type=3">
                        <div className="B-trendsSpeak">
                            {g.content}
                        </div>
                    </a>
                    <div className="bbs-height bbs-zan bbs-fc-gray bbs-fs10">
                        <div className="bbs-fl circleGoodHand" data-type="3" data-typeid="2375" data-gooded="-2" data-click="0" data-myicon="">
                            <i className="B-zanNo" title="赞"></i>
                            <span className="text-gray B-zanNum" id="circleGood-2375">{g.good_num}</span>
                        </div>
                        <div className="bbs-fl circleGoodHand" data-type="3" data-typeid="2375" data-gooded="-2" data-click="0" data-myicon="" data-status="-1">
                            <i className="B-caiNo" title="踩"></i>
                            <span className="text-gray B-zanNum">{g.tread_num}</span>
                        </div>
                        <div className="bbs-fr followAction" data-type="3" data-typeid="2375">
                            <img src="http://gamecenter.egret-labs.org/misc/images/joke/btn_sc_un_3x.png" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}




