<template>
  <div class="history">
    <van-nav-bar
      title="阅读历史"
      right-text="清除"
      fixed
      left-arrow
      @click-left="goBack()"
      @click-right="removeAll()"
    />

    <HistoryBox
      v-for="(value, index) in hisDetail"
      :item="value"
      :key="index"
    ></HistoryBox>
  </div>
</template>

<script>
import HistoryBox from "../components/HistoryBox.vue";
export default {
  name: "History",

  components: {
    HistoryBox,
  },

  data() {
    return {
      // 阅读历史
      historyBook: [],

      // 阅读历史书本 id
      historyId: "",

      // 详情
      hisDetail: [],
    };
  },
  created() {
    this.getHistory();
    this.historyBook = localStorage.getItem("booksData")
      ? JSON.parse(localStorage.getItem("booksData"))
      : [];
  },


  methods: {

    // 获取历史阅读的数据
    getHistory() {
      let historyBook = localStorage.getItem("booksData")
        ? JSON.parse(localStorage.getItem("booksData"))
        : [];

      this.historyBook = historyBook;
      
      if (this.historyBook != []) {
        let historyId = [];
        let hisDetail = [];
        for (let i = 0; i < this.historyBook.length; i++) {
          historyId.push(this.historyBook[i].id);

          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 0,
          });

          this.axios({
            method: "GET",
            url: "http://novel.kele8.cn/book-info/" + this.historyBook[i].id,
          })
            .then((result) => {
              this.$toast.clear();
              

              let data = result.data;
              
              let img = data.cover;
              img = unescape(img).substring(7, img.length);
              data.cover = img;

              // hisDetail = data;
              hisDetail.push(data);
              
            })
            .catch((err) => {
              this.$toast.clear();
            });
        }
        this.historyId = historyId;
        this.hisDetail = hisDetail;
      }

      
    },
    goBack() {
      this.$router.go(-1);
    },

    removeAll() {
      
      this.$dialog
        .confirm({
          title: "清除阅读记录",
          message: "是否清除所有阅读记录?",
          confirmButtonColor: "#e84203",
        })
        .then(() => {
          
          // this.bookShelfData.splice(index, 1);

          // 删除localStorage中数据
          // var historyBook = JSON.parse(localStorage.getItem("historyData"));
          localStorage.removeItem("booksData");
           
          // historyBook.splice(index, 1);

          let historyBook = localStorage.getItem("booksData")
            ? JSON.parse(localStorage.getItem("booksData"))
            : [];
 
          localStorage.setItem("booksData", JSON.stringify(historyBook));
             
          this.getHistory();
          

        })
        .catch(() => {
          console.log("删除失败!");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.history {
  padding-top: 46px;
  min-height: 620px;
  background-color: #fafafa;
}
/deep/ .van-icon {
  color: #fff;
}

/deep/ .van-nav-bar__text {
  color: #fff;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}

/deep/ .van-nav-bar__content {
  background-color: #d43e02;
}
</style>