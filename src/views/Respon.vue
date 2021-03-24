<template>
  <div class="respon">
    <van-nav-bar fixed left-text="返回" left-arrow @click-left="goBack" />
    <div class="respon-box">
        用户在使用 “书畅”小说 提供的各项服务的同时，承诺接受并遵守各项相关规则的规定。
        “书畅”小说 有权根据需要不定时地制定、修改本协议或各类规则，如本协议有任何变更,
        “书畅”小说将在网站上刊载公告，通知予用户。如用户不同意相关变更，必须停止使用“服务”。
        经修订的协议一经在 “书畅”小说 网公布后，立即自动生效。各类规则会在发布后生效，亦成为本协议的一部分。
        登录或继续使用“服务”将表示用户接受经修订的协议。除另行明确声明外，任何使“服务”范围扩大或功能增强的新内容均受本协议约束。请知悉。
    </div>
  </div>
</template>

<script>
export default {
  name: "Respon",

   methods:{
      goBack(){
          this.$router.go(-1)
      }
  }
};
</script>

<style lang="less" scoped>
.respon{
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
    .respon-box{
        background: #fff;
        text-indent: 2em;
        padding: 10px;
    }
}
</style>