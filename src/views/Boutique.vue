<template>
  <div class="boutique">
    <div class="bg-fixed">
      <div class="rank-bg">
        <van-nav-bar left-text="返回" fixed left-arrow @click-left="goBack" />
      </div>
    </div>

    <div class="classify-box clearfix">
      <div class="book-box fl" @click=" goDetail(item._id)" v-for="(item, index) in boutData" :key="index">
        <div class="book-box-img">
          <img class="auto-img" :src="item.cover" />
        </div>
        <div class="book-box-title">
          <div class="title">{{item.title}}</div>
          <div class="author">作者：{{item.author}}</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import "../assets/less/boutique.less";
export default {
  name: "Boutique",

  data() {
      return {
        //精品数据
        boutData:[],
      }
  },    


  created() {
      this.getBoutiqueData();
  },

  methods: {
    goDetail(id){
      // 携带_id跳转
      this.$router.push({name: 'Detail',query:{id}});
    },
    goBack() {
      this.$router.go(-1);
    },

    // 获取精品数据
    getBoutiqueData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url:"http://novel.kele8.cn/category-info?gender=male&type=over&major=都市&minor=&start=0&limit=20",
      })
        .then((result) => {
          this.$toast.clear();
          
          this.boutData = result.data.books;
          let boutDatas = result.data.books;
          for(let i = 0; i < boutDatas.length; i++) {
            let img = boutDatas[i].cover;
            img = unescape(img).substring(7,img.length);
            boutDatas[i].cover = img;
            let _id = boutDatas[i]._id;
          }
          this.boutData = boutDatas;
          
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>