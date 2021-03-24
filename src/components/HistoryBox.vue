<template>
  <div class="history-box">
    <div class="history-big clearfix">
      <div class="his-left fl">
          <img class="auto-img" :src="item.cover" />
      </div>
      <div class="his-right fl">
        <div class="his-name">{{item.title}}</div>
        <div class="his-info">{{item.lastChapter}}</div>
        <div class="his-bot clearfix">
          <div class="his-author fl">作者：{{item.author}}</div>
          <div class="his-num fr">人气 <span>{{item.latelyFollower | formatNum}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/history.less";

export default {
  name: "HistoryBox",

  props: {
    item: {
      type: Object,
      default() {
        return {
          title: "名称",
          copyrightInfo: "简介",
          author: "作者",
          latelyFollower: "6.0万",
        };
      },
    },
  },

  // 过滤器
  filters: {
    formatNum: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style lang="less" scoped>
</style>