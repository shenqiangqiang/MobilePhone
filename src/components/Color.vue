<template>
    <!-- 音频彩条 -->
    <div class="m-meter">
        <div class="m-inner-warpp clearfix">
            <!-- 左右声道标示 -->
            <div class="m-meter-value">
                <div>左</div>
                <div>右</div>
                <div>dB</div>
            </div>
            <!-- /左右声道标示 -->
            <div class="m-meter-canvas">
                <!-- 画布 -->
                <canvas id="meter"></canvas>
                <!-- /画布 -->
                <!-- 刻度尺 -->
                <div class="m-level">
                    <ul class="clearfix">
                        <li><a href="#">57</a></li>
                        <li>
                            <a href="#"></a>
                        </li>
                        <li><a href="#">51</a></li>
                        <li>
                            <a href="#"></a>
                        </li>
                        <li><a href="#">45</a></li>
                        <li>
                            <a href="#"></a>
                        </li>
                        <li><a href="#">39</a></li>
                        <li>
                            <a href="#"></a>
                        </li>
                        <li><a href="#">33</a></li>
                        <li>
                            <a href="#"></a>
                        </li>
                        <li><a href="#">27</a></li>
                        <li>
                            <a href="#"></a>
                        </li>
                        <li><a href="#">21</a></li>
                        <li>
                            <a href="#"></a>
                        </li>
                        <li><a href="#">15</a></li>
                        <li><a href="#">12</a></li>
                        <li><a href="#">9</a></li>
                        <li><a href="#">6</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">0</a></li>
                    </ul>
                </div>
                <!-- ／刻度尺 -->
            </div>
        </div>
    </div>
    <!-- /音频彩条 -->
</template>
<script>
/**
 * es6 class重写canvas绘制彩条功能;
 */
class Draw {
    // 构造函数
    constructor(el) {
            this.el = el;
            this.canvas = document.getElementById(this.el);
            this.ctx = this.canvas.getContext('2d');
            this.isPlay = false;
            this.width = 288;
            this.height = 36;
            this.meter = {
                ractW: 78,
                capW: 4.8,
                capH: 17
            };
            this.timeout = null;
            /**
             * [dots 记录彩条初始level的值]
             * @type {Array}
             */
            this.Dots = [59, 59];
            this.isReduceCap = [false, false];
        }
        /**
         * [init 初始化]
         */
    init() {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.Dots = [59, 59];
            this.timeout = null;
            console.log('canvas init')
        }
        /**
         * [clearCanvas 绘制图形前清空画布]
         */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    reduceCap(index) {
            this.isReduceCap[index] = true;
        }
        /**
         * [drawing 绘图 数组]
         */
    drawing(dotsArr) {

        // 先清空
        this.clearCanvas();

        // 从websocket获得的数据
        let dots = dotsArr;

        // 循环处理dots 左右2个值
        for (let i = 0; i < dots.length; i++) {
            // 绘制渐变色
            /* 指定渐变区域 */
            let Gradient = this.ctx.createLinearGradient(this.width, 0, 0, 0);
            /* 指定几个颜色 */
            Gradient.addColorStop(0, "#ff351a");
            Gradient.addColorStop(.05, "#ffc834");
            Gradient.addColorStop(.1, "#ffc834");
            Gradient.addColorStop(.2, "#87da86");
            Gradient.addColorStop(1, "#87da86");
            this.ctx.fillStyle = Gradient;

            let x1 = 0;
            let y1 = (i * this.meter.capH + i * 2);
            let x2 = (60 - dots[i]) * (288 / 60);
            let x22 = (60 - this.Dots[i]) * (288 / 60);
            let y2 = this.meter.capH;


            // 绘制图形
            this.ctx.fillRect(x1, y1, x2, y2); // 矩形彩条

            // 如果通过socket获得的彩条数据 小于 保存的彩条数据， 就绘制彩条最大值， 并缓存数值。
            if (dots[i] < this.Dots[i]) {
                this.ctx.fillRect(x2 - this.meter.capW, y1, this.meter.capW, this.meter.capH); // 彩条最大值
                this.Dots[i] = dots[i];
                this.isReduceCap[i] = false;
            } else {
                if (this.isReduceCap[i]) {
                    this.Dots[i] = this.Dots[i] + this.meter.capW;
                }
                this.ctx.fillRect(x22 - this.meter.capW, y1, this.meter.capW, this.meter.capH); // 彩条最大值

                if (this.timeout) {
                    clearTimeout(this.timeout);
                    this.timeout = null;
                } else {
                    this.timeout = setTimeout(() => {
                        this.reduceCap(i)
                    }, 2500); // 2.5s 数据没有超过音频彩条就递减小帽
                }

            }

            //设置字体的大小
            dots[i] > 54 ? this.ctx.fillStyle = "#777" : this.ctx.fillStyle = "#FFF";
            this.ctx.font = "10px";
            this.ctx.fillText(dots[i], 4, (i + 1) * 13 + i * 6);
        }
    }
}

