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
        </el-main>
      </el-container>

      <div id="button-group">
        <div class="mybutton" id="mybutton" v-if="flagPc">
          <el-button icon="el-icon-plus" type="info" @click="dialogChange(viewIndexArr[0])">
          </el-button>
        </div>
        <!-- <div id="mybutton">
          <el-button icon="el-icon-shopping-bag-2" type="info" @click="dialogChange(viewIndexArr[1])"></el-button>
        </div> -->
        <div id="mybutton">
          <el-button icon="el-icon-lock" type="info" @click="dialogChange(viewIndexArr[1])"></el-button>
        </div>
        <div id="mybutton">
          <el-button icon="el-icon-edit" type="info"></el-button>
        </div>
        <div id="mybutton">
          <el-button icon="el-icon-setting" type="info"></el-button>
        </div>
      </div>

      <el-dialog :title="dialog" :visible.sync="dialogVisible" width="60%" height="60%" :append-to-body="true"
        :destroy-on-close="true">
        <addTabView v-if="viewIndex==viewIndexArr[0]" @closeDialog="closeDialog()" @getPublicTbas="getPublicTbas()">
        </addTabView>
        <password v-if="viewIndex==viewIndexArr[1]" @closeDialog="closeDialog()">
        </password>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {
    getStorage,
    setStorage,
    isPC
  } from "@/common/utils/tools.js";
  import addTabView from "@/views/tabs/addView";
  import password from "@/views/lock/password";
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      addTabView,
      password,
    },
    data() {
      //这里存放数据
      return {
        backgroundUrl: "",
        imageKey: "imageKey",
        tabList: [],
        page: {
          current: 1,
          size: 12,
          total: 0,
        },
        cardSpan: 4,
        headerHeight: "400px",
        pageButtonPadding: "200px",
        avatarSaize: 60,
        isactive: -1,

        dialogVisible: false,
        dialog: "",
        client: "pc",
        flagPc: false,
        viewIndexArr: ["tabAdd", "lock", "editTab", "setting"],
        viewIndex: ""
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
      closeDialog() {
        this.dialogVisible = false;
      },
      dialogChange(index) {
        this.dialogVisible = true;
        console.log(index)
        this.viewIndex = index
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
      getPublicTbas() {
        this.request
          .postJson(this.tabapi.getPublicTbas, this.page)
          .then((res) => {
            if (res.code == 0) {
              this.tabList = res.data;
            }
          })
          .catch((error) => {});
      },
      goTo(tab) {
        let doname =
          /^([\w-]+\.)+((vip)|(com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|   (io)|(tw)|(com\.tw)|(hk)|(com\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\.uk)|(org\.uk)|(ltd\.uk)|(plc\.uk)|(in)|(eu)|(it)|(jp))$/;
        let flag = doname.test(window.location.hostname);
        console.log(flag)
        if (flag) {
          console.log(tab.externalUrl)
          window.open(tab.externalUrl, "_blank");
        } else {
          console.log(tab.insideUrl)
          window.open(tab.insideUrl, "_blank");
        }
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
    },
    mounted() {
      this.clientTransfrom();
      this.getBackGroundUrl(this.imageKey);
      this.getPublicTbas();
    },
  };
</script>

<style lang="scss">
  #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0px !important;
    padding: 0px !important;
    border: 0;
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

  .el-main {
    text-align: center;
  }

  #button-group {
    position: fixed;
    bottom: 0%;
    right: 0%;
  }

  #mybutton {
    padding-top: 2px;
  }

  .pageButton {
    position: absolute;
    bottom: 5%;
    left: 0;
    right: 0;
    margin: auto; // text-align: center;
  }

  .el-pagination.is-background .el-pager li:not(.disabled) {
    background-color: rgb(0 0 0 / 0%) !important;
  }

  .el-pagination.is-background .btn-prev {
    background-color: rgb(0 0 0 / 0%) !important;
  }

  .el-pagination.is-background .btn-next {
    background-color: rgb(0 0 0 / 0%) !important;
  }

  // .avatar {
  //   padding-top: 30px;

  // }

  .addclass {
    height: 65px !important;
    width: 65px !important;
    line-height: 65px !important;
  }
</style>