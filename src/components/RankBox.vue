<template>
    <div class="rankbox">
        <div class="rank-item" :class="{active: 'activeIndex == index'}" v-for="(item, index) in navData" :key="index" @click="activeNav(index, item)">{{item.title}}</div>
    </div>
</template>

<script>
    export default {
        name:'RankBox',

        //属性绑定
        props: {
            navData: {
                type: Array,
                default() {
                return [
                    {title: '标签1'},
                    {title: '标签2'},
                    {title: '标签3'},
                    {title: '标签4'},
                    {title: '标签5'},
                ];
                }
            }
        },
        data() {
            return {
                activeIndex:0,
            }
        },
        methods: {
            activeNav(index, item) {
                if (this.activeIndex == index) {
                    return;
                }

                this.activeIndex = index;

                //提供事件让父组件执行其他逻辑
                this.$emit('click-nav', item);
	        }
	    }

    }
</script>

<style lang="less" scoped>
    .rank-box {
        display: flex;
        background-color: #e8e8e8;
    }
    .rank-item {
        flex: 1;
        text-align: center;
        height: 44px;
        line-height: 44px;
    }

    .rank-item.active{
        background-color: #fff;
    }
</style>