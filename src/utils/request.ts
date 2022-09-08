//导入
import axios from "axios";
import { ElMessage } from "element-plus";
import {tooltipV2ContentKey} from "element-plus";
//loading
import { openLoading, closeLoading } from "./loading";


// 创建一个axios的APP
const request = axios.create({
    baseURL:'http://10.208.95.137:9000/api/v1/',
    //baseURL: 'http://127.0.0.1:9000/api/v1/',//本地
    //baseURL:'http://10.208.24.233:9000/api/v1/',//主机
    // baseURL:'http://570ebcf6.nat123.fun:20137/api/v1/',
    timeout: 500000
})




// === 请求拦截器（request）======
request.interceptors.request.use(
    (config: any) => {
        // 获取本地loalstorage中的token
        let token = localStorage.getItem('token')
        // 判断是否有token
        if (token) {
            config.headers.common['token'] = token;
        }
        // 返回return
        return config
    },
    (error: any) => {
        Promise.reject(error);
    }
)


// ==== 响应拦截器(response)=====
request.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        openLoading()
        if (error && error.response) {
            closeLoading()
            error.data = {};
            switch (error.response.status) {
                case 400:
                    error.data.msg = '错误请求';
                    ElMessage.error(error.data.msg)
                    break
                case 401:
                    error.data.msg = '未授权，请重新登录';
                    ElMessage.error(error.data.msg)
                    break
                case 403:
                    error.data.msg = '拒绝访问';
                    ElMessage.error(error.data.msg)
                    break
                case 404:
                    error.data.msg = '请求错误,未找到该资源';
                    ElMessage.error(error.data.msg)
                    break
                case 405:
                    error.data.msg = '请求方法未允许';
                    ElMessage.error(error.data.msg)
                    break
                case 408:
                    error.data.msg = '请求超时';
                    ElMessage.error(error.data.msg)
                    break
                case 500:
                    error.data.msg = '服务器端出错';
                    ElMessage.error(error.data.msg)
                    break
                case 501:
                    error.data.msg = '网络未实现';
                    ElMessage.error(error.data.msg)
                    break
                case 502:
                    error.data.msg = '网络错误';
                    ElMessage.error(error.data.msg)
                    break
                case 503:
                    error.data.msg = '服务不可用';
                    ElMessage.error(error.data.msg)
                    break
                case 504:
                    error.data.msg = '网络超时';
                    ElMessage.error(error.data.msg)
                    break
                case 505:
                    error.data.msg = 'http版本不支持该请求';
                    ElMessage.error(error.data.msg)
                    break
                default:
                    error.data.msg = `连接错误${error.response.status}`;
                    ElMessage.error(error.data.msg)
            }
        } else {
            error.data.msg = "连接到服务器失败";
            ElMessage.error(error.data.msg)
        }
        return Promise.reject(error);
    }
);


//暴露
export default request
