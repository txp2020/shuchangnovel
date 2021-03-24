<template>
  <div class="bookshelf">
    <van-nav-bar
      title="书架"
      left-text="返回"
      left-text-color="#fff"
      left-arrow
      @click-left="goBack(id)"
      fixed
    />
    <div class="empty" v-if="bookShelfData.length == 0">
      <van-empty description="还没有添加书哦, 快去添加吧!" />
    </div>
    <div class="shlef-box clearfix" v-else>
      <div
        class="book-box fl"
        v-for="(item, index) in bookShelfData"
        :key="index"
        @click="goReadbook(item._id, item.title)"
      >
        <div class="book-box-img">
          <img class="img auto-img" :src="item.cover" alt="" srcset="" />
        </div>
        <div class="book-box-title">
          <div class="title">{{ item.title }}</div>
        </div>
        <van-icon
          name="delete"
          size="16px"
          color="#d43e02"
          @click.stop="deleteBook(index)"
        />
      </div>
    </div>

    <div class="add-box" @click="goMenu">
      <img class="auto-img" src="../assets/images/add.png" />
    </div>
  </div>
</template>

<script>
import "../assets/less/bookshelf.less";
export default {
  name: "Bookshelf",

  data() {
    return {
      // 书架数据
      bookShelfData: [],

      id: "",
    };
  },

  created() {
    //截取detail传过来的 id
    this.id = this.$route.params.id;

    this.getBookData();
  },

  methods: {
    // go() {
    //   this.$router.push({ name: "Test" });
    // },
    goDetail(id) {
      // 携带_id跳转
      this.$router.push({ name: "Detail", params: { id } });
    },
    goReadbook(id,title) {
      // 携带_id跳转
      
      this.$router.push({name: 'Readbook',query:{id,title,routerName : "Bookshelf"}});
    },
    goMenu() {
      // 携带_id跳转
      this.$router.push({ name: "Menu" });
    },
    goBack(id) {
      if (this.id) {
        this.$router.push({ name: "Detail", params: { id } });
      } else {
        this.$router.go(-1);
      }
    },
    // 获取书架数据
    getBookData() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }
      let bookShelfData = localStorage.getItem("books")
        ? JSON.parse(localStorage.getItem("books"))
        : [];

      this.bookShelfData = bookShelfData;
    },
    // 删除书架书本
    deleteBook(index) {
      // 书架中删除一个
      this.$dialog
            .confirm({
              title: "移除所选书籍",
              message: "同时移除本地缓存?",
              confirmButtonColor: "#e84203",
            })
            .then(() => {
              this.bookShelfData.splice(index, 1);
        
              // 删除localStorage中数据
              var booksData = JSON.parse(localStorage.getItem("books"));
        
              booksData.splice(index, 1);
        
              localStorage.setItem("books", JSON.stringify(booksData));

            }).catch(() => {
              console.log("删除失败!");
            }); 
    },
  },
};
</script>

<style lang="less" scoped>
</style>