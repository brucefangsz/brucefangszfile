declare var require: any;
import * as React from 'react';
import {Link} from 'react-router';
require('./Discovery.css');


export class Discovery extends React.Component<any,any>{
    render(){
        let navbar = [
            {
                name : '精华',
                to : '/discovery/essence'
            },
            {
                name : '论坛',
                to : '/discovery/bbs'
            }
        ];
        let elements = navbar.map((tag) => {
            return(
                <Link to={tag.to} key={tag.name} activeClassName="on">
                    <span>{tag.name}</span>
                </Link>
                );
        });
        return(
            <div className="R__Modules">
                <div className="D_Navbar_Modules">
                    <div className="D_Navbar_Search"></div>
                    <div className="D_Navbar_Tag">
                        {elements}
                    </div>
                    <Link to="/message">
                        <div className="D_Navbar_Message"></div>
                    </Link>
                </div>
                <div className="R__Container">
                    {this.props.children}    
                </div>
            </div>
            );
    }
}