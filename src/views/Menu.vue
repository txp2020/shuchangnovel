<template>
  <div class="menu">
    <van-nav-bar left-arrow fixed left-text="分类" @click-left="goBack" />
      <van-tabs v-model="activeName" animated>
            <van-tab title="男频">
                <div class="menu-info-box">
                    <div class="menu-info clearfix">
                        <div class="menu-info-one fl" v-for="(item, index) in maleData" :key="index" @click="goType(item.name)">
                            <div class="img-box">
                                <img class="img-item-box auto-img" :src="item.bookCover[0]"/>
                            </div>
                            <div class="book-text clearfix">
                                <span class="book-name fl">{{item.name}}</span>  
                                <span class="book-count fr">{{item.bookCount | formatNum}} 本</span>  
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        <van-tab title="女频">
            <div class="female-info">
                <div class="female-box clearfix">
                    <div class="female-box-item fl" v-for="(item, index) in femaleData" :key="index" @click="goType(item.name)">
                        <div class="female-left fr">
                            <div class="name">{{item.name}}</div>
                            <div class="num">{{item.bookCount | formatNum}}本</div>
                        </div>
                        <div class="female-right fl">
                            <img class="img-box auto-img" :src="item.bookCover[0]"/>
                        </div>
                    </div>
                </div>
            </div>
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
import "../assets/less/menu.less";
export default {
  name: "Menu",

  data() {
    return {
        activeName: 0,
        
        // 男频数据
        maleData: [],
        
        // 女频数据
        femaleData: [],
        
    };
  },

    created() {
        // 获取分类数据
        this.getMenuData();

    },
     // 过滤器
    filters: {
      formatNum: function (value) {
        return (value / 10000).toFixed(1) + "万";
      },
    },

  methods: {

    goBack() {
      this.$router.go(-1);
    },

    // goClassify() {
    //   this.$router.push({ name: "Classify" });
    // },

    // 获取分类型数据
    getMenuData() {
      
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
         
          let males= result.data.male;

          
          let females = result.data.female;
          
          for (let i = 0; i < males.length; i++) {
            let imgs = males[i].bookCover[0];
            imgs = unescape(imgs).substring(7,imgs.length);
            males[i].bookCover[0] = imgs;
            
          }
          this.maleData = males;
            
          females.map( v =>{
            
            let img = v.bookCover[0];
            img = unescape(img).substring(7,img.length);
            v.bookCover[0] = img;
          })
          this.femaleData = females;
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    goType(typeName){
      this.$router.push({ name: "Type", query: { typeName } });
    }
  },
};
</script>

<style lang="less" scoped>
</style>