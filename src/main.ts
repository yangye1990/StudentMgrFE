import { createApp } from 'vue' // 导入CreateApp的函数
import App from './App.vue'  // 引入App.vue -- 模块的主入口文件！
import ElementPlus from 'element-plus' // 引入ElementPlus
import 'element-plus/dist/index.css'  // 引入ElementPlus 的CSS
import router from './router' // 导入router文件
import * as Icons from '@element-plus/icons-vue' // 导入所有的icon的图标
import store from './store'  // 导入创建的store对象
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 导入ElmentPlus中文语言包
//import api from './api' // 导入所有数据集的api

// 创建一个app
const app = createApp(App)

// 把api挂载到全局的属性
//app.config.globalProperties.api = api

app.use(store).use(router).use(ElementPlus, {
    locale: zhCn,
}).mount('#app')  // 使用vue中的CreateApp方法创建一个app.vue的组件，并放置到index.html的id为app的div中


// 遍历所有的icon,把每个icon图标以组件的方式加载到app中
Object.keys(Icons).forEach((key) =>{
    app.component(key, Icons[key as keyof typeof Icons])
})

