declare var require: any;
import * as React from 'react';
import {Link} from 'react-router';
import * as Menu from '../../common/Menu';
import * as Utils from '../../common/Utils';
let C = Utils.Control;
require('./Games.css');

export class GiftRouter extends React.Component<React.Props<any>,any>{
    render(){
        let navbar = [
            {
                to : '/gc/gift',
                name : '礼包中心'
            },
            {
                to : '/gc/mein',
                name : '我的礼包'
            }
        ];
        return(
            <div className="R__Modules G_NG_Modules">
                <div className="R__Header">
                    <Link to="/">
                        <div className="R__BackBtn"></div>
                    </Link>
                    礼包
                </div>
                <div className="R__NavLabel">
                    <div className="R__NavLabel_Container">
                         <Menu.NavLabelView menus={navbar} class="G_NG_NavLabels" />
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}