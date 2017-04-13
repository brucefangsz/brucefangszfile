// Ajax请求信息
export type AjaxSetting = {
    method: string,
    url: string,
    data: any
}
// Ajax返回信息
export type AjaxResponse = {
    code: number,
    msg: string,
    data: any
}
// 玩家信息
export type PlayerInfo = {
    "upg_id": string,
    "uid": string,
    "nickname": string,
    "avatar": string,
    "username": string,
    "email": string,
    "mobile": string,
    "sex": string,
    "last_play_time": string,
    "createtime": string,
    "last_logintime": string,
    "pro_name": any,
    "city_name": any,
    "age": number,
    "vip": any,
    games: GameInfo[],
    // 玩家信息列表下标
    index: number,
}
// 游戏信息
export type GameInfo = {
    game_id: string,
    game_name: string,
    gameinfo_icon: string,
    gameinfo_describe: string,
    gameinfo_short_description: string,
    game_testing_type: string,      // 1:不删档测试 ；2:删档测试
    dispose_datetime: string,
    labels: string[],
    // 当前游戏所属分类
    category: string,
    // 首页精彩推荐--礼包标签显示状态
    gifts: number,
    // 游戏数组中游戏下标
    index: number,
    elementIndex : number,
    // 玩游戏路径
    show_playgame_url: string,
    service_name: string,
    open_time_date: string,
    //开服信息id
    gos_id: string,
    is_bespoke: string,
    giftList: Array<gift>,
    giftMine: any,
    isOk : any,             // 0:未预约;1:已预约
    game_show_btn : any,    // 游戏列表右侧按钮类型 默认不传显示进入 （2:显示预约）
    game_show_about : JSX.Element,  //游戏介绍 默认为游戏描述 （2:显示自定义内容）
    game_callback : any,    // 游戏callback
}

export type gift = {
    id: string,
    ggc_id: string,
    type: string,
    name: string,
    game_id: string,
    chan_id: string,
    unit_price: string,
    content: string,
    note: string,
    code:string,
    total: string,
    used: string,
    status: string,
    show_starttime: string,
    show_endtime: string,
    starttime: string,
    endtime: string,
    createtime: string,
    updatetime: string,
    rate_used: number,
    gitMine: any;

};
// 活动列表
export type Activity = {
    act_id: string,
    game_id: string,
    title: string,
    banner: string,
    starttime: string,
    endtime: string,
    click: string,
    cTitle: string,
    status: number;
}
// 活动详情
export type ActivityDetails = {
    act_id: string,
    game_id: string,
    title: string,
    type: string,
    banner: string,
    body: string,
    is_comment: string,
    click: string,
    good: string,
    tread: string,
    replys: string,
    sort: string,
    status: string,
    is_selected: string,
    starttime: string,
    endtime: string,
    createtime: string,
    isOk: number,
    praiseList: PraiseList[],
    commentList: CommentList[];
}
// 玩家信息；
export type PraiseList = {
    egret_id: string,
    type: string,
    chan_uid: string,
    chan_id: string,
    name: string,
    mobile: string,
    email: string,
    salt: string,
    password: string,
    nickname: string,
    avatar: string
}
// 评论信息
export type CommentList = {
    c_id: string,
    type: string,
    type_id: string,
    egret_id: string,
    p_egret_id: string,
    status: string,
    p_c_id: string,
    p_master_id: string,
    content: string,
    createtime: string,
    lists: commentListChild[],
    userName: string,
    avatar: string
}
// 子评论
export type commentListChild = {
    c_id: string
    type: string,
    type_id: string,
    egret_id: string,
    p_egret_id: string,
    status: string,
    p_c_id: string,
    p_master_id: string,
    content: string,
    createtime: string,
    userName: string,
    avatar: string,
    pUserName: string,
    pAvatar: string
}
// 论坛信息
// export type BbsInfo = {

//     game_id : string
// }
// 小图标
export type SmallIconView = {
    class: string,
    icon_url: string,
    gId:string
}
// Banner
export type BannerInfo = {
    ad_url: string,
    ad_img: string,
    game_id : string,
}
// 消息--列表菜单
export type MessageTagView = {
    linkTo: string,
    icon: string,
    title: JSX.Element,
    text: JSX.Element,
    signClass: string,
    signText: string,
    signLinkTo: string
}
