//导入
import request from "../utils/request";
// 通过面向对象--->类
export default class APIBase {
    //定义属性
    public name: string;

    //构造器2
    constructor(name:string) {
        this.name = name
    }

    // 获取所有
    public getAll = (params?:any,) =>{
        //request请求
        return request({
            method:'get',
            url: `${this.name}/`,
            params
        })
    }
    // 获取一个
    public getOne = (id?:any) =>{
        //request请求
        return request({
            method:'get',
            url: `${this.name}/${id}/`,
        })
    }
    // 添加
    public add = (data:any) =>{
        //request请求
        return request({
            method:'post',
            url: `${this.name}/`,
            data
        })
    }
    // 添加
    public edit = (id:any,data:any) =>{
        //request请求
        return request({
            method:'put',
            url: `${this.name}/${id}/`,
            data
        })
    }
    // 添加
    public del = (id:any) =>{
        //request请求
        return request({
            method:'delete',
            url: `${this.name}/${id}/`,
        })
    }
}
