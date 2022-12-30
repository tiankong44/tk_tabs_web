<!--  -->
<template>
  <div class="addTabView">
    <el-form ref="ruleForm" :model="tab" label-width="80px" :rules="rules">
      <div>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-form-item label="应用类型">
                <div>
                  <el-select v-model.trim="tab.icon" filterable clearable placeholder="请选择" @change="setInconUrl()">
                    <el-option v-for="item in appList" :key="item.id" :label="item.name" :value="item.icon">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-form-item label="应用图标">
                <el-col :span="4">
                  <div class="hiddenDiv">应用图标</div>
                </el-col>
                <el-col :span="7">
                  <div>
                    <el-avatar :size="60" :src="iconUrl"> </el-avatar>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div>
                    <el-upload class="upload-demo" action="/tabs/common/uploadIcon" :multiple="false"
                      :on-success="handleAvatarSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </div>
                  <!-- <uploudImage></uploudImage> -->
                </el-col>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-form-item label="应用名称" prop="name">
                <el-input placeholder="请输入内容" v-model.trim="tab.name" clearable>
                </el-input>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-form-item label="应用描述" prop="description">
                <el-input placeholder="请输入内容" clearable v-model.trim="tab.description">
                </el-input>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="hiddenDiv">11</div>
      <div>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-form-item label="内网地址" prop="insideUrl">
                <el-input placeholder="请输入内容" v-model.trim="tab.insideUrl" clearable class="input-with-select">
                  <el-select v-model.trim="insideUrlPrefix" slot="prepend" placeholder="http://" class="prefixSelect">
                    <el-option label="http://" value="http://"></el-option>
                    <el-option label="https://" value="https://"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-form-item label="外网地址" prop="externalUrl">
                <el-input placeholder="请输入内容" v-model.trim="tab.externalUrl" clearable class="input-with-select">
                  <el-select v-model.trim="externalUrlPrefix" slot="prepend" placeholder="http://" class="prefixSelect">
                    <el-option label="http://" value="http://"></el-option>
                    <el-option label="https://" value="https://"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-form-item label="是否隐私">
                <div class="individualSwitch">
                  <el-switch v-model.trim="tab.individual" active-color="#13ce66" inactive-color="#909399">
                  </el-switch>
                </div>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="textCenter">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addTab()">确 定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';

  // import uploudImage from "@/views/common/uploudImage";
  import UploudImage from "../common/uploudImage.vue";
  import {
    _tiper
  } from "@/common/utils/ui.js";
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      UploudImage
    },
    data() {
      //这里存放数据
      return {
        tab: {
          icon: "",
          name: "",
          description: "",
          insideUrl: "",
          externalUrl: "",
          individual: false,
        },
        defauldIconUrl: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png",
        iconUrl: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png",
        appList: [],
        app: "",
        insideUrlPrefix: "http://",
        externalUrlPrefix: "http://",
        dialogVisible: false,

        rules: {
          name: [{
            required: true,
            message: "请输入应用名称",
            trigger: "blur"
          }],
          insideUrl: [{
            required: true,
            message: "请输入应用内网地址",
            trigger: "blur"
          }, ],
          externalUrl: [{
            required: true,
            message: "请输入应用外网地址",
            trigger: "blur"
          }, ],
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
        this.tab.icon = res.data;
        this.iconUrl = res.data;
      },
      getAppList() {
        this.request
          .postJson(this.appapi.getAppList)
          .then((res) => {
            if (res.code == 0) {
              this.appList = res.data;
            } else if (res.code == 1) {
              _tiper.error(res.message);
            }
          })
          .catch((error) => {});
      },
      setInconUrl() {
        this.iconUrl = this.tab.icon;
      },
      addTab() {
        if (!this.tab.icon) {
          this.tab.icon = this.defauldIconUrl
        }
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            this.request
              .postJson(this.tabapi.addTab, this.tab)
              .then((res) => {
                if (res.code == 0) {
                  this.dialogVisible = false;
                  this.$emit("closeDialog");
                  this.$emit("getPublicTbas");
                } else if (res.code == 1) {
                  _tiper.error(res.desc);
                }
              })
              .catch((error) => {});
          } else {
            _tiper.error("请完善表单");
            return false;
          }
        });
      },
      cancel() {
        this.dialogVisible = false;
        this.$emit("closeDialog");
      },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.getAppList();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  };
</script>
<style lang="scss" scoped>
  .textCenter {
    text-align: center;
    line-height: 70px;
  }

  .prefixSelect {
    width: 100px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .appSelector {
    line-height: 70px;
    width: 100%;
  }

  .hiddenDiv {
    visibility: hidden;
  }
</style>