import {ElLoading} from 'element-plus';

let loading: { close: () => void; };

function openLoading() {
    loading = ElLoading.service({
        body: true,
        lock: true,
        text: '拼命加载中......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
    })
}

function closeLoading() {
    loading.close();
}

export {
    openLoading,
    closeLoading
}
