import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as OTF from '../../common/ObjectTypeFormat';
import { Link } from 'react-router';
require('./Discovery.css');
export class Activity extends React.Component<any, any>{
    constructor() {
        super();
        this.state = {
            activityList: ''
        };
    }
    componentDidMount() {
        ActivityList().then(data => {
            this.setState({ activityList: data });
        });
    }
    render() {
        let activityList = this.state.activityList;
        return (<div className="R__Modules A_Activity">
            <div className="A_Title">官方活动</div>
            {activityList}
        </div>);
    }
}
async function ActivityList() {
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/Lib/Activity.lists',
        data: {}
    });
    let Html: any;
    if (data.code == '1' && data.code) {
        Html = getList(data.data);
    }
    return (
        <div className="A_Outer">{Html}</div>
    )

}
function getList(a: any) {
    let readyToGift = a.map((b: OTF.Activity) => {
        return (
            <Link to={`/activity/${b.act_id}`}>
            <div className="A_Contant">
                <img src={b.banner} alt="" />
                <div>{b.title}</div>
                <span>
                    {b.status==1?<span className="A_Start">{b.cTitle}🔥</span>:<span className="A_End">{b.cTitle}</span>}
                    <span>{b.click}人参与</span>
                </span>
            </div>
            </Link>
        )
    })
    return (
        <div>{readyToGift}</div>
    )

}







