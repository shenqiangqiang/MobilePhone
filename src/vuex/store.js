import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let changeSiteContent = (SiteName) => {
    return '<div class="mu-raised-button-wrapper m-siteLabel"><div class="mu-ripple-wrapper"></div> <i class="mu-icon material-icons m-playBTN">play_circle_outline</i> <span class="mu-raised-button-label">' + SiteName + '</span></div>'
}

const state = {

    // 地图的站点MAPMARKERS
    mapMarkers: [],
    // 地图中心点CENTER
    mapCenter: [116.369081, 39.952856],
    // 地图上站点的信息窗体WINDOWS
    mapWindows: [{
        position: [116.369081, 39.952856],
        offset: [15, -25],
        autoMove: true,
        content: ''
    }],

    // 播放器的PLAYSTATE
    playState: '',
    // 播放器的PLAYID
    url: '',
    id: '0',
    title: '智和测试-03',
    deviceID: 'Pp2GJlqr3F34zYUcQqIRSeAw5k45XYISQ3D',

    // 信噪比数据FMREVICE
    FMReviceRSSI: 0,
    FMReviceSNR: 0
};

const mutations = {
    //地图中的mutation
    ADD_MAPMARKERS(state, markersObj) {
        state.mapMarkers.push(markersObj.everyMarker);
    },
    UPDATE_CENTER(state, centerObj) {
        state.mapCenter = centerObj.center;
    },
    UPDATE_WINDOWS(state, windowsObj) {
        state.mapCenter = windowsObj.position;
        state.mapWindows[0].position = windowsObj.position;
        state.mapWindows[0].content = changeSiteContent(windowsObj.content);
    },

    // 播放器的mutation
    SET_PLAYSTATE(state, flagObj) {
        state.playState = flagObj.flag;
        console.log(state.playState);
    },
    SET_PLAYID(state, idObj) {
        state.url = idObj.url;
        state.id = idObj.id;
        state.title = idObj.title;
        state.deviceID = idObj.deviceID;
    },

    //信噪比数据
    SET_FMREVICE(state, fmrObj) {
        state.FMReviceRSSI = fmrObj.FMReviceRSSI;
        state.FMReviceSNR = fmrObj.FMReviceSNR;
    }
};
const store = new Vuex.Store({
    state,
    mutations
})

export default store
