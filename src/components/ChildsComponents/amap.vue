<template>
    <el-amap :vid="'amap-vue'" :center="center" :zoom="zoom" :map-manager="amapManager" :plugin="plugin" :events="events" :mapStyle="mapStyle">
        <!-- markers，地图中的位置图标 -->
        <el-amap-marker v-for="marker in markers" :position="marker.position" :icon="marker.icon" :title="marker.title" :extData="marker.extData" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
        <!-- /markers -->
        <!-- window，地图中的信息窗口 -->
        <el-amap-info-window v-for="window in windows" :position="window.position" :offset="window.offset" :content="window.content" :visible="window.visible" :open="window.open" :events="window.events"></el-amap-info-window>
        <!-- /window -->
    </el-amap>
</template>
<script>
import {
    AMapManager
} from 'vue-amap';

let amapManager = new AMapManager();

import sitePng from '../../assets/images/site.png';

export default {
    data() {
            return {
                // 地图 js
                vid: 'amap-vue',
                zoom: 13,
                mapStyle: 'fresh',
                events: {
                    // 地图平移结束后触发
                    'moveend': () => {
                        // 获取当前地图中心点
                        let mapCenter = this.amapManager.getMap().getCenter();
                        // 地图平移结束后更改center的值
                        this.$store.commit('UPDATE_CENTER', {
                            center: [mapCenter.getLng(), mapCenter.getLat()]
                        })
                    },
                    // 地图缩放级别更改后触发
                    'zoomchange': () => {
                        this.zoom = this.amapManager.getMap().getZoom();
                    },
                },
                plugin: [
                    {
                        pName: 'ToolBar',
                        position: 'LT'
                    }
                ],
                amapManager: amapManager
            }
        },
        computed: {
            // vuex中的地图属性
            markers: function() {
                return this.$store.state.mapMarkers;
            },
            center: function() {
                return this.$store.state.mapCenter;
            },
            windows: function() {
                return this.$store.state.mapWindows;
            }
        },
        mounted() {
            // GET /someUrl
            this.$http.post('http://123.57.215.156:8050/api/maps/getAllSiteInfo').then(response => {
                // ajax 获取数据并处理
                // 
                // 设置站点的初始信息窗口
                let defaultCenter = [parseFloat(response.body[0].OHLongitude), parseFloat(response.body[0].OHLatitude)];
                let defaultPosition = [parseFloat(response.body[0].OHLongitude), parseFloat(response.body[0].OHLatitude)];
                let defaultContent = response.body[0].SiteName;
                this.$store.commit('UPDATE_WINDOWS', {
                    position: defaultPosition,
                    content: defaultContent
                })

                // 设置地图数据
                for (let i = 0; i < response.body.length; i++) {

                    // 保证坐标点正确
                    if (response.body[i].OHLongitude && response.body[i].OHLatitude) {

                        let position = [parseFloat(response.body[i].OHLongitude), parseFloat(response.body[i].OHLatitude)];
                        let SiteName = response.body[i].SiteName

                        // 拼接marker点数据
                        let everyMarker = {
                            position: position,
                            title: SiteName,
                            icon: sitePng,
                            extData: "http://123.57.215.156:10011/" + response.body[i].RegisterTagID + "?nisFLv=3600.mp3",
                            deviceID: response.body[i].deviceID,
                            events: {
                                'zoomchange': () => {
                                    this.zoom = this.amapManager.getMap().getZoom();
                                },
                                click: (e) => {
                                    // this.value = i;
                                    let URL = e.target.G.extData;
                                    // 提交mutation来更改windows
                                    this.$store.commit('UPDATE_WINDOWS', {
                                        position: position,
                                        content: SiteName
                                    });
                                    // 设置播放的站点id等数据
                                    this.$store.commit('SET_PLAYID', {
                                        url: URL,
                                        id: i,
                                        title: SiteName,
                                        deviceID: response.body[i].deviceID
                                    })
                                }
                            },
                            visible: true,
                            draggable: false,
                            RegisterTagID: response.body[i].RegisterTagID
                        };

                        // 保存marker点
                        this.$store.commit('ADD_MAPMARKERS', {
                            everyMarker: everyMarker,
                        })
                    }
                }

            }, response => {
                // error callback
            });

        },
        methods: {
        }
}
</script>
