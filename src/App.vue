<template>
  <div id="building" :style="bgStyle">
    <div id="app">
      <el-container direction="vertical">
        <el-header :height=headerHeight></el-header>
        <el-main>
          <div id="list">
            <el-row>
              <el-col :span="5" style="min-height:1px;">
                <div></div>
              </el-col>
              <el-col :span="18">
                <el-row :gutter="20">
                  <el-col :span=cardSpan v-for="(tab, index) in this.tabList.records" id="card">
                    <el-card class="box-card" shadow="hover" @click=goTo(tab)>
                      <div @click=goTo(tab)>
                        <el-row>
                          <el-col :span="8">
                            <div>
                              <el-avatar :src=tab.icon :key="index" :size="50"></el-avatar>
                            </div>

                          </el-col>
                          <el-col :span="12">
                            <div style="height: 3em;line-height: 3em;overflow: hidden; color:white;font-size: large;">
                              {{tab.name}}</div>
                          </el-col>
                          <el-col :span="4">
                            <i class="el-icon-position" style="padding-top: 5px; color:white; font-size: 40px;"></i>
                          </el-col>
                        </el-row>
                      </div>



                    </el-card>
                  </el-col>

                </el-row>
              </el-col>
              <el-col :span="2" style="min-height:1px;">
                <div></div>
              </el-col>
            </el-row>

          </div>
          <div class="pageButton">

            <el-pagination layout="prev, pager, next" :total="tabList.total" :background="true"
              :hide-on-single-page="true" @current-change="handleCurrentChange" @prev-click="prevClick"
              @next-click="nextClick">
            </el-pagination>
          </div>
        </el-main>
      </el-container>

      <div id="button-group">
        <div class="mybutton" id="mybutton">
          <el-button icon="el-icon-plus" type="info"></el-button>
        </div>
        <div id="mybutton">
          <el-button icon="el-icon-lock" type="info"></el-button>
        </div>
        <div id="mybutton">
          <el-button icon="el-icon-edit" type="info"></el-button>
        </div>
        <div id="mybutton">
          <el-button icon="el-icon-setting" type="info"></el-button>
        </div>

      </div>
      <router-view />
    </div>
  </div>
</template>



<script>
  import {
    getStorage,
    setStorage,
    isPC
  } from '@/common/utils/tools.js'
  export default {


    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
        backgroundUrl: '',
        imageKey: 'imageKey',
        tabList: [],
        page: {
          current: 1,
          size: 8,
          total: 0
        },
        client: "",
        cardSpan: 5,
        headerHeight: "400px",
        pageButtonPadding: "200px"
      }
    },
    //监听属性 类似于data概念
    computed: {
      bgStyle() {
        return {
          backgroundImage: 'url(' + this.backgroundUrl + ')'
        }
      }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      getBackGroundUrl(key) {
        var url = getStorage(key)
        if (!url) {
          this.request
            .postJson(this.commonapi.getBackgroundImage)
            .then((res) => {
              if (res.code == 0) {
                this.backgroundUrl = res.data
                setStorage(this.imageKey, this.backgroundUrl, 3600)
              }
            })
            .catch((error) => {})
        } else {
          this.backgroundUrl = url
        }
      },
      getPublicTbas() {

        this.request
          .postJson(this.tabapi.getPublicTbas, this.page)
          .then((res) => {

            if (res.code == 0) {
              this.tabList = res.data
            }
          })
          .catch((error) => {})
      },
      goTo(tab) {
        let doname =
          /^([\w-]+\.)+((vip)|(com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|   (io)|(tw)|(com\.tw)|(hk)|(com\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\.uk)|(org\.uk)|(ltd\.uk)|(plc\.uk)|(in)|(eu)|(it)|(jp))$/;
        let flag = doname.test(window.location.hostname);
        if (flag) {
          window.open("http://" + tab.externalUrl, "_blank")
        } else {
          window.open("http://" + tab.insideUrl, "_blank")
        }
      },
      clientTransfrom() {
        if (isPC()) {
          this.cardSpan = 5
        } else {
          this.cardSpan = 20
          this.headerHeight = "20px"
          this.page = {
              current: 1,
              size: 5,
              total: 0
            },
            this.pageButtonPadding = "20px"
        }
        // if (this.client.)
      },
      handleCurrentChange(current) {
        this.page.current = current
        this.getPublicTbas()
      },
      prevClick(current) {
        this.page.current = current
        this.getPublicTbas()
      },
      nextClick(current) {
        this.page.current = current
        this.getPublicTbas()
      }

    },
    mounted() {
      this.clientTransfrom()
      this.getBackGroundUrl(this.imageKey)
      this.getPublicTbas()
    }
  }
</script>

<style lang="scss">
  #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
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

  #card {
    padding-top: 20px;
  }

  .el-card {
    border: 1px solid rgb(0 0 0 / 10%) !important;
    background: url(../static/images/tab-image.png);
    background-size: 100% 100%;
  }

  .pageButton {
    padding-top: v-bind('pageButtonPadding');

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
</style>