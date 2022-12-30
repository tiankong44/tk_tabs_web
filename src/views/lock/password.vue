<template>
    <div class='password'>
        <el-form :inline="true" :model="tab" :rules="rules" ref="ruleForm">
            <div class="textCenter">
                <el-form-item label="密码" prop="password">
                    <el-input v-model="tab.password" placeholder="请输入密码" clearable show-password></el-input>
                </el-form-item>
            </div>

        </el-form>
        <div class="textCenter">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="confirmPassword()">确 定</el-button>
        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import JSEncrypt from 'jsencrypt';
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
        components: {
            JSEncrypt,
        },
        data() {
            //这里存放数据
            return {
                tab: {
                    password: "",
                },
                rules: {
                    password: [{
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }],
                },
                dialogVisible: true,
                publicKey: "",
                publicKeyStr: "publicKey",
                tokenKey: "lock_token",
                lockToken: ""
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            cancel() {
                this.dialogVisible = false;
                this.$emit("closeDialog");
            },
            confirmPassword() {
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        this.publicKey = getStorage(this.publicKeyStr);
                        if (this.isEmptyStr(this.publicKey)) {
                            this.getPublicKey()
                        }
                        let encrypt = new JSEncrypt()
                        encrypt.setPublicKey(this.publicKey)
                        let pwd = encrypt.encrypt(this.tab.password)
                        this.request
                            .postJson(this.tabapi.confirmPassword, pwd)
                            .then((res) => {
                                console.log(res)
                                if (res.code == 0) {
                                    this.lockToken = res.data
                                    console.log( this.lockToken)
                                    setStorage(this.tokenKey, this.lockToken, 3600);
                                    this.$emit("closeDialog");
                                    
                                } else if (res.code == 1) {
                                    _tiper.error(res.message);
                                }
                            })
                            .catch((error) => {});

                    }
                });


            },
            getPublicKey() {
                this.request.postJson(this.tabapi.getPublicKey)
                    .then((res) => {
                        if (res.code == 0) {
                            this.publicKey = res.data
                            setStorage(this.publicKeyStr, this.publicKey, 3600);
                            return this.publicKey
                        } else if (res.code == 1) {
                            _tiper.error(res.message);
                        }
                    })
                    .catch((error) => {});
            },

            isEmptyStr(s) {
                if (s == undefined || s === '') {
                    return true
                }
                return false
            }

        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.getPublicKey()
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
    .textCenter {
        text-align: center;

    }

    //@import url(); 引入公共css类
</style>