<template>
  <div class="classify">
    <div class="classify-bg">
      <van-nav-bar left-text="返回" left-arrow @click-left="goBack" />
    </div>

    <div class="classify-box clearfix">
      <div class="book-box fl">
        <div class="book-box-img">
          <img src="" alt="" />
        </div>
        <div class="book-box-title clearfix">
          <div class="title fl">西游记</div>
          <div class="author fr">小小</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/classify.less";
export default {
  name: "Classify",
  data() {
    return {
      ClassifyData: [],
    };
  },
  methods: {
    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },
    goDetail() {
      this.$router.push({ name: "Detail" });
    },

    // 获取分类型数据
    getMenuData() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/categories",
       
      })
        .then((result) => {
          this.$toast.clear();
          ("result========>",result)
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    // 获取分类详情
    // getClassifyData() {
    //   this.$toast.loading({
    //     message: "加载中...",
    //     forbidClick: true,
    //     duration: 0,
    //   });
    //   this.axios({
    //     method: "GET",
    //     url: `http://novel.kele8.cn/category-info?gender=male&type=hot&major=${}&minor=&start=0&limit=20`,
    //   })
    //     .then((result) => {
    //       this.$toast.clear();
    //       

    //       let newBookDatas = result.data.books;
    //       for (let i = 0; i < newBookDatas.length; i++) {
    //         let img = newBookDatas[i].cover;
    //         img = unescape(img).substring(7, img.length);
    //         newBookDatas[i].cover = img;
    //       }
    //       this.newBookData = newBookDatas;
    //       
    //     })
    //     .catch((err) => {
    //       this.$toast.clear();
    //     });
    // },
  },
};
</script>

<style lang="less" scoped>
</style>