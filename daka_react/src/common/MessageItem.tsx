import * as React from 'react';
import {Link} from 'react-router';
import * as OTF from './ObjectTypeFormat';
export class TagView extends React.Component<{tagView:OTF.MessageTagView},any>{
    render(){
        let tagInfo = this.props.tagView;
        return(
            <div className="D_Msg_TagView">
                <Link to={tagInfo.linkTo}>
                    <div className="D_Msg_Icon">
                        <img src={tagInfo.icon}/>
                    </div>
                    <div className="D_Msg_Title">{tagInfo.title}</div>
                    <div className="D_Msg_Slogon">{tagInfo.text}</div>
                </Link>
                <Link to={tagInfo.signLinkTo}>
                    <div className={tagInfo.signClass}>{tagInfo.signText}</div>
                </Link>
            </div>
        );
    }
}