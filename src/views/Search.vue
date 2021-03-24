<template>
  <div class="search">
    <van-nav-bar left-text="返回" left-arrow fixed @click-left="goBack">
      <template #right>
        <div class="home-search">
          <van-search
            v-model="word"
            ref="search"
            placeholder="请输入搜索关键词"
            shape="round"
            @search="search"
          />
        </div>
      </template>
    </van-nav-bar>
    <div class="search-box clearfix" v-if="word.length > 0">
        <div class="search-item " v-for="(item, index) in keyWord" :key="index" @click="searchOnclick">
          <div class="pro-name">{{item}}</div> 
        </div>
    </div>
    <div class="search-word-box" v-else>
      <div class="search-hot-box">
        <div class="hotword-title searchword-title">搜索热词</div>
        <div class="hotword-item">
          <span class="sp-hotword sp-word" v-for="(item, index) in hotwordData" :key="index">{{item.word}}</span>
        </div>
      </div>

      <!-- 搜索历史 -->
      <div class="search-history">
        <div class="history-title searchword-title clearfix" v-if="wordData.length > 0">
          <div class="title-box fl">搜索历史</div>
          <div class="delete-box fr" @click="deleteHistory">
            <van-icon name="delete" color="#bbb" size="15"/>
          </div>
        </div>
        <div class="history-item">
          <span class="sp-word" v-for="(item,index) in wordData" :key="index">{{item}}</span>
        </div>
      </div>

      <!-- 全站热搜 -->
      <div class="station-box">
        <div class="station-title">全站热搜</div>
        <div class="station-item">
          <span class="sp-word" v-for="(item, index) in stationData" :key="index" @click="goDetail(item.book)">{{item.word}}</span>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import PubliceBg from "../components/PubliceBg.vue";
import "../assets/less/search.less";
export default {
  name: "Search",

  // 注册组件
  components: {
    PubliceBg,
  },

  data() {
    return {
        // 关键字
        word:'',
        // 关键词列表
        keyWord:[],

        // 搜索热词
        hotwordData:[],

        // 搜索历史
        historyData:[],

        // 存储搜索过词
        wordData:[],

        // 全站热搜的数据
        stationData:[],

        isShow:false
        
    };
  },
  created() {
    this.$nextTick(() => {
      // 
      // 获取元素节点
      let searchIpt = this.$refs.search.querySelector("[type = 'search']");
      
      //获取焦点
      searchIpt.focus();
    });
    // 
    this.searchHotword();
    // 获取历史搜索词
    this.getHistory();

    // 全站搜索
    this.stationSearch();

    // 搜索历史数据
    this.wordData = JSON.parse(localStorage.getItem("historyWord")) ? JSON.parse(localStorage.getItem("historyWord")) : [];
 
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    // 热门搜索
    search() {
      
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: `https://novel.kele8.cn/auto-complete?query=${this.word}`,
        
      })
        .then((result) => {
          this.$toast.clear();
          this.keyWord = result.data.keywords;
          
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    // 点击
    searchOnclick(){

      if (this.wordData.indexOf(this.word) == -1 && this.word != '') {
        this.wordData.push(this.word);
      }
      let historyWord = localStorage.getItem("historyWord") ? JSON.parse(localStorage.getItem("historyWord")) : [];
      localStorage.setItem("historyWord",JSON.stringify(this.wordData));

      this.word = '';
    },
    // 获取历史搜索词
    getHistory(){
      this.wordData = localStorage.getItem("historyWord") ? JSON.parse(localStorage.getItem("historyWord")) : [];
      
    },

    // 删除搜索历史

    deleteHistory(){
      localStorage.removeItem("historyWord");
      this.wordData = JSON.parse(localStorage.getItem("historyWord")) ? JSON.parse(localStorage.getItem("historyWord")) : [];
    },

    // 搜索热词
    searchHotword(){
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: `https://novel.kele8.cn/search-hotwords`,
        
      })
        .then((result) => {
          this.$toast.clear();
          let hotword = result.data.searchHotWords;
          // 随机下标
          let index = Math.floor(Math.random() * hotword.length);

          
          // 判断从随机下标开始截取是否能够截取12条数据
          if (index + 12 > hotword.length) {
            this.hotwordData = hotword.splice(index - 12, 12);
          } else {
            this.hotwordData = hotword.splice(index, 12);
          }

        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    // 全站热搜
    stationSearch(){
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: `https://novel.kele8.cn/hot-books`,
        
      })
        .then((result) => {
          this.$toast.clear();
          this.stationData = result.data.newHotWords;
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    goDetail(id){
        // this.$router.push({name:'Detail', params: { id }})
        this.$router.push({name:'Detail', query: { id }});
    }
  },
};
</script>

<style lang="less" scoped>
</style>