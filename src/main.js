// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* 全局配置文件 */
import config from '../config/index.js';
/* 引用vue2模块 */
import Vue from 'vue';
/* 引用vueTap插件 - 解决手机端touch延迟300ms问题 */
import vueTap from 'v-tap';
/* 引用muse-ui插件 */
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css'; // 插件基本样式
import 'muse-ui/dist/theme-teal.css'; // 插件基主题样式
/* 引用AMap地图插件 */
import AMap from 'vue-amap';
/* 引用事件传递插件 */
import VueEvents from 'vue-events'
/* 引用vue-resource进行ajax操作 */
// import axios from 'axios'; // axios - for ajax connect
// import VueAxios from 'vue-axios'; // axios - for ajax connect
import vueResource from 'vue-resource';
/* 引用vue-socket进行socket操作 */
import VueWebsocket from "vue-websocket";
/* 页面主入口 */
import App from './App';
/* 单页面应用路由配置 */
import router from './router';
/*引入vuex*/
import store from './vuex/store.js';
// /* 一些插件，需要注册！
// vueTap
Vue.use(vueTap);
// muse-ui
Vue.use(MuseUI);
// AMap地图，amap的key和插件集合
Vue.use(AMap);
AMap.initAMapApiLoader({
    key: 'your amap key',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});
// vue-Events
Vue.use(VueEvents);
// vue-resource
Vue.use(vueResource);
// vue-socket，服务器地址
Vue.use(VueWebsocket, "ws://123.57.215.156:8050");
// ****************** */


/* eslint-disable no-new ，实列化对象和挂载到什么位置 */
// render: h => h(App) 渲染挂载的根组件
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
