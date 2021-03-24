<template>
    <div class="pubilcbox">
     <div class="menu-box clearfix">
      <!-- 侧边栏 -->
      

      <!-- 书本 -->
      <div class="pro-box">
        <div class="coll-box-item clearfix">
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
    </div>
    </div>
</template>

<script>
    import '../assets/less/publiclist.less'
    export default {
        name:"PublicList",
    }
</script>

<style lang="less" scoped>

</style>