<!--  -->
<template>
    <div class='addTabView'>
        <div>
            <el-row>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="5">
                            <div class="textCenter">应用类型</div>
                        </el-col>

                        <el-col :span="12">
                            <div class="textCenter">
                                <el-select v-model="value" filterable placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>


                </el-col>

                <el-col :span="12">
                    <el-row>
                        <el-col :span="5">
                            <div class="textCenter">应用图标</div>
                        </el-col>
                        <el-col :span="7">
                            <div class="textCenter">
                                <el-avatar :size="60" :src="iconUrl">
                                </el-avatar>
                            </div>

                        </el-col>
                        <el-col :span="5">
                            <div class="textCenter">
                                <el-upload class="upload-demo" action="http://localhost:9001/tabs/common/uploadIcon"
                                    :multiple="false" :on-success="handleAvatarSuccess" :show-file-list="false">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </div>
                        </el-col>
                    </el-row>


                </el-col>
            </el-row>
        </div>

        <div>

            <el-row>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="5">
                            <div class="textCenter">应用名称</div>
                        </el-col>
                        <el-col :span="18">
                            <div class="textCenter">
                                <el-input placeholder="请输入内容" v-model="input" clearable>
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>



                </el-col>
                <el-col :span="12">

                    <el-row>
                        <el-col :span="5">
                            <div class="textCenter">应用描述</div>
                        </el-col>
                        <el-col :span="18">
                            <div class="textCenter">
                                <el-input placeholder="请输入内容" v-model="input1"> </el-input>
                            </div>
                        </el-col>

                    </el-row>


                </el-col>
            </el-row>

        </div>
        <div>

            <el-row>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="5">
                            <div class="textCenter">内网地址</div>
                        </el-col>
                        <el-col :span="18">
                            <div class="textCenter">
                                <el-input placeholder="请输入内容" v-model="input" clearable>
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>



                </el-col>
                <el-col :span="12">

                    <el-row>
                        <el-col :span="5">
                            <div class="textCenter">外网地址</div>
                        </el-col>
                        <el-col :span="18">
                            <div class="textCenter">
                                <el-input placeholder="请输入内容" v-model="input1"> </el-input>
                            </div>
                        </el-col>

                    </el-row>


                </el-col>
            </el-row>

        </div>
        <div class="textCenter">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>


    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    import {
        Icon
    } from 'element-ui';

    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                tab: {
                    title: '',
                    firstPic: '',
                    description: '',
                    content: '',
                    appreciation: true,
                    commentabled: true,
                    published: true,
                    tagValues: []
                },
                iconUrl: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png",
                appList: []
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            handleAvatarSuccess(res, file) {
                this.iconUrl = res.data;
            },
            getAppList() {
                this.request
                    .postJson(this.appapi.getAppList)
                    .then((res) => {
                        if (res.code == 0) {
                            this.appList = res.appList
                        } else if (res.code == 1) {
                            _tiper.error(res.desc)
                        }
                    })
                    .catch((error) => {})
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.getAppList()
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

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
        line-height: 70px;
    }
</style>