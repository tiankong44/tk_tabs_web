<template>
    <div class='setting'>
        <div>
            <el-row>
                <el-col :span="24">
                    <div class="divCenter">
                        <el-card class="base-card box-card" shadow="always">
                            <div slot="header" class="clearfix">
                                <span>基础设置</span>
                                <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
                            </div>
                            <el-form :model="base" :rules="baseRules" ref="base" label-width="100px"
                                class="demo-ruleForm">
                                <el-form-item label="系统背景" prop="name">
                                    <el-select v-model="base.backgroundMode" placeholder="请选择系统背景模式">
                                        <el-option label="自定义" value=1></el-option>
                                        <el-option label="默认" value=0></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="背景地址" prop="backgroundMode" v-if="base.backgroundMode==1">
                                    <div>
                                        <el-input v-model="base.backgroundUrl" style="width:300px"></el-input>
                                        <el-upload class="upload-demo" action="/tabs/common/uploadIcon"
                                            :multiple="false" :on-success="handleAvatarSuccess" :show-file-list="false">
                                            <el-button size="small" type="primary">点击上传</el-button>
                                        </el-upload>
                                    </div>

                                </el-form-item>
                            </el-form>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <el-card class="system-card box-card" shadow="always">
                            <div slot="header" class="clearfix">
                                <span>扩展设置</span>
                                <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
                            </div>

                        </el-card>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <el-card class="public-card box-card" shadow="always">
                            <div slot="header" class="clearfix">
                                <span>公开标签</span>
                                <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
                            </div>

                        </el-card>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <el-card class="private-card box-card" shadow="always">
                            <div slot="header" class="clearfix">
                                <span>私密标签</span>
                                <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
                            </div>

                        </el-card>
                    </div>
                </el-col>
            </el-row>


        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import {
        getStorage,
        setStorage,
        isPC
    } from "@/common/utils/tools.js";
    import {
        _tiper
    } from "@/common/utils/ui.js";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                flagPc: true,
                base: {
                    backgroundMode: "",
                    backgroundUrl: ""
                },
                baseRules: {
                    backgroundMode: [{
                        required: true,
                        message: "请输入选择背景模式",
                        trigger: "blur"
                    }],

                },
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            handleAvatarSuccess(res, file) {
                this.base.backgroundUrl = res.data;
                _tiper.success(res.message);
            },
            clientTransfrom() {

                if (isPC()) {
                    this.flagPc = true;
                } else {
                    this.flagPc = false;

                }
                // if (this.client.)
            },
            getSettingData() {
                    
            },
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.clientTransfrom()
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='scss' scoped>
    .el-row {
        margin-bottom: 30px;

        &:last-child {
            margin-bottom: 0;
        }
    }


    // .divCenter {
    //     text-align: center;
    // }
</style>