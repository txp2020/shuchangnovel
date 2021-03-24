<template>
  <div class="info">
    <van-nav-bar left-arrow left-text="返回" fixed @click-left="goBack"/>
    <div class="info-box">暂时还没收到互动消息哦~</div>
  </div>
</template>

<script>
export default {
  name: "Info",

  methods:{
      goBack(){
          this.$router.go(-1)
      }
  }
};
</script>

<style lang="less" scoped>
.info{
    padding-top: 46px;
    /deep/.van-icon{
        color: #fff;
    }
    /deep/.van-nav-bar__text{
        color: #fff ;
    }
    /deep/.van-nav-bar__content{
        background-color: #d43e02;
    }
    .info-box{
        background: #fff;
        padding: 20px 10px;
    }
}
</style>