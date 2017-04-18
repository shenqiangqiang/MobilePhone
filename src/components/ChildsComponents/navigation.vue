<template>
    <mu-paper class="bottom-nav">
        <mu-bottom-nav :value="bottomNav" shift @change="handleChange" class="navigation">
            <mu-bottom-nav-item value="Amappage" title="地图监听" icon="map" />
            <mu-bottom-nav-item value="Audiopage" title="音频比对" icon="radio" />
        </mu-bottom-nav>
    </mu-paper>
</template>
<script>
export default {
    data() {
            return {
                bottomNav: 'Amappage',
                bottomNavColor: 'Amappage'
            }
        },
        // 实例已经创建完成之后被调用
        // created() {
        //     this.bottomNav = this.$route.name;
        // },
        methods: {
            handleChange(val) {
                this.bottomNav = val;
                this.$router.push(val);
            }
        }
}
</script>
<style type="text/css">
.bottom-nav {
    position: fixed;
    display: inline-block;
    width: 100%;
    height: 56px;
    top: 0; left: 0;
    z-index: 999;
}
.navigation{
    background-color: #26a69a;
}
</style>
