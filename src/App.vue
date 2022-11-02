<template>
  <div id="building">
    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body {
  margin: 0;
  padding: 0;
  border: 0;
}
#building{
  background:url("https://cn.bing.com/th?id=OHR.FrankensteinFriday_ZH-CN5814917673_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>
