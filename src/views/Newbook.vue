<template>
  <div class="newbook">
    <van-nav-bar left-arrow left-text="新书" fixed @click-left="goBack" />
    <van-tabs v-model="activeIndex" @click="onClick(activeIndex)" fixed>
      <van-tab
        :title="item.title"
        v-for="(item, indexs) in titleData"
        :key="indexs"
      >
        <div class="all">
          <div class="menu-info-box">
            <div class="menu-aside">
              <div class="aside">
                <div
                  class="aside-item"
                  :class="{ active: activekey == index }"
                  v-for="(item, index) in activeIndexs == 0
                    ? maleDatas
                    : femaleDatas"
                  :key="index"
                  @click="toggleMenu(index)"
                >
                  <div class="item-box">{{ item.name }}</div>
                </div>
              </div>
            </div>

            <div class="menu-content">
              <div class="pro-box" v-if="newBookData.length > 0">
                <div
                  class="coll-box-item clearfix"
                  @click="goDetail(item._id)"
                  v-for="(item, index) in newBookData"
                  :key="index"
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
                      <div class="coll-price fl">作者： {{ item.author }}</div>
                      <div class="coll-price fr">
                        保存率:
                        <span class="coll-reten">
                          {{ item.retentionRatio }} %</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <van-empty description="暂无新书数据哦~去看看其他的吧" />
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import "../assets/less/newbook.less";
export default {
  name: "Newbook",

  data() {
    return {
      activeIndex: 0,
      activeIndexs: 0,

      titleData: [{ title: "男生" }, { title: "女生" }],

      maleDatas: [
        { name: "玄幻" },
        { name: "武侠" },
        { name: "都市" },
        { name: "游戏" },
        { name: "竞技" },
      ],

      femaleDatas: [
        { name: "同人" },
        { name: "科幻" },
        { name: "游戏" },
        { name: "古代言情" },
        { name: "现代言情" },
      ],

      // 激活侧边栏下标
      activekey: 0,

      newBookData: [],
    };
  },

  created() {
    this.getContentData(this.activekey, this.activeIndexs);
  },

  methods: {
    // 跳转到详情页
    goDetail(id) {
      // 携带_id跳转
      this.$router.push({ name: "Detail", query: { id } });
    },
    goBack() {
      this.$router.go(-1);
    },
    onClick(indexs) {
      if (this.activeIndexs == indexs) {
        return;
      }
      this.activeIndexs = indexs;

      this.getContentData(indexs);
    },
    // 切换
    toggleMenu(index) {
      //
      if (this.activekey == index) {
        return;
      }
      this.activekey = index;

      this.getContentData(index);
    },

    // 侧边栏数据(排榜)
    getContentData(index) {
      // ("getContentData this.activeIndexs==>",this.activeIndexs)
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      let url = "";
      if (this.activeIndexs == 0) {
        url = `http://novel.kele8.cn/category-info?gender=male&type=new&major=${this.maleDatas[index].name}&minor=&start=0&limit=5`;
      } else if (this.activeIndexs == 1) {
        url = `http://novel.kele8.cn/category-info?gender=male&type=new&major=${this.femaleDatas[index].name}&minor=&start=0&limit=5`;
      }

      this.axios({
        method: "GET",
        url: url,
      })
        .then((result) => {
          this.$toast.clear();

          let newBookDatas = result.data.books;
          for (let i = 0; i < newBookDatas.length; i++) {
            let img = newBookDatas[i].cover;
            img = unescape(img).substring(7, img.length);
            newBookDatas[i].cover = img;
            let _id = newBookDatas[i]._id;
          }
          this.newBookData = newBookDatas;
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