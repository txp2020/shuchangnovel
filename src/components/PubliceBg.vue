<template>
  <div class="publice-bg">
    <div class="all">
      <van-swipe :autoplay="4000">
        <van-swipe-item v-for="(item, index) in todayBook" :key="index" @click="goDetail(item._id)">
          
          <div class="bg clearfix">
            <div class="pb-img fl">
              <img class="pb-img-box auto-img" :src="item.cover" alt="" srcset="" />
            </div>
            <div class="pb-text fl">
              <div class="pb-title hide">{{ item.title }}</div>
              <div class="pb-shortIntro hide">{{ item.shortIntro }}</div>
              <div class="pb-chapter hide">
                最新: <span>{{ item.lastChapter }}</span>
              </div>
              <div class="pb-minorCate hide">{{ item.minorCate }}</div>
            </div>
          </div>

        </van-swipe-item>
      </van-swipe>
    </div>
    
    <div class="bg-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PubliceBg",

  data() {
    return {
      todayBook: [],
    };
  },

  created() {
    this.getTodayData();
  },
  methods: {
    
    // 今日推荐
    getTodayData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url:
          "http://novel.kele8.cn/category-info?gender=male&type=over&major=都市&minor=&start=0&limit=20",
      })
        .then((result) => {
          this.$toast.clear();
          
          let books = result.data.books;

          // ("data-->",data)
          for (let i = 0; i < books.length; i++) {
            let img = books[i].cover;
            img = unescape(img).substring(7, img.length);
            books[i].cover = img;
            // 
          }
          

          var index = Math.floor(Math.random() * books.length);
          
          // 
          if (index + 3 > books.length) {
            this.todayBook = books.splice(index - 3, 3);
          } else {
            this.todayBook = books.splice(index, 3);
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    // 
    goDetail(id){
      this.$router.push({ name: "Detail", query: { id } });
    }
  },
};
</script>
<style lang="less" scoped>
.publice-bg {
  .num{
    font-size: 20px;
    background: #fff;
  }
  .hide {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .van-swipe{
    height: 120px;
    transform: translateZ(0);
  }
  /deep/.van-swipe__indicators{
    display: none;
  }
  .bg {
    width: 100%;
    height: 100px;
    padding: 5px 0;
    // background: url(../assets/images/bg3.jpg) no-repeat center center;
    background: #fff;
    margin-bottom: 28px;
    // background-size: 100% 100%;
    position: relative;
  }

  .bg-content {
    margin: 0 10px;
    position: relative;
    top: 5px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
  }
  .pb-img {
    width: 80px;
    height: 100px;
    margin-left: 10px;
    background-color: #ddd;
  }
  .pb-img-box{
    width: 80px;
    height: 100px;
  }
  .pb-text {
    width: calc(100% - 110px);
    height: 100px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .pb-title,
  .pb-chapter {
    -webkit-line-clamp: 1;
  }
  .pb-title {
    margin-top: 5px;
    font-size: 16px !important;
    font-family: '微软雅黑';
    
    font-weight: bold;
  }
  .pb-shortIntro {
    -webkit-line-clamp: 1;
  }
  .pb-shortIntro,
  .pb-chapter {
    margin-top: 5px;
  }
  .pb-chapter {
    span {
      color: #f86f38;
    }
  }
  .pb-minorCate {
    margin-top: 5px;
    color: #d64910;
  }
  .all{
    transform: translateZ(0);
  }
}
</style>