/*  存储图片资源 */
declare var require: any;
// 游戏标签(独家、活动、礼包、新服)
export const GAME_LABEL = {
    'sole': require('../../public/images/game_label_icon/icon_own.svg'),
    'action' : require('../../public/images/game_label_icon/icon_party.svg'),
    'gifts' : require('../../public/images/game_label_icon/icon_gift.svg'),
    'newServer' : require('../../public/images/game_label_icon/icon_newser.svg')
};
// 导航
export const ICON_MENU = {
    'games' : require('../../public/images/menu_icon/icon_games.png'),
    'yl' : require('../../public/images/menu_icon/icon_yl.png'),
    'bbs' : require('../../public/images/menu_icon/icon_bbs.png'),
    'hd' : require('../../public/images/menu_icon/icon_hd.svg'),
    'xx' : require('../../public/images/menu_icon/icon_xx.png'),
    'user' : require('../../public/images/menu_icon/icon_user.png')
}
type GL = typeof GAME_LABEL;
export type  GAME_LABEL_KEY = keyof GL;
// 首页--顶部导航
export const ICON_MENU_GAMES = {
    'newGames' : require('../../public/images/menu_icon/index_new.svg'),
    'rank' : require('../../public/images/menu_icon/index_top.svg'),
    'gift' : require('../../public/images/menu_icon/index_gift.svg'),
    'search' : require('../../public/images/menu_icon/index_search.svg')
}
// 新游
export const ICON_NEW_GAME = {
    'yy' : require('../../public/images/games/new/yiyue.svg'),
    'yycg' : require('../../public/images/games/new/yycg.svg')
}
// 排行榜
export const ICON_GAME_RANK = {
    'cup' : require('../../public/images/games/rank/icon_cup.svg'),
    'goldMedal' : require('../../public/images/games/rank/icon_one.svg'),
    'silverMedal' : require('../../public/images/games/rank/icon_two.svg'),
    'bronzeMedal' : require('../../public/images/games/rank/icon_three.svg')
};
// 游戏详情
export const GAMEINFO_IMG = {
    'bbs_icon' : require('../../public/images/game_label_icon/icon_bbs_3x.png'),
    'gift_icon' : require('../../public/images/game_label_icon/icon_lb_3x.png'),
    'back_btn' : require('../../public/images/games/btn_back.png')
}
// 玩家VIP等级
export const ICON_PLAYER_VIP = {
    '1' : require('../../public/images/games/rank/pic_vip_1.svg'),
    '2' : require('../../public/images/games/rank/pic_vip_2.svg'),
    '3' : require('../../public/images/games/rank/pic_vip_3.svg'),
    '4' : require('../../public/images/games/rank/pic_vip_4.svg'),
    '5' : require('../../public/images/games/rank/pic_vip_5.svg'),
    '6' : require('../../public/images/games/rank/pic_vip_6.svg'),
    '7' : require('../../public/images/games/rank/pic_vip_7.svg'),
    '8' : require('../../public/images/games/rank/pic_vip_8.svg')
}
type PLAYER_VIP = typeof ICON_PLAYER_VIP;
export type PLAYER_VIP_KEY = keyof PLAYER_VIP;
// 消息页面information
export const INFORMATION_IMG = {
    'government_icon' : require('../../public/images/information/icon_gfsx_3x.png'),
    'visitor_icon' : require('../../public/images/information/icon_zjlf_3x.png'),
    'attention_icon' : require('../../public/images/information/icon_gz_3x.png'),
    'comment_icon' : require('../../public/images/information/icon_zjpl_3x.png')
}
// 我的页面
export const MINE_IMG = {
    'sex_boy' : require('../../public/images/mine/icon_boy_ball_3x.png'),
    'sex_girl' : require('../../public/images/mine/icon_girl_ball_3x.png'),
    'QQ_talk':require('../../public/images/mine/QQ_talk.gif'),
    'phone_safly':require('../../public/images/mine/pic_phonesafly.jpg'),
    'mine_back':require('../../public/images/back_btn.png'),
    '1' : require('../../public/images/mine/icon_vip_1.png'),
    '2' : require('../../public/images/mine/icon_vip_2.png'),
    '3' : require('../../public/images/mine/icon_vip_3.png'),
    '4' : require('../../public/images/mine/icon_vip_4.png'),
    '5' : require('../../public/images/mine/icon_vip_5.png'),
    '6' : require('../../public/images/mine/icon_vip_6.png'),
    '7' : require('../../public/images/mine/icon_vip_7.png'),
    '8' : require('../../public/images/mine/icon_vip_8.png'),
    
}
// 消息
export const ICON_MESSAGE = {
    caller : require('../../public/images/discovery/message/icon_zjlf.png'),
    comment : require('../../public/images/discovery/message/icon_zjpl.png'),
    attention : require('../../public/images/discovery/message/icon_gz.png')
}
// 活动
export const ICON_ACTIVITY = {

}
// 登录
export const ICON_LOGIN = {
    logo : require('../../public/images/login/icon_daka.svg'),
    qq : require('../../public/images/login/icon_qq.svg'),
    wx : require('../../public/images/login/icon_wx.svg'),
    wb : require('../../public/images/login/icon_wb.svg'),
}
// 缺省图
export const DEFAULT_PIC = {
    no_game:require('../../public/images/default/pic_nogames.png'),
    no_gift:require('../../public/images/default/pic_nogift.png'),
    no_service:require('../../public/images/default/pic_noservice.png')
}
