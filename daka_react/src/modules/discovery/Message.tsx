declare var require: any;
import * as React from 'react';
import {Link} from 'react-router';
require('./Message.css');
import * as Menu from '../../common/Menu';

export class Message extends React.Component<any,any>{
    render(){
        let navbar = [
            {
                name : '通知',
                to : '/meesge/notify'
            },
            {
                name : '关注',
                to : '/meesge/attention'
            }
        ]
        return(<div className="R__Modules D_Msg_Modules">
                <div className="R__Header">
                    <Link to="/discovery">
                        <div className="R__BackBtn"></div>
                    </Link>
                    消息
                </div>
                <div className="R__NavLabel">
                    <div className="R__NavLabel_Container">
                         <Menu.NavLabelView menus={navbar} class="D_Msg_NavLabels"/>
                    </div>
                </div>
                {this.props.children}
            </div>);
    }
}