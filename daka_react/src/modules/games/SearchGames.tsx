import * as React from 'react';
import {Link,hashHistory,browserHistory} from 'react-router';
import * as Utils from '../../common/Utils';
import * as OTF from '../../common/ObjectTypeFormat';
import {ListItemView} from '../../common/GameItem';
require('./Games.css');
let E = Utils.ElementUtile;
export class SearchGames extends React.Component<any,any>{
    constructor(){
        super();
        this.state = {search : ''};
    }
    componentDidMount(){
        search(this.props.params.key).then( data => {
            this.setState({search : data});
        });
    }
    componentWillReceiveProps(nextProps:any){
        let pathname = '/search',
            next = nextProps.location.pathname,
            props = this.props.location.pathname,
            param = nextProps.params.key || '';
        if(next.indexOf(pathname) > -1 || next.indexOf(pathname+'/') > -1){
            if(next != props){
                search(param).then( data => {
                    this.setState({search : data});
                });
            }
        }else{
            hashHistory.replace(pathname);
        }
        // console.info('********')
        // console.info(hashHistory);
        // if(nextProps.location.pathname != this.props.location.pathname){
        //     console.info(' pathname  不相等');
        //     hashHistory.replace(nextProps.location.pathname);
        // }else{
        //     console.info('相等');
        // }
        // hashHistory.replace('/games');
    }
    submit(event:any){
        event.preventDefault();
        console.info(event)
        // console.info(event.target)
        // console.info(this)
        let key = E.getTagVal('#tagSG_Search');
        if(!key){
            return;
        }else{
            // let path = `#/search/${key}`;
            let url = '/search/'+key;
            // hashHistory.replace('/search/'+key);
            this.props.router.replace(url);
            // hashHistory.push(url);
            // hashHistory.goForward();
            // hashHistory.transitionTo({
            //     pathname: url,
            //     search: '',
            //     query: '',
            //     state: '',
            //     action: 'REPLACE',
            //     key: ''
            // });
            // hashHistory.goForward();
            // this.props.location.pathname = url;
            // search(key).then( data => {
            //     this.setState({search : data});
            // });
        }
        //  hashHistory.push({
        //     pathname: '/search/' + key,
        //     query: {
        //         // name : '哈哈哈'
        //     },
        // })
    }
    render(){
        let search = this.state.search;
        return(<div className="R__Modules G_SG_Modules">
                <div className="R__Header">
                    <Link to="/">
                        <div className="R__BackBtn"></div>
                    </Link>
                    搜索
                </div>
                <div className="G_SG_SearchBox">
                    <form onSubmit={ event => {this.submit(event)}}>
                        <input id="tagSG_Search" type="search" placeholder="大家都在搜索 莽荒纪" className="G_SG_SearchInput"/>
                        <span className="G_SG_SearchIcon" onClick={ event => {this.submit(event)}}></span>
                    </form>
                </div>
                <div className="G_SG_Container">
                    {search}
                </div>
            </div>);
    }
}
async function search(key:string){
    let data = await Utils.Ajax({
        method : '',
        url : '/Api/Lib.Search',
        data : {key : key}
    });
    if(data.code == 1){
        let games:any;
        if(key && key != undefined){
            games = data.data.gameList.map((game : OTF.GameInfo,index : number) => {
                if(data.data.status == 'no'){
                    if(index >= 4){return false;}
                }
                return <ListItemView gameInfo={game}/>;
            });
            games = <div className="R__GV_Modules">
                    <div className="R__GV_Container">
                    {games}  
                    </div>
                </div>;
        }else{
            games = data.data.hot.map((game : OTF.GameInfo) => {
                return(<Link to={`/play/${game.game_id}`}><li>{game.game_name}</li></Link>);
            });
            games = <ul className="G_SG_HotSearch">{games}</ul>;
        }
        let history;
        if(data.data.history.length){
            let temp = data.data.history.map((key:any) => {
                return(<Link to=""><li>{key}</li></Link>);
            });
            history = <div className="G_SG_History" id="tagG_History">
                <div className="G_SG_Header">
                    历史记录：
                    <span className="G_SG_Clear" onClick={clear}>清空</span>
                </div>
                <div className="G_SG_HistoryView">
                    <ul>
                        {temp}
                    </ul>
                </div>
            </div>;
        }
        return(
            <div className="">
                {history} 
                <div className="G_SG_GameView">
                    <div className="G_SG_Header">热门搜索</div>
                    {games}
                </div>
            </div>);
    }else{
        
    }
    function clear(){
        E.setTagVal(E.getTag('#tagSG_Search'),'');
        E.getTag('#tagG_History').innerHTML = '';
        Utils.CustomAjax({
            url : '/Api/Lib/Search?cls=1',
            success : function(){
                hashHistory.replace('/search');
            }
        })
    }
}