import * as React from 'react';
import {hashHistory} from 'react-router';
import * as Utils from '../../common/Utils';
let C = Utils.Control,E = Utils.ElementUtile;
export class PlayGame extends React.Component<any,any>{
    constructor(){
        super();
        this.state = {gameUrl : ''}
    }
    componentDidMount(){
        this.GetGameUrl().then( data => {
            this.setState({gameUrl : data});
        });
    }
    componentWillReceiveProps(nextProps:any){
        let pathname = '/play/',
            next = nextProps.location.pathname,
            props = this.props.location.pathname;
        if(next.indexOf(pathname) > -1 ){
            if(next != props){
                console.info('同级目录 参数不相等')
                this.GetGameUrl().then( data => {
                    this.setState({gameUrl : data});
                });
            }
        }else{
            Utils.SDK.clear();
            hashHistory.replace(pathname);
        }
    }
    componentWillUnmount(){
        E.setCss(E.getTag('#tagDakaMask'),{background : 'rgba(0,0,0,0.8)'});
        Utils.SDK.clear();
    }
    async GetGameUrl(){
        if(C.loginState()){
            Utils.SDK.clear();
            let data = await Utils.Ajax({
                method : '',
                url : '/Api/lib/game.realUrl',
                data : {gameId : this.props.params.id}
            });
            if(data.code == '1'){
                return data.data;
            }
        }else{
            Utils.CustomAjax({
                url : "/Api/Lib/Game.info",
                data : {gameId : this.props.params.id},
                success : function(data:any){
                    let img = data.data.gameinfo_publicity_pic[0];
                    E.setCss(E.getTag('#tagDakaMask'),{
                        background : "url("+img+") no-repeat",
                        backgroundSize : '100% 100%'
                    });
                    Utils.SDK.login('','');
                }
            })
        }
    }
    render(){
        return(
        <div className="G_PG_Play_Shade">
            <div className="G_PG_Play">
                <iframe className="G_PG_Play_Iframe" src={this.state.gameUrl}></iframe>
            </div>
        </div>
        );
    }
}