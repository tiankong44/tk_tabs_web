<template>
    <div id="building" :style="bgStyle">
        <div class="app">
            <el-container direction="vertical">
                <el-header :height="headerHeight"></el-header>
                <el-main>
                    <div id="list">
                        <el-row>
                            <el-col :span="16" :offset="4">
                                <el-row>
                                    <el-col :span="cardSpan" v-for="(tab, index) in this.tabList.records" id="card">
                                        <div id="avatar" class="avatar" @click="goTo(tab)" @mouseover="mouseOver(index)"
                                            @mouseleave="mouseLeave(index)" style="height: 130px">
                                            <el-avatar draggable="true" :size="avatarSaize" :src="tab.icon"
                                                :class="isactive == index ? 'addclass' : ''">
                                            </el-avatar>
                                            <div style="color: white">{{ tab.name }}</div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="3" style="min-height: 1px">
                                <div></div>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="pageButton">
                        <el-pagination layout="prev, pager, next" :total="tabList.total" :background="true"
                            :page-size="tabList.size" :page-count="tabList.pages" :hide-on-single-page="true"
                            @current-change="handleCurrentChange" @prev-click="prevClick" @next-click="nextClick">
                        </el-pagination>
                    </div>


                    <el-dialog :title="dialog" :visible.sync="dialogVisible" width="60%" height="60%"
                        :append-to-body="true" :destroy-on-close="true">
                        <div class='password'>
                            <el-form :inline="true" :model="tab" :rules="rules" ref="ruleForm">
                                <div class="textCenter">
                                    <el-form-item label="密码" prop="password">
                                        <el-input v-model="tab.password" placeholder="请输入密码" clearable show-password>
                                        </el-input>
                                    </el-form-item>
                                </div>

                            </el-form>
                            <div class="textCenter">
                                <el-button @click="cancel()">取 消</el-button>
                                <el-button type="primary" @click="confirmPassword()">确 定</el-button>
                            </div>
                        </div>
                    </el-dialog>
                </el-main>
            </el-container>

            <div id="button-group">
                <!-- <div class="mybutton" id="mybutton" v-if="flagPc">
                    <el-button icon="el-icon-plus" type="info" @click="dialogChange(viewIndexArr[0])">
                    </el-button>
                </div> -->
                <!-- <div id="mybutton">
          <el-button icon="el-icon-shopping-bag-2" type="info" @click="dialogChange(viewIndexArr[1])"></el-button>
        </div> -->
                <div id="mybutton">
                    <el-button icon="el-icon-s-grid" type="info" @click="toIndex()"></el-button>
                </div>
                <div id="mybutton">
                    <el-button icon="el-icon-lock" type="info" @click="toIndividual()"></el-button>
                </div>
                <div id="mybutton">
                    <el-button icon="el-icon-edit" type="info"></el-button>
                </div>
                <div id="mybutton">
                    <el-button icon="el-icon-setting" type="info"></el-button>
                </div>
            </div>

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
        isPC,
        delStorage
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
                tabList: [],

                dialog: "",
                backgroundUrl: "",
                imageKey: "imageKey",
                page: {
                    current: 1,
                    size: 12,
                    total: 0,
                },
                client: "pc",
                flagPc: false,
                cardSpan: 4,
                headerHeight: "400px",
                pageButtonPadding: "200px",
                avatarSaize: 60,
                isactive: -1,
                viewIndexArr: ["tabAdd", "lock", "editTab", "setting"],
                viewIndex: "",
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
                dialogVisible: false,
                publicKey: "",
                publicKeyStr: "publicKey",
                tokenKey: "lock_token",
                lockToken: ""
            };
        },
        //监听属性 类似于data概念
        computed: {
            bgStyle() {
                return {
                    backgroundImage: "url(" + this.backgroundUrl + ")",
                };
            },
        },
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            cancel() {
                this.dialogVisible = false;

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
                                    setStorage(this.tokenKey, this.lockToken, 300);
                                    this.dialogVisible = false
                                    this.getPrivateTbas()

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
            },
            handleCurrentChange(current) {
                this.page.current = current;
                this.getPublicTbas();
            },
            prevClick(current) {
                this.page.current = current;
                this.getPublicTbas();
            },
            nextClick(current) {
                this.page.current = current;
                this.getPublicTbas();
            },
            // 移入
            mouseOver(index) {
                this.isactive = index;
            },
            // 移出
            mouseLeave(index) {
                this.isactive = -1;
            },
            getBackGroundUrl(key) {
                var url = getStorage(key);
                if (!url) {
                    var api = this.commonapi.getBackgroundImage;
                    if (this.client == "pc") {
                        api = api + "?clientType=1";
                    } else if (this.client == "mobile") {
                        api = api + "?clientType=2";
                    } else {
                        api = api + "?clientType=1";
                    }

                    this.request
                        .postJson(api)
                        .then((res) => {
                            if (res.code == 0) {
                                this.backgroundUrl = res.data;
                                setStorage(this.imageKey, this.backgroundUrl, 3600);
                            }
                        })
                        .catch((error) => {});
                } else {
                    this.backgroundUrl = url;
                }
            },
            getPrivateTbas() {
                setStorage(this.tokenKey, this.lockToken, 300);
                let param = {
                    page: this.page,
                    lockToken: this.lockToken
                }
                this.request
                    .postJson(this.tabapi.listPrivate, param)
                    .then((res) => {
                        if (res.code == 0) {
                            this.tabList = res.data;
                        } else if (res.code == 1005) {
                            this.tabList = []
                            _tiper.error(res.message);
                            return
                        } else if (res.code == 1006) {
                            _tiper.error(res.message);
                            delStorage(this.tokenKey)
                            this.tabList = []
                            this.dialogVisible = true
                            return
                        } else {
                            this.tabList = []
                        }
                    })
                    .catch((error) => {});
            },
            clientTransfrom() {
                if (isPC()) {
                    this.flagPc = true;
                } else {
                    this.flagPc = false;
                    this.cardSpan = 8;
                    this.headerHeight = "20px";
                    (this.page = {
                        current: 1,
                        size: 12,
                        total: 0,
                    }),
                    (this.pageButtonPadding = "20px"),
                    (this.avatarSaize = 50);

                    this.client = "mobile";
                }
                // if (this.client.)
            },

            dialogInit() {
                this.lockToken = getStorage(this.tokenKey);
                if (this.isEmptyStr(this.lockToken)) {
                    this.tabList = []
                    this.dialogVisible = true
                } else {
                    this.dialogVisible = false
                    this.getPrivateTbas()
                }
            },
            toIndividual() {
                location.reload()
            },
            toIndex() {
                this.$router.push({
                    name: 'home'
                })
            },
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.clientTransfrom()
            this.getPublicKey()
            this.getBackGroundUrl(this.imageKey);
            this.dialogInit()
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

    #app {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #building {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100%;
        min-height: 100vh;
        background-size: 100% 100%;
        position: fixed; //绝对定位
    }

    //@import url(); 引入公共css类
</style>