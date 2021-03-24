<template>
  <div class="detail">
    <van-nav-bar
      title="书本详情"
      left-text="返回"
      left-arrow
      fixed
      @click-left="goBack"
    />

    <div class="detail-box">
      <div class="bg-box">
        <div class="bg">
          <div class="detail-top clearfix">
            <div class="img-box fl">
              <img class="auto-img detail-img" :src="bookDatas.cover" />
            </div>
            <div class="text-box">
              <div class="text-title">{{ bookDatas.title }}</div>
              <div class="text-desc">作者：{{ bookDatas.author }}</div>
              <div class="text-num">
                {{ bookDatas.wordCount | formatNum }}字
              </div>
              <div class="text-copyright">{{ bookDatas.minorCateV2 }}</div>
            </div>
          </div>
        </div>
        <img class="auto-img bg-img" :src="bookDatas.cover" alt="" srcset="" />
        <div class="mask-box"></div>
      </div>

      <div class="detail-count">
        <div class="star-box">
          <div class="star-box-top">
            <span class="star-text">{{ isExit ? rating.score : 0 }}</span>
            <van-rate
              v-model="value"
              allow-half
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <!-- starRatingCount -->
          <div class="star-box-bot">
            {{ bookDatas.starRatingCount | formatNum }}人参与评分
          </div>
        </div>

        <div class="save-box">
          <div class="save-box-top">{{ bookDatas.retentionRatio }}%</div>
          <div class="save-box-bot">保存率</div>
        </div>

        <div class="week-box">
          <div class="week-box-top">
            {{ bookDatas.latelyFollower | formatNum }}
          </div>
          <div class="week-box-bot">7日人气</div>
        </div>

        <div class="count-box">
          <div class="count-box-top">
            {{ bookDatas.totalFollower | formatNum }}
          </div>
          <div class="count-box-bot">累计人气</div>
        </div>
      </div>

      <!-- 简介 -->
      <div class="detail-synop">
        <div class="synop-title">简介</div>
        <van-collapse v-model="activeNames" @change="onClick">
          <van-collapse-item
            :title="isShow == false ? bookDatas.longIntro : ''"
            name="1"
          >
            <div>{{ bookDatas.longIntro }}</div>
          </van-collapse-item>
        </van-collapse>
        <!-- <div class="synop-content" >
            <div class="content-box">{{bookDatas.longIntro}}</div>
          </div> -->
      </div>

      <!-- 图书信息 -->
      <div class="desc-box">
        <div class="desc-box-con">
          <div class="desc-title">图书说明</div>
          <div class="desc-content">{{ bookDatas.copyrightInfo }}</div>
        </div>
      </div>

      <!-- 作者的其他书籍 -->
      <div class="other-big-box">
        <div class="other-title">作者的其他书籍</div>
        <div>
          <div class="detail-other clearfix" v-if="otherBooks.length > 0">
            <div
              class="other-box fl"
              v-for="(item, index) in otherBooks"
              :key="index"
              @click="goReadbook(item._id, item.title)"
            >
              <div class="content-box clearfix">
                <div class="other-img fl">
                  <img class="auto-img other-img-box" :src="item.cover" />
                </div>
                <div class="other-text fl">
                  <div class="other-tit">{{ item.title }}</div>
                  <div class="other-sapn">
                    <span>{{ item.latelyFollower | formatNum }}</span> 人阅读
                  </div>
                  <div class="other-retention">
                    保存:<span>{{ item.retentionRatio }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="empty-box" v-else>
            <van-empty description="暂无数据哦~去看看其他的吧" />
          </div>
        </div>
      </div>

      <!-- 添加到书架 -->
      <van-goods-action>
        <van-goods-action-icon
          icon="column"
          text="书架"
          :badge="bookCount == 0 ? '' : bookCount"
          :color="bookCount > 0 ? '#e84203' : '#646566'"
          @click="goBookshelf(bookDatas._id)"
        />
        <div class="read-box">
          <van-goods-action-button
            color="#d43e02"
            text="开始阅读"
            @click="goReadbook(bookDatas._id, bookDatas.title)"
          />
        </div>
        <div class="add-box">
          <van-goods-action-button
            color="#fff"
            text="加入书架"
            @click="addBookShelt()"
          />
        </div>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import "../assets/less/detail.less";
import "../mainurl.js";
export default {
  name: "Dtetail",

  data() {
    return {
      value: 0,
      activeNames: ["0"],

      // 书架总数量
      bookCount: 0,

      //书本详情数据
      bookDatas: [],

      //商品信息
      product: {
        count: 1,
      },

      //是否展示简介
      isShow: false,

      // 书本id
      ids: "",
      // 作者其他书籍数据
      otherBooks: [],

      // 书评书籍
      bookReviewData: [],

      //
      rating: [],
      // 是否存在
      isExit: true,
    };
  },

  created() {
    //截取id
    // this.ids = this.$route.params.id;
    this.ids = this.$route.query.id;

    // 书本详情
    this.booksDetail();
  },
  // // 过滤器
  filters: {
    formatNum: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },

  methods: {
    // 返回上一级
    goBack() {
      this.$router.push({ name: "Bookshop" });
    },
    // 去阅读
    goBookshelf(id) {
      // 携带_id跳转
      this.$router.push({ name: "Bookshelf", query: { id } });
      // this.$router.push({ name: "Bookshelf", params: { id } });
    },
    // 去阅读
    goReadbook(id, title) {
      // 携带_id跳转
      this.$router.push({
        name: "Readbook",
        query: { id, title, routerName: "Detail" },
      });
    },

    // 点击展示
    onClick() {
      this.isShow = !this.isShow;
    },

    // 获取书本详情数据
    booksDetail() {
      
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: `http://novel.kele8.cn/book-info/${this.ids}`,
      })
        .then((result) => {
          this.$toast.clear();

          let data = result.data;
          let img = data.cover;
          img = unescape(img).substring(7, img.length);
          data.cover = img;
          //
          this.bookDatas = data;
          
          if (!this.bookDatas.rating) {
            this.isExit = false;
          } else {
            this.rating = this.bookDatas.rating;
            this.isExit = true;
            this.value = this.rating.score / 2;
          }
          this.getBookByauthor(this.bookDatas.author);
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    // 作者的其他书籍
    getBookByauthor(author) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: `http://novel.kele8.cn/author-books?author=${author}`,
      })
        .then((result) => {
          this.$toast.clear();
        
          let otherBooks = result.data.books;
          for (let i = 0; i < otherBooks.length; i++) {
            let img = otherBooks[i].cover;
            img = unescape(img).substring(7, img.length);
            otherBooks[i].cover = img;
          }
          this.otherBooks = otherBooks;
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    // 加入书架
    addBookShelt() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      // 是否存在
      if (this.bookDatas._id) {
        let arr = [];
        arr.push(this.bookDatas);

        let book = localStorage.getItem("books")
          ? JSON.parse(localStorage.getItem("books"))
          : [];
        //
        if (!book.find((book) => book._id == this.bookDatas._id)) {
          book.push(this.bookDatas);
          localStorage.setItem("books", JSON.stringify(book));
        }
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>