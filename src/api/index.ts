// 导入基础的类
import APIBase from './apibase'


//实例化对象(对应后台URL)
let user = new APIBase('user')
let ext_trace_source = new APIBase('ext_trace_source')
let userfocus_uuid = new APIBase('userfocus_uuid')
let sun_usertag_subscribe = new APIBase('sun_usertag_subscribe')
let consult_yhuser = new APIBase('consult_yhuser')
let dongtai_user = new APIBase('dongtai_user')
let yc_t_ticket_order = new APIBase('yc_t_ticket_order')
let yc_t_ticket_order_lose = new APIBase('yc_t_ticket_order_lose')
let etc_shop_goods_lz = new APIBase('etc_shop_goods_lz')
let virtualnum = new APIBase('virtualnum')
let virtualnum_call_data = new APIBase('virtualnum_call_data')
let t_leju_sdkinfo = new APIBase('t_leju_sdkinfo')
let t_api_track_id = new APIBase('t_api_track_id')
let tb_project = new APIBase('tb_project')
let page = new APIBase('page')
let number = new APIBase('number')
let house = new APIBase('house')
let eqname = new APIBase('eqname')
let reat_score = new APIBase('reat_score')
let reat_select = new APIBase('reat_select')
let virtualnumsaxn = new APIBase('virtualnumsaxn')
let virtualnumsaxb = new APIBase('virtualnumsaxb')
let virtualnumsxfaxn = new APIBase('virtualnumsxfaxn')
let virtualnumslaikeaxb = new APIBase('virtualnumslaikeaxb')
let loupankuhoutaixpath = new APIBase('loupankuhoutaixpath')
let loupankuhoutaidata = new APIBase('loupankuhoutaidata')
let loupankuhoutaiofficialxpath = new APIBase('loupankuhoutaiofficialxpath')
let loupankuhoutaiofficialdata = new APIBase('loupankuhoutaiofficialdata')
let tuwenzhibotestxpath = new APIBase('tuwenzhibotestxpath')
let tuwenzhibotestdata = new APIBase('tuwenzhibotestdata')
let tuwenzhiboofficialdata = new APIBase('tuwenzhiboofficialdata')
let tuwenzhiboofficialxpath = new APIBase('tuwenzhiboofficialxpath')

//封装并发布
export default {
    //数据库查询
    user, //查询用户中心
    ext_trace_source,//查询会员中心
    userfocus_uuid,//查询关注表
    sun_usertag_subscribe,//查询订阅表
    consult_yhuser,//查询优惠表
    dongtai_user,//查询动态优惠表
    yc_t_ticket_order,// 查询车票订单ID
    yc_t_ticket_order_lose, //查询车票表
    etc_shop_goods_lz, //查询商品留资表
    virtualnum,// 查询虚拟号绑定关系表
    virtualnum_call_data, //查询虚拟号通讯记录
    t_leju_sdkinfo, //查询大数据SDK表
    t_api_track_id,//查询大数据API表
    //内容池查询
    tb_project,//查询项目名称
    page,//查询页数
    number,//查询条数
    house,//查询house
    eqname,//查询条数
    //楼盘热力值
    reat_score,//查询条数
    reat_select,
    //通讯中台-虚拟号
    virtualnumsaxn,//虚拟号天猫axn
    virtualnumsaxb,//虚拟号天猫axb
    virtualnumsxfaxn,//虚拟号新房axn
    virtualnumslaikeaxb,//虚拟号来客axb
    //楼盘库后台-测试线
    loupankuhoutaixpath,//定位元素
    loupankuhoutaidata,//创建楼盘
    //楼盘库后台-正式线
    loupankuhoutaiofficialxpath,//定位元素
    loupankuhoutaiofficialdata,//创建楼盘
    // 图文直播-测试线
    tuwenzhibotestxpath,//定位元素
    tuwenzhibotestdata,//创建直播
    // 图文直播-正式线
    tuwenzhiboofficialxpath,//定位元素
    tuwenzhiboofficialdata,//创建直播
}
