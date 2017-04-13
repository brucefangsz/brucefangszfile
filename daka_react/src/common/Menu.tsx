/*
    导航菜单
*/ 

import * as React from 'react';
import {Link} from 'react-router';

type MenuViewProps = {
    menus : {
        to : string,
        name : JSX.Element
    }[]
}
type NavLabelProps = {
    menus : {
        to : string,
        name : string
    }[],
    class : string
}
// 公共导航
export class MenuView extends React.Component<MenuViewProps,any>{
    render(){
        let menus = this.props.menus;
        let elements = menus.map((menu,index:number) => {
            return <li key={menu.to}><Link to={menu.to} activeClassName="on">{menu.name}</Link></li>;
        });
        return(<div className="R__Nav_Modules"><ul>{elements}</ul></div>);
    }
}
// 首页顶部导航
export class TopMenuView extends React.Component<MenuViewProps,any>{
    render(){
        let menus = this.props.menus;
        let elements = menus.map((tag,index:number) => {
            return(
                <li key={tag.to}>
                    <Link to={tag.to}>
                    {tag.name}
                    </Link>
                </li>);
        });
        return(<div className="R__SmallNav_Container"><ul>{elements}</ul></div>);
    }
}
// 标签切换导航
export class NavLabelView extends React.Component<NavLabelProps,any>{
    render(){
        let menus = this.props.menus;
        let className = "R__NavLabel_Labels R__NavLabel_Tag " + this.props.class;
        let elements = menus.map((tag) => {
            return(
                <Link to={tag.to} key={tag.name} activeClassName="R__NavLabel_Checked">
                    <div className={className}>
                        {tag.name}
                    </div>
                </Link>);
        });
        return <div>{elements}</div>;
    }
}
// 排行版导航
export class GameRankNavView extends React.Component<any,any>{
    render(){
        let menus = this.props.menus;
        let elements = menus.map((tag:any) => {
            return(
                <Link to={tag.to} key={tag.name} activeClassName="G_GR_NavLabel_Checked">
                    <li className="G_GR_NavLabel_Tag">{tag.name}</li>
                </Link>
            );
        });
        return(<ul>{elements}</ul>);
    }
}