<template>
    <div class="mian">
        <!-- 二级路由 -->
        <!-- 放商品列表 -->
        <div>
            <router-view></router-view>
        </div> 
        <!-- 导航栏 -->
        <van-tabbar v-model="activeName" inactive-color="#646566" active-color="#0C34BA" route>
            <van-tabbar-item :icon="item.icon" v-for="(item, index) in tabData" :key="index" :name="item.name" replace :to="item.path">
                <span>{{item.title}}</span>

                <!-- 具有插槽作用域的插槽 -->
                <template #icon="props">
                <img :src="props.active ? item.icon2 : item.icon1" />
                </template>
                
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: 'Main',
        data() {
            return {
                // 激活标签的名称(路由名) 也可用下标
                activeName:'Bookshop',
                tabData:[
                    {
                        title:'书城',
                        icon1: require('../assets/images/bookshop.png'),
                        icon2: require('../assets/images/bookshop1.png'),
                        isShow:true,
                        name:'.Bookshop',
                        path: '/bookshop'
                    },
                     {
                        title:'分类',
                        icon1: require('../assets/images/hot.png'),
                        icon2: require('../assets/images/hot1.png'),
                        isShow:false,
                        name:'Menu',
                        path: '/menu'
                    },
                     {
                        title:'书架',
                        icon1: require('../assets/images/bookrack.png'),
                        icon2: require('../assets/images/bookrack1.png'),
                        isShow:false,
                        name:'Bookshelf',
                        path: '/bookshelf'
                    },
                     {
                        title:'我的',
                        icon1: require('../assets/images/my.png'),
                        icon2: require('../assets/images/my1.png'),
                        isShow:false,
                        name:'My',
                        path: '/my'
                    },
                ]
            }
        },
        methods: {
            
        },
    }
</script>

<style lang="less" scoped>

    /deep/ .van-nav-bar__text{
        color: #e84203
        
    }
    
    .van-tabbar--fixed{
        border-top: 1px solid #ddd;
    }
    
    /deep/ .van-tabbar-item--active{
        color: #e84203 !important;

    }
    /deep/ .van-hairline--top-bottom{
        transform: translateZ(0);
    }

</style>