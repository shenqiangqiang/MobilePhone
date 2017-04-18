import Vue from 'vue';
import Router from 'vue-router';

// 注册Router模块
Vue.use(Router);

// 加载页面组件
import Amappage from '../pages/Amappage/index.vue';
import Audiopage from '../pages/Audiopage/index.vue';
import Notfountpage from '../pages/Notfountpage/index.vue';


export default new Router({
    routes: [
    {
        // 首次进入地图监听页面
        path: '/',
        component: Amappage
    },
    {
        // 地图监听页面
    	name: 'Amappage',
        path: '/Amappage',
        component: Amappage
    },
    {
        // 音频对比页面
    	name: 'Audiopage',
        path: '/Audiopage',
        component: Audiopage
    },
    {
        // 未找到，404页面
        name: '404',
        path: '*',
        component: Notfountpage
    }

    ]
})
