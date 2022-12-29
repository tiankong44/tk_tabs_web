<template>
    <div class='individual'>
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
            </el-main>
        </el-container>

    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                tabList: [],
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {

        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

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
    //@import url(); 引入公共css类
</style>