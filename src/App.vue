<template>
    <div class="out-warpper">
		<Navigation></Navigation>
        <!-- 主要用于保留组件状态或避免重新渲染 -->
    	<keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>

import Navigation from './components/ChildsComponents/navigation.vue';

export default {
	data() {
            return {

            }
        },
        components: {
            Navigation
        }
}
</script>
<style>

html,body{
    width: 100%;    
    height: 100%;
    overflow: hidden;
}
.out-warpper {
    height: 100%;
}
.mu-buttom-item-wrapper {
    height: 40px;
}

</style>
