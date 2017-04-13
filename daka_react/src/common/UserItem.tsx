/*
    用户列表
*/

import * as React from 'react';
import * as Utils from './Utils';
import * as OTF from './ObjectTypeFormat';

import {Link} from 'react-router';

// 消息内面玩家列表 {avatar,nickname,num,time,msg,url,url2}
export class MessageSingle extends React.Component<any, any> {
    render() {
        let data = this.props.data;
        return(
            <div className="">
                <div className="">
                    <a href={data.url}>
                        <img src={data.avatar} />
                        {data.num > 0 ? <em className="">{data.num}</em> : ''}
                    </a>
                </div>
                <a className="" href={data.url2}>
                    <div className="">
                        {data.nickname}
                        {data.time ? <span className="">{data.time}</span> : ''}
                    </div>
                    <span className="">{data.msg}</span>
                </a>
            </div>
        );
    }
}

