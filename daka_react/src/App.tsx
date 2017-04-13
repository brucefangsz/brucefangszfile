import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Menu from './common/Menu';
import * as IA from './common/ImageAssets';

export class App extends React.Component<React.Props<any>, any>{

    // 构造函数
    constructor() {
        super();
    }

    render() {
        let navbar = [
            {
                name: <div><img src={IA.ICON_MENU.games} /><span>游戏</span></div>,
                to: '/games'
            },
            {
                name: <div><img src={IA.ICON_MENU.hd} /><span>活动</span></div>,
                to: '/activity'
            },
            // {
            //     name: <div><img src={IA.ICON_MENU.yl} /><span>有料</span></div>,
            //     to: '/joke'
            // },
            // {
            //     name: <div><img src={IA.ICON_MENU.bbs} /><span>论坛</span></div>,
            //     to: '/bbs'
            // },
            // {
            //     name: <div><img src={IA.ICON_MENU.xx} /><span>消息</span></div>,
            //     to: '/messages'
            // },
            {
                name: <div><img src={IA.ICON_MENU.user} /><span>我的</span></div>,
                to: '/mine'
            }
        ];
        return (
            <div>
                {this.props.children}
                <Menu.MenuView menus={navbar} />
            </div>
        );
    }
    
}