export default {
    data() {
            return {
                open: false
            }
        },
        // 绑定playState
        computed: {
            drawingFlag: function() {
                return this.$store.state.playState;
            }
        },
        socket: {

            events: {

                // 连接socket
                connect() {
                    console.log("Websocket connected to " + this.$socket.nsp);
                },
                respondMeterData(res) {

                    if (res) {
                        // 接受彩条数据并绘制
                        try {


                            let levels = res.levels;
                            let datas = res.datas;
                            let FMReviceRSSI = datas.deviceData.FMReviceRSSI.value;
                            let FMReviceSNR = datas.deviceData.FMReviceSNR.value;

                            if (this.drawingFlag === 'onload') {
                                audioMeter.drawing(levels);
                            }
                            this.$store.commit('SET_FMREVICE', {
                                FMReviceRSSI: FMReviceRSSI,
                                FMReviceSNR: FMReviceSNR
                            })

                        } catch (err) {

                        }
                    }



                },
                error(err) {
                    console.error("Websocket error!", err);
                }

            }
        },
        mounted() {
            let draw = new Draw('meter');
            window.audioMeter = draw;
            audioMeter.init();
        },
        watch: {
            // 如果 question 发生改变，这个函数就会运行
            drawingFlag: function() {
                if (this.drawingFlag === 'onplay') {
                    audioMeter.clearCanvas();
                }
                if (this.drawingFlag === 'onload') {
                    // 开始绘制彩条
                    // console.log('meter is now start');
                    // 这里之后要传播放器正在播放的deviceID的值
                    this.$socket.emit("requestMeterData", {
                        deviceID: this.$store.state.deviceID
                    });
                }
                if (this.drawingFlag === 'onstop') {
                    // 播放停止
                    // audioMeter.clearCanvas();
                    // console.log('meter is now stopped');
                    audioMeter.clearCanvas();
                }
                if (this.drawingFlag === 'onpause') {
                    // 播放暂停
                    // console.log('meter is now paused');
                }
            }
        }

}
</script>
<style type="text/css">
.m-meter {
    position: fixed;
    left: auto;
    right: auto;
    display: inline-block;
    width: 100%;
    height: 63px;
    bottom: 42px;
    z-index: 999;
    background: #FFFFFF;
}

.m-inner-warpp {
    width: 320px;
    margin: 0 auto;
    position: relative;
    top: 0;
    padding: 3px 6px
}

.m-meter-value {
    float: left;
    width: 20px;
    font-size: 12px;
    color: #009688;
}

.m-meter-canvas {
    float: left;
    width: calc(100% - 20px);
    height: 36px;
}

.m-meter-canvas canvas {
    display: inline-block;
    width: 100%;
    height: 100%;
}

.m-meter-canvas .m-level ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.m-meter-canvas .m-level ul>li {
    float: left;
    display: inline-block;
    font-size: 8px;
    width: 14.4px;
    height: 5px;
    border-left: 1px solid gray;
    border-bottom: 1px solid transparent;
}

.m-meter-canvas .m-level ul>li:last-child {
    border-right: 1px solid gray;
}

.m-meter-canvas .m-level ul>li a {
    position: relative;
    top: 3px;
    left: 9px;
    font-size: 8px;
}

.clearfix:after {
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    content: ".";
}
</style>
