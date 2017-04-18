<template>
    <div class="m-dashboard">
        <p><span>场强</span>{{FMReviceRSSI}} dBuV</p>
        <p><span>信噪比</span>{{FMReviceSNR}} dB</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    computed: {
        // 场强信噪比
        FMReviceRSSI: function() {
            return this.$store.state.FMReviceRSSI;
        },
        FMReviceSNR: function() {
            return this.$store.state.FMReviceSNR;
        }
    }
}
</script>
<style>
.m-dashboard {
    display: inline-block;
    position: fixed;
    bottom: 120px;
    right: 12px;
    z-index: 1000;
    color: #ff4081;
    background: #fff;
    padding: 0 14px;
    font-size: 12px;
    border: 1px solid #ccc;
    box-shadow: 0 3px 14px rgba(0, 0, 100, .6);
}

.m-dashboard span {
    display: inline-block;
    width: 50px;
}
</style>
