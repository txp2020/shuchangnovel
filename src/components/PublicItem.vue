<template>
    <div class="menu-box clearfix">
        <div class="menu-aside">
        <div class="nav-box">
          <div class="latte-box" :class="{ active: activeKey == index }">
            <div class="latte-text">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import '../assets/less/pubilcitem.less'
    export default {
        name:"PublicItem",
    }
</script>

<style lang="less" scoped>

</style>