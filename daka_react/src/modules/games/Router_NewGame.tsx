declare var require: any;

import * as React from 'react';
import {Link} from 'react-router';
import * as Menu from '../../common/Menu';
require('./Games.css');

export class NewGameRouter extends React.Component<React.Props<any>,any>{
    render(){
        let navbar = [
            {
                to : '/ng/nh',
                name : '新上架'
            },
            {
                to : '/ng/no',
                name : '新开服'
            }
        ];
        return(
            <div className="R__Modules G_NG_Modules">
                <div className="R__Header">
                    <Link to="/">
                        <div className="R__BackBtn"></div>
                    </Link>
                    新游
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