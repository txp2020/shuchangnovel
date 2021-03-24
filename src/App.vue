<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,body{
  min-height: 100% !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
   min-height: 100% !important;
}


.auto-img {
  width: 100%;
  display: block;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}


</style>
