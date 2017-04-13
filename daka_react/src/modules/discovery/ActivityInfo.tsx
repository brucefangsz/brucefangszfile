import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as OTF from '../../common/ObjectTypeFormat';
import { Link } from 'react-router';
require('./Discovery.css');
export class ActivityInfo extends React.Component<any, any>{
    constructor() {
        super();
        this.state = {
            activityList: ''
        };
    }
    componentDidMount() {
        console.log('a');
        ActivityDetails(this.props.params.id).then(data => {
            // console.log('b');
            this.setState({ activityList: data });
        });
    }
    render() {
        let activityList = this.state.activityList;
        return (<div>{activityList}</div>)
    }
}
async function ActivityDetails(id: any) {
    let ActId = id, Html, HtmlUser;
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/Lib/Activity.details',
        data: { actId: ActId }
    })
    if (data.code == '1' && data.data) {
        Html = getDetails(data.data);
        HtmlUser = getUser(data.data);
    }
    return (
        <div className="R__Modules A_Info">
            <div className="R__Header">
                <Link to="/activity">
                    <div className="R__BackBtn"></div>
                </Link>
                活动详情
                </div>
            {HtmlUser}
            {Html}
        </div>
    )
}
// 获取用户信息
function getUser(a: OTF.ActivityDetails) {
    let userHtml = a.praiseList;
    let us = userHtml[0];
    console.log(typeof (us))
    let userH:any= '';
    if (typeof us == 'object') {
        userH =
        <div className="A_Info_Title">
           <Link to=""><img src={us.avatar} className="A_U_Icon" alt="" /></Link>
            <span className="A_U_Name">{us.name ? us.name : us.nickname}</span>
            <div className="A_Activity_Date">
                <span>{Utils.conversionTime(a.createtime)}</span>
                <div>{a.click}</div>
            </div>
        </div>
    }
    return (
        <div>{userH}</div>
        
    )
}
// 获取活动内容
function getDetails(a: OTF.ActivityDetails) {
    let bodyHtml = a.body;
    return (
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} className="A_Info_Body"></div>
    )
}   