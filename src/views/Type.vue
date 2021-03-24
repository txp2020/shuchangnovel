<template>
  <div class="type">
    <van-nav-bar :left-text="typeName" fixed left-arrow @click-left="goBack" />

    <div class="list-box" v-if=" TypeData.length > 0">
      <div class="list-box-item" v-for="(item, index) in TypeData" :key="index" @click="goDetail(item._id)" >
        <div class="item-img">
          <img class="auto-img img-box" :src="item.cover" />
        </div>
        <div class="item-text">
          <div class="item-text-top">
            <div class="item-title">{{item.title}}</div>
            <div class="item-content">{{item.shortIntro}}</div>
          </div>
          <div class="item-text-bot clearfix">
            <div class="item-author fl">作者：{{item.author}}</div>
            <div class="item-num fr">
              <span>人气</span>
              <span class="sp-num"> {{item.latelyFollower | formatNum}}</span>
            </div>
          </div>
        </div>
      </div>


    </div>
    <div class="empty" v-else>
      <van-empty description="暂无其他数据!" />
    </div>

  </div>
</template>

<script>
import "../assets/less/type.less";
export default {
  name: "Type",

  data() {
    return {
      // 类型标题
      typeName: "",

      // 类型数据
      TypeData: [],
    };
  },
  // 过滤器
  filters: {
    formatNum: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },

  created() {
    //截取detail传过来的 id
    this.typeName = this.$route.query.typeName;


    this.getTypeData();
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    // 请求分类的数据
    getTypeData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: `http://novel.kele8.cn/category-info?gender=male&type=hot&major=${this.typeName}&minor=&start=0&limit=20`,
      })
        .then((result) => {
          this.$toast.clear();
          let TypeData = result.data.books;
          for (let i = 0; i < TypeData.length; i++) {
            let imgs = TypeData[i].cover;
            imgs = unescape(imgs).substring(7, imgs.length);
            TypeData[i].cover = imgs;
          }
        //   this.TypeData = TypeData;

          var index = Math.floor(Math.random() * TypeData.length);
          
          // 
          if (index + 3 > TypeData.length) {
            this.TypeData = TypeData.splice(index - 10, 10);
          } else {
            this.TypeData = TypeData.splice(index, 10);
          }
         
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    goDetail(id) {
      // 携带_id跳转
      this.$router.push({ name: "Detail", query: { id } });
    },
  },
};
</script>
<style lang="less" scoped>
</style>