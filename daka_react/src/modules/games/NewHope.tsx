import * as React from 'react';
import * as Utils from '../../common/Utils';
import * as GameItem from '../../common/GameItem';
import * as OTF from '../../common/ObjectTypeFormat';
import { Link } from 'react-router';
const ajaxUrl = Utils.GC_AJAX_URL;
export class NewHope extends React.Component<any, any>{
    constructor() {
        super();
        this.state = {
            NewHope: ''
        };
    }
    componentDidMount() {
        NewHopeList().then(data => {
            this.setState({ NewHope: data });
        });
    }
    render() {
        return (<div className="G_NG_Container">{this.state.NewHope}</div>);
    }
}
async function NewHopeList() {
    let data = await Utils.Ajax({
        method: '',
        url: '/Api/Lib/Game.newGame',
        data: {}
    });
    if (data.code == 1) {
        let elements = data.data.map((gi : OTF.GameInfo) => {
                gi.game_show_about = <div><span className="B-fontL">
                    {gi.dispose_datetime.substring(0,10)}
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="B-fontGr">{gi.game_testing_type == '1' ? '不删档测试' : '删档测试'}</span></div>;

            return (<GameItem.ListItemView gameInfo={gi} key={gi.game_id} />);
        });
        return (
            <div className="R__GV_Modules"><div className="R__GV_Container">{elements}</div></div>
        );
    }
}