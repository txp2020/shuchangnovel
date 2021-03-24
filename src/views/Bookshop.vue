<template>
  <div class="bookshop">
    <van-nav-bar fixed left-text="返回" left-arrow @click-left="goBack">
      <template #right>
        <div class="bookshop-search">
          <van-search placeholder="输入关键字" @focus="goSearch" />
        </div>
      </template>
    </van-nav-bar>
    <div class="bg-fixed">
      <div class="today-box">今日推荐</div>
      <div class="padding-box">
        <div class="clear-box clearfix" @click="goDetail(todayBook._id)">
          <div class="left-box fl">
            <img
              class="recom-box-img auto-img"
              :src="todayBook.cover"
              alt=""
              srcset=""
            />
          </div>
          <div class="mid-box fl">
            <div class="mid-title">{{ todayBook.title }}</div>
            <div class="mid-desc">{{ todayBook.shortIntro }}</div>
            <div class="mid-chapter">
              最新: <span>{{ todayBook.lastChapter }}</span>
            </div>
          </div>
        </div>

        <div class="change-box" @click="getTodayData">
          <div class="change">换一个</div>
          <van-icon name="replay" size="18px" color="#d43e02" />
        </div>
      </div>
    </div>



    <div class="bookshop-box">
    <!-- 轮播图 -->
      <div class="banner-box">
        <van-swipe :autoplay="5000">
          <van-swipe-item v-for="(item, index) in bannerData" :key="index">
            <!-- <van-image
              class="img-box auto-img"
              lazy-load
              :src="item.imgUrl"
            /> -->
            <img class="img-box auto-img" v-lazy="item.imgUrl" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 分割线 -->
      <div class="line-box">
        <van-divider dashed>猜你喜欢</van-divider>
      </div>

      <div class="like-box">
        <div class="like-box-item" @click="goNewbook">
          <div class="like-img">
            <img class="like-img-box" src="../assets/images/newbook.png" />
          </div>
          <div class="like-text">新书</div>
        </div>
        <div class="like-box-item" @click="goBout">
          <div class="like-img">
            <img class="like-img-box" src="../assets/images/chose.png" />
          </div>
          <div class="like-text">精选</div>
        </div>
        <div class="like-box-item" @click="goRank">
          <div class="like-img">
            <img class="like-img-box" src="../assets/images/rank.png" />
          </div>
          <div class="like-text">排榜</div>
        </div>
      </div>

      <!-- 今日推荐 -->
      <div class="hot-box clearfix">
        <div class="fl recommend">
          <div class="hot-box-sp">重磅推荐</div>
          <!-- <div class="zhe"></div> -->
        </div>

        <div class="fr hot-box-bot">
          <div class="check-box">
            <div class="check" @click="goRank()">查看更多</div>
            <!-- <div class="zhe-check"></div> -->
          </div>
        </div>
      </div>

      <!-- 列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我是有底线的哦!"
        offset="5"
        @load="loadData"
      >
        <div class="list-box">
          <div
            class="list-box-item"
            v-for="(item, index) in booksData"
            :key="index"
            @click="goDetail(item._id)"
          >
            <div class="item-img">
              <img class="auto-img img-box" :src="item.cover" />
            </div>
            <div class="item-text">
              <div class="item-text-top">
                <div class="item-title">{{ item.title }}</div>
                <div class="item-content">{{ item.shortIntro }}</div>
              </div>
              <div class="item-text-bot clearfix">
                <div class="item-author fl">作者：{{ item.author }}</div>
                <div class="item-num fr">
                  <span>人气</span>
                  <span class="sp-num">{{
                    item.latelyFollower | formatNum
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import "../assets/less/bookshop.less";
export default {
  name: "Bookshop",
  data() {
    return {
      // 轮播图数据
      bannerData: [
        { imgUrl: require("../assets/images/banner/banner.jpg") },
        { imgUrl: require("../assets/images/banner/bbanner.jpg") },
        { imgUrl: require("../assets/images/banner/bbanner1.jpg") },
        { imgUrl: require("../assets/images/banner/bbanner2.jpg") },
        { imgUrl: require("../assets/images/banner/bbanner4.jpg") },
        { imgUrl: require("../assets/images/banner/bbanner5.jpg") },
      ],
      // 重磅推荐的数据
      datas: [],

      // 今日推荐
      todayBook: {},
      // 触发加载
      loading: true,
      //是否全部加载完成数据
      finished: false,
      //每次触底懒加载截取 n 条数据
      dataCount: 4,

      //开始截取购物袋数据位置
      startIndex: 0,

      // 开始显示的数据
      booksData: [],
    };
  },
  created() {
    // 调用推荐方法
    this.getRecomData();

    //
    this.getTodayData();
  },
  // 过滤器
  filters: {
    formatNum: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
  methods: {
    goSearch() {
      this.$router.push({ name: "Search" });
    },

   

    // 跳转到新书
    goNewbook() {
      this.$router.push({ name: "Newbook" });
    },

    // 跳转到精选
    goBout() {
      this.$router.push({ name: "Boutique" });
    },

    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },

    goRank() {
      this.$router.push({ name: "Rank" });
    },
    goDetail(id) {
      // 携带_id跳转
      // params 的方式在刷新时数据会丢失 , query 的形式则不会
      // this.$router.push({ name: "Detail", params: { id } });
      this.$router.push({ name: "Detail", query: { id } });

    },

    // 重磅推荐数据
    getRecomData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/recommend/53115e30173bfacb4904897e",
      })
        .then((result) => {
          this.$toast.clear();

          let data = result.data.books;
          // ("data-->",data)
          for (let i = 0; i < data.length; i++) {
            let img = data[i].cover;
            img = unescape(img).substring(7, img.length);
            data[i].cover = img;
            //
          }
          this.datas = data;
          //
          //根据开始截取位置和截取数据数量设置购物袋显示的数据
          this.booksData = this.datas.slice(
            this.startIndex,
            this.startIndex + this.dataCount
          );

          this.startIndex += this.dataCount;

          //未加载
          this.loading = false;
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //懒加载购物袋数据
    loadData() {
      //

      setTimeout(() => {
        //在allShopbagData截取数据
        let data = this.datas.slice(
          this.startIndex,
          this.startIndex + this.dataCount
        );

        //

        this.startIndex += this.dataCount;

        this.booksData.push(...data);

        //如果当前截取数据不足8条数据，下次不可能截取的数据
        if (data.length < this.dataCount) {
          //没有数据可加载时，需要finished修改为true，这样可以不再onload事件
          this.finished = true;
        } else {
          //每次触发onload事件都需要将loading修改为false
          this.loading = false;
        }
      }, 1500);
    },

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
          "getTodayData result.data.books-->", result;
          let books = result.data.books;

          // ("data-->",data)
          for (let i = 0; i < books.length; i++) {
            let img = books[i].cover;
            img = unescape(img).substring(7, img.length);
            books[i].cover = img;
            //
          }
          // "getTodayData books ==>", books;

          var index = Math.floor(Math.random() * books.length);

          this.todayBook = books[index];
          // "this.todayBook==>", this.todayBook;
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
  },
};
</script>

<style lang="less" scoped>
// .bookshop_box{
//   width: 50%;

//   word-wrap:break-word;
//   word-break:break-all;

// }
// .img_box{
//   width: 100%;
//   // overflow: hidden;
// }
// .img_auto{
//   width: 100%;
// }
// .fl{
//   float: left;
// }
</style>
