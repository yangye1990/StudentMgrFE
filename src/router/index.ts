// 导入组件
import Vue from 'vue'
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Layout from '../layout/Index.vue'
// 创建路由匹配的数据集合
const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     component: Index
    // },
    //首页
    {
        path:'/',
        component: Layout,
        name: "Layout",
        redirect: '/dashboard',
        children:[
            {
                path: '/dashboard',
                component: () => import('../views/index/Dshboard.vue'),
                name: "Dshboard",
                meta:{
                    title:"首页"
                }
            }
        ]
    },
    // 查询数据库
    {
        path:'/select',
        component: Layout,
        name: 'Select',
        meta:{
            title:"数据库查询"
        },
        children:[
            {
                path:'/select/user',
                component: () => import('../views/select/User.vue'),
                name: 'User',
                meta:{
                    title:"查询用户中心表"
                },
            } ,
            {
                path:'/select/ext_trace_source',
                component: () => import('../views/select/ExtTraceSource.vue'),
                name: 'ExtTraceSource',
                meta:{
                    title:"查询会员中心表"
                },
            } ,
            {
                path:'/select/userfocus_uuid',
                component: () => import('../views/select/UserfocusUuid.vue'),
                name: 'UserfocusUuid',
                meta:{
                    title:"查询关注表"
                },
            } ,
            {
                path:'/select/sun_usertag_subscribe',
                component: () => import('../views/select/SunUsertagSubscribe.vue'),
                name: 'SunUsertagSubscribe',
                meta:{
                    title:"查询订阅表"
                },
            } ,
            {
                path:'/select/consult_yhuser',
                component: () => import('../views/select/ConsultYhuser.vue'),
                name: 'ConsultYhuser',
                meta:{
                    title:"查询优惠表"
                },
            } ,
            {
                path:'/select/dongtai_user',
                component: () => import('../views/select/DongtaiUser.vue'),
                name: 'DongtaiUser',
                meta:{
                    title:"查询动态优惠表"
                },
            } ,
            {
                path:'/select/yc_t_ticket_order',
                component: () => import('../views/select/YcTicketOrder.vue'),
                name: 'YcTicketOrder',
                meta:{
                    title:"查询车票订单ID"
                },
            } ,
            {
                path:'/select/yc_t_ticket_order_lose',
                component: () => import('../views/select/YcTicketOrderLose.vue'),
                name: 'YcTicketOrderLose',
                meta:{
                    title:"查询车票表"
                },
            } ,
            {
                path:'/select/etc_shop_goods_lz',
                component: () => import('../views/select/EtcShopGoodsLz.vue'),
                name: 'EtcShopGoodsLz',
                meta:{
                    title:"查询商品留资表"
                },
            } ,
            {
                path:'/select/virtualnum',
                component: () => import('../views/select/Virtualnum.vue'),
                name: 'Virtualnum',
                meta:{
                    title:"查询虚拟号绑定"
                },
            } ,
            {
                path:'/select/virtualnumcalldata',
                component: () => import('../views/select/VirtualnumCallData.vue'),
                name: 'VirtualnumCallData',
                meta:{
                    title:"查询虚拟电话记录"
                },
            } ,
            {
                path:'/select/t_leju_sdkinfo',
                component: () => import('../views/select/TLejuSdkinfo.vue'),
                name: 'TLejuSdkinfo',
                meta:{
                    title:"查询大数据SDK表"
                },
            } ,
            {
                path:'/select/t_api_track_id',
                component: () => import('../views/select/TApiTrackId.vue'),
                name: 'TApiTrackId',
                meta:{
                    title:"查询大数据API表"
                },
            } ,
        ]
    },
    // 内容池查询
    {
        path:'/contentspooling',
        component: Layout,
        name: 'contentspooling',
        meta:{
            title:"内容池查询"
        },
        children:[
            {
                path:'/contentspooling/official',
                component: () => import('../views/spooling/OfficialContent.vue'),
                name: 'official',
                meta:{
                    title:"正式线内容池"
                },
            } ,
            {
                path:'/contentspooling/test',
                component: () => import('../views/spooling/TestContent.vue'),
                name: 'test',
                meta:{
                    title:"测试线内容池"
                },
            }
        ]},
    // 楼盘热力值
    {
        path:'/heat',
        component: Layout,
        name: 'Reatscore',
        meta:{
            title:"楼盘热力值"
        },
        children:[
            {
                path:'/heat/score_official',
                component: () => import('../views/reatscore/ReatScoreOfficial.vue'),
                name: 'ScoreOfficial',
                meta:{
                    title:"查询正式线热力值"
                },
            } ,
            {
                path:'/heat/score_test',
                component: () => import('../views/reatscore/ReatScoreTest.vue'),
                name: 'ScoreTest',
                meta:{
                    title:"查询测式线热力值"
                },
            }
        ]
    },
    // 通讯中台虚拟号
    {
        path:'/virtual',
        component: Layout,
        name: 'Virtual',
        meta:{
            title:"通讯中台-虚拟号"
        },
        children:[
            {
                path:'/virtual/tm_axn',
                component: () => import('../views/virtuals/tm_axn.vue'),
                name: 'Tm_AxN',
                meta:{
                    title:"天猫AXN"
                },
            } ,
            {
                path:'/virtual/tm_axb',
                component: () => import('../views/virtuals/tm_axb.vue'),
                name: 'Tm_AxB',
                meta:{
                    title:"天猫AXB"
                },
            } ,
            {
                path:'/virtual/xf_axn',
                component: () => import('../views/virtuals/xf_axn.vue'),
                name: 'Xf_AxN',
                meta:{
                    title:"新房AXN"
                },
            } ,
            {
                path:'/virtual/laike_ali',
                component: () => import('../views/virtuals/laike_axb.vue'),
                name: 'LaiKe_AxB',
                meta:{
                    title:"来客AXB"
                },
            } ,
        ]
    },


]

//创建对象
const router = createRouter({
    history:createWebHashHistory(),
    routes,
})
//暴露
export default router
