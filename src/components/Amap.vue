<template>
    <div class="Amap" @click="handlePlay">
        <!-- 子组件地图 -->
        <amap></amap>
        <!-- 子组件站点选择 -->
        <list></list>
        <!-- 信噪比显示 -->
        <noise></noise>
    </div>
</template>
<script>
import amap from './ChildsComponents/amap.vue';
import list from './ChildsComponents/list.vue';
import noise from './ChildsComponents/noise.vue';

export default {
    data() {
        return {
            
        }
    },
    components: {
        amap,
        list,
        noise
    },
    methods: {
        // 地图 label 播放
        handlePlay(event) {
            if (event.target.nextElementSibling && event.target.nextElementSibling.className === 'mu-icon material-icons m-playBTN') {
                // 更改播放器title
                window.sm2BarPlayers[0].actions.changeTitle(this.$store.state.title);
                // 更改播放器url并播放
                window.sm2BarPlayers[0].actions.reLoad(this.$store.state.url);
            }
        }
    }
}
</script>
<style>
.Amap{
    width: 100%;
    height: 100%;
}
.demo-popup-top {
    width: 100%;
    /*opacity: .8;*/
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
    background-color: rgba(77, 209, 183, .8);
    color: rgb(250, 250, 250);
    /*z-index: 1000;*/
}
.m-siteLabel {
    color: #ff4081;
}

.amap-info-close {
    display: none;
}

</style>