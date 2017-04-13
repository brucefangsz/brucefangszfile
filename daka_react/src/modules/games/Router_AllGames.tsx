import * as React from 'react';
import {Link} from 'react-router';
// import * as Utils from '../../common/Utils';
import * as Menu from '../../common/Menu';

export class AllGamesRouter extends React.Component<any,any>{
    render(){
        let navbar = [
            {
                name : '点击',
                to : '/games/ag/click'
            },
            {
                name : '养成',
                to : '/games/ag/develop'
            },
            {
                name : 'ARPG',
                to : '/games/ag/arpg'
            },
            {
                name : '棋牌',
                to : '/games/ag/chess'
            }
        ]
        return(<div className="R__Modules G_FG_AG_Modules">
                <div className="R__Header">
                    <Link to="/">
                        <div className="R__BackBtn"></div>
                    </Link>
                    全部游戏
                </div>
                <div className="R__NavLabel">
                    <div className="R__NavLabel_Container">
                         <Menu.NavLabelView menus={navbar} class="G_FG_AG_NavLabels"/>
                    </div>
                </div>
                {this.props.children}
            </div>);
    }
}