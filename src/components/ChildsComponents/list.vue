<template>
    <!-- 站点选择列表 -->
    <div class="m-Amap-select">
        <mu-dropDown-menu :maxHeight="200" @change="handleChange" :open="open" @open="handleOpen" @close="handleClose" :value="value">
            <mu-menu-item :value="1000" title="站点选择" />
            <mu-menu-item v-for="(marker,index) in markers" :value="index" :title="marker.title" />
        </mu-dropDown-menu>
    </div>
</template>
<script>
export default {
    data() {
            return {
                // 初始默认value值
                value: 1000,
                open: false 
            }
        },
        computed: {
            markers: function() {
                return this.$store.state.mapMarkers;
            }
        },
        methods: {
            // 站点切换 select
            handleChange(index) {

                let marker = this.$store.state.mapMarkers[index];
                let URL = marker.extData;

                this.$store.commit('UPDATE_WINDOWS', {
                    position: marker.position,
                    content: marker.title
                });
                // 设置播放的站点id等数据
                this.$store.commit('SET_PLAYID', {
                    url: URL,
                    id: index,
                    title: marker.title,
                    deviceID: marker.deviceID
                })
            },
            toggle() {
                this.open = !this.open
            },
            // 打开菜单的时候
            handleOpen() {
                this.open = true
            },
            // 关闭菜单的时候
            handleClose() {
                this.open = false
            }
        }


}
</script>
<style>
/*站点列表样式*/
.m-Amap-select {
    position: fixed;
    bottom: 120px;
    left: 12px;
    z-index: 1000;
    color: #ff4081;
    background-color: #FFF;
    border-radius: 3px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 10px 0 #ccc;
}
.mu-dropDown-menu-text {
    color: #ff4081;
}



</style>
