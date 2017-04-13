/*
    公共组件
*/

import * as React from 'react';

//loading 组件
export class Loadding extends React.Component<any, any> {
    render(){
        return (
            <div className="m-loadding"><img src="http://image.egret.com/img1000/2017/03/144809153073.gif"/></div>
        );
    }
}