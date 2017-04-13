declare var require: any;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory,IndexRoute,Redirect,IndexRedirect } from 'react-router';

import {App} from './App';
import {Games} from './modules/games/Games';
import {GameInfo} from './modules/games/GameInfo';
import {GameRank} from './modules/games/Routet_GameRank';
import {HotGameRank} from './modules/games/HotGameRank';
import {NewGameRank} from './modules/games/NewGameRank';
import {RichRank} from './modules/games/RichRank';
// 礼包
import {GiftRouter} from './modules/games/Router_Gift';
import {GiftList} from './modules/games/GiftCenter';
import {GiftListMein} from './modules/games/GiftCenterMein';

import {SearchGames} from  './modules/games/SearchGames';
import {PlayGame} from './modules/games/PlayGame';

import {Discovery} from './modules/discovery/Discovery';
import {Activity} from './modules/discovery/Activity';
import {ActivityInfo} from './modules/discovery/ActivityInfo';
import {Message} from './modules/discovery/Message';
import {Notify} from './modules/discovery/Notify';
// 我的
import {Mine} from './modules/mine/Mine'; 
import {Problem} from './modules/mine/Problemfeedback';
import {MineGiftList} from './modules/mine/MineGiftList';
import {MineSafly} from './modules/mine/MineSafly';
import {MinePlayed} from './modules/mine/MinePlayed';

import {NewGameRouter} from './modules/games/Router_NewGame';
import {AllGamesRouter} from './modules/games/Router_AllGames';
import {NewHope} from './modules/games/NewHope';
import {NewOpen} from './modules/games/NewOpen';

import {Me} from './iscroll';
require('./app.css');

class Main extends React.Component<any, any> {
  render(){
    return(
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Games}/>
          <Route path="/games" component={Games}></Route>
          <Route path="/activity" component={Activity}>
          </Route>
          <Route path="/mine" component={Mine}></Route>  
        </Route>
        {/*游戏--新游*/}
        <Route path="/ng" component={NewGameRouter}>
          <IndexRedirect to="/ng/nh" />
          <Route path="/ng/nh" component={NewHope}></Route>
          <Route path="/ng/no" component={NewOpen}></Route>
        </Route>
        {/*游戏--排行*/}
        <Route path="/gr" component={GameRank}>
          <IndexRedirect to="/gr/hot" />
          <Route path="/gr/hot" component={HotGameRank}></Route>
          <Route path="/gr/new" component={NewGameRank}></Route>
          <Route path="/gr/rich" component={RichRank}></Route>
        </Route>
        {/*游戏--礼包*/}
        <Route path="/gc" component={GiftRouter}>
          <IndexRedirect to="/gc/gift" />
          <Route path="/gc/gift" component={GiftList}></Route>
          <Route path="/gc/mein" component={GiftListMein}></Route>
        </Route>
        {/*精品推荐--全部游戏*/}
        <Route path="/games/ag" component={AllGamesRouter}>
          <IndexRedirect to="/games/ag/click" />
          <Route path="/games/ag/click"></Route>
          <Route path="/games/ag/develop"></Route>
          <Route path="/games/ag/arpg"></Route>
          <Route path="/games/ag/chess"></Route>
        </Route>
        {/*游戏详情*/}
        <Route path="/gameInfo/:id" component={GameInfo}></Route>
        {/*游戏--搜索*/}
        <Route path="/search" component={SearchGames}></Route>
        <Route path="/search(/:key)" component={SearchGames}></Route>
        {/*游戏--Play*/}
        <Route path="/play/:id" component={PlayGame}></Route>
        {/*活动详情*/}
        <Route path="/activity/:id" component={ActivityInfo}></Route>
        {/* 我的 */}
        <Route path="/problemfeedback" component={Problem}></Route>
        <Route path="/MineGiftLists" component={MineGiftList}></Route>
        <Route path="/MineSafly" component={MineSafly}></Route>
        <Route path="/mineplayed" component={MinePlayed}></Route>
        {/*消息*/}
        <Route path="/message" component={Message}>
          <IndexRedirect to="/meesge/notify"/>
          <Route path="/meesge/notify" component={Notify}></Route>
          <Route path="/meesge/attention"></Route>
        </Route>
        <Route path='/me' component={Me}></Route>
      </Router>
    );
  }
}

ReactDOM.render(<Main/>,document.getElementById('app'));