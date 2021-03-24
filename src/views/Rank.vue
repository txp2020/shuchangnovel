<template>
  <div class="rank">
    <div class="bg-fixed">
      <div class="rank-bg-box">
        <div class="rank-bg">
          <van-nav-bar left-text="返回" fixed left-arrow @click-left="goBack" />
        </div>
      </div>
    </div>

    <div class="all">
    
    <div class="rank-fixed">
      <div class="rank-box">
        <div class="rank-title">热文排榜</div>
        <div class="triangle"></div>
      </div>
    </div>

    <div class="menu-box clearfix">
      <!-- 侧边栏 -->
      <div class="menu-aside">
        <div class="nav-box">
          <div
            class="latte-box"
            :class="{ active: activeKey == index }"
            v-for="(item, index) in rankData"
            :key="index"
            @click="toggleMenu(index)"
          >
            <div class="latte-text">{{ item.title }}</div>
          </div>
        </div>
      </div>

      <!-- 书本 -->
      <div class="pro-box" v-if="RankingData.length > 0">
        <div
          class="coll-box-item clearfix"
          v-for="(item, index) in RankingData"
          :key="index"
          @click="goDetail(item._id)"
        >
          <div class="coll-img fl">
            <img class="auto-img" :src="item.cover" />
          </div>
          <div class="coll-content fr">
            <div class="coll-content-text">
              <div class="coll-name">{{ item.title }}</div>
              <div class="coll-enname">{{ item.shortIntro }}</div>
            </div>
            <div class="coll-price-del clearfix">
              <div class="coll-price fl">作者：{{ item.author }}</div>
              <div class="coll-price fr">保存率: <span class="coll-reten">{{ item.retentionRatio }}%</span> </div>
            </div>
          </div>
        </div>
      </div>

         <div v-else>
            <van-empty description="暂无数据哦~去看看其他的吧" />
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/rank.less";
export default {
  name: "Rank",
  data() {
    return {
      activeKey: 0,
      // 侧边栏数据(排榜)
      rankData: [],

      // 排榜id
      ids: "",

      //   排版数据
      RankingData: [],
    };
  },

  // 初始化数据
  created() {
    // 获取排行型数据
    // 传个默认值
    this.getInsideRankData(this.activeKey); 

  },

  _methods: {
    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },
    goDetail(id){
      // 携带_id跳转
      this.$router.push({name:'Detail', query: { id }});
    },
    toggleMenu(index) {
      
      if(this.activeKey==index) {
        return;
      }
      this.activeKey=index;
      
      this.getInsideRankData(index);
    },

    // 侧边栏数据(排榜)
    getInsideRankData(index) {
      let tokenString=localStorage.getItem("__tk");

      if(!tokenString) {
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
        url: "http://novel.kele8.cn/rank-category",
      })
        .then((result) => {
          this.$toast.clear();
          
          this.rankData=result.data.epub;
          

          
          // 下表所对应的id 号
          this.ids=this.rankData[index]._id;

          

          this.getRankData(this.ids);
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    // 获取排榜数据
    getRankData() {
      
      let tokenString=localStorage.getItem("__tk");

      if(!tokenString) {
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
        url: `http://novel.kele8.cn/rank/${this.ids}`,
      })
        .then((result) => {
          this.$toast.clear();
          

          let RankingDatas = result.data.ranking.books;
          for(let i = 0; i < RankingDatas.length; i++) {
            let img = RankingDatas[i].cover;
            img = unescape(img).substring(7,img.length);
            RankingDatas[i].cover = img;
            let id = RankingDatas[i]._id
          }
          this.RankingData = RankingDatas;
          // 
          // 
          return;
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
  },
  get methods() {
    return this._methods;
  },
  set methods(value) {
    this._methods=value;
  },
};
</script>

<style lang="less" scoped>
</style>