import * as React from 'react';
import {Link} from 'react-router';
import * as Utils from '../../common/Utils';
import * as OTF from '../../common/ObjectTypeFormat';
import * as GameItem from '../../common/GameItem';

export class NewGameRank extends React.Component<any,any>{
    constructor(){
        super();
        this.state = {newGame : ''}
    }
    componentDidMount(){
        NewGameView().then(data => {
            this.setState({newGame : data});
        });
    }
    render(){
        return(<div>{this.state.newGame}</div>);
    }
}
async function NewGameView(){
    let data = await Utils.Ajax({
        method : '',
        url : '/Api/Lib/Game.newList',
        data : {}
    });
    if(data.code == 1){
        let elements = data.data.map((gi:OTF.GameInfo,num:number) => {
            gi.index = ++num;
            return(<GameItem.ListItemView gameInfo={gi}/>);
        });
        return(<div>{elements}</div>)
    }
}