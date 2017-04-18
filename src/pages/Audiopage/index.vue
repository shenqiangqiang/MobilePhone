<template>
    <div class="demo-vsteper-container">
        <div class="demo">
            <p>《该功能正在开发》</p>
        </div>
        <mu-stepper :activeStep="activeStep" orientation="vertical">
            <mu-step>
                <mu-step-label>
                    选择基准音频
                </mu-step-label>
                <mu-step-content>
                    <p>
                        请从系统中选择一个站点的历史音频作为基准音频：
                    </p>
                    <mu-picker :slots="audioSlots_1" :visible-item-count="3" @change="addressChange" :values="address" />
                    <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
                </mu-step-content>
            </mu-step>
            <mu-step>
                <mu-step-label>
                    选择比对音频
                </mu-step-label>
                <mu-step-content>
                    <p>
                        请从系统中选择一个站点的历史音频作为比对音频：
                    </p>
                    <mu-picker :slots="audioSlots_2" :visible-item-count="3" @change="addressChange2" :values="address2" />
                    <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
                    <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev" />
                </mu-step-content>
            </mu-step>
            <mu-step>
                <mu-step-label>
                    选择配置参数
                </mu-step-label>
                <mu-step-content>
                    <p>
                        请选择比对模式：
                    </p>
                    <mu-radio label="正常" name="group" nativeValue="正常" v-model="value" class="demo-radio" />
                    <br/>
                    <mu-radio label="快速" name="group" nativeValue="快速" v-model="value" class="demo-radio" />
                    <br/>
                    <mu-radio label="精准" name="group" nativeValue="精准" v-model="value" class="demo-radio" />
                    <br/>
                    <mu-raised-button label="开始比对" class="demo-step-button" @click="handleNext" primary/>
                    <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev" />
                </mu-step-content>
            </mu-step>
        </mu-stepper>
        <div v-if="finished" class="finished">
            <p>基准音频： {{addressProvince?addressProvince: "未选择"}} | {{addressCity?addressCity: "未选择"}}</p>
            <p>比对音频： {{addressProvince2?addressProvince2: "未选择"}} | {{addressCity2?addressCity2: "未选择"}}</p>
            <p>比对模式： {{value}}</p>
            <b class="error">抱歉，服务器无响应</b>
            <p><a href="javascript:;" @click="reset">重置</a></p>
        </div>
    </div>
</template>
<script>
const address = {
    '测试站点 - 23': ['14_00_00FM0000.mp3', '13_00_00FM0000.mp3', '12_00_00FM0000.mp3', '11_00_00FM0000.mp3', '10_00_00FM0000.mp3', '09_00_00FM0000.mp3', '08_00_00FM0000.mp3', '07_00_00FM0000.mp3', '06_00_00FM0000.mp3', '05_00_00FM0000.mp3', '04_00_00FM0000.mp3', '03_00_00FM0000.mp3', '02_00_00FM0000.mp3', '01_00_00FM0000.mp3']
}


export default {
    data() {
            return {
                activeStep: 0,
                audioSlots_1: [{
                    width: '100%',
                    textAlign: 'right',
                    values: Object.keys(address)
                }, {
                    width: '100%',
                    textAlign: 'left',
                    values: ['']
                }],
                audioSlots_2: [{
                    width: '100%',
                    textAlign: 'right',
                    values: Object.keys(address)
                }, {
                    width: '100%',
                    textAlign: 'left',
                    values: ['']
                }],
                address: ['', ''],
                addressProvince: '',
                addressCity: '',
                address2: ['', ''],
                addressProvince2: '',
                addressCity2: '',
                value: 'mode'
            }
        },
        computed: {
            finished() {
                return this.activeStep > 2
            }
        },
        methods: {
            handleNext() {
                this.activeStep++
            },
            handlePrev() {
                this.activeStep--
            },
            reset() {
                this.activeStep = 0
            },
            addressChange(value, index) {
                switch (index) {
                    case 0:
                        this.addressProvince = value
                        const arr = address[value]
                        this.audioSlots_1[1].values = arr
                        this.addressCity = arr[0]
                        break
                    case 1:
                        this.addressCity = value
                        break
                }
                this.address = [this.addressProvince, this.addressCity]
            },
            addressChange2(value, index) {
                switch (index) {
                    case 0:
                        this.addressProvince2 = value
                        const arr = address[value]
                        this.audioSlots_2[1].values = arr
                        this.addressCity2 = arr[0]
                        break
                    case 1:
                        this.addressCity2 = value
                        break
                }
                this.address2 = [this.addressProvince2, this.addressCity2]
            }

        }
}
</script>
<style lang="css">
.demo-vsteper-container {
    max-width: 380px;
    max-height: 400px;
    margin: auto;
    margin-top: 80px;
}

.demo-step-button {
    margin-top: 12px;
    margin-right: 12px;
}

.demo {
    max-width: 380px;
    max-height: 400px;
    padding: 0 14px;
    color: #009789;
}

.finished {
    max-width: 380px;
    max-height: 400px;
    padding: 0 14px;
}

.error {
    font-weight: 1000;
}
</style>
