import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.prototype.$store = store

import 'lib-flexible/flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'

// 引入组件框架
import { 
  Button,
  NavBar,
  Form,
  Field,
  Popup,
  Toast,
  Tabbar,
  TabbarItem,
  Search,
  Swipe,
  SwipeItem,
  NoticeBar,
  Divider,
  Grid, 
  GridItem,
  Card,
  Sidebar,
  SidebarItem,
  Image as VanImage,
  TreeSelect,
  Rate,
  Collapse,
  CollapseItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Empty,
  Uploader,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  Icon,
  Dialog,
  ImagePreview,
  ActionSheet,
  List,
  Lazyload,
  Skeleton,
  Circle
} from 'vant' 

// 

// 注册Button组件
Vue
.use( Button )
.use(NavBar)
.use(Form)
.use(Field)
.use(Popup)
.use(Toast)
.use(Tabbar)
.use(TabbarItem)
.use(Search)
.use(Swipe)
.use(SwipeItem)
.use(NoticeBar)
.use(Divider)
.use(Grid)
.use(GridItem)
.use(Card)
.use(VanImage)
.use(Sidebar)
.use(SidebarItem)
.use(TreeSelect)
.use(Rate)
.use(Collapse)
.use(CollapseItem)
.use(GoodsAction,)
.use(GoodsActionIcon,)
.use(GoodsActionButton)
.use(Empty)
.use(Uploader)
.use(Cell)
.use(CellGroup)
.use(Tab)
.use(Tabs)
.use(Icon)
.use(Dialog)
.use(ImagePreview)
.use(ActionSheet)
.use(List)
.use(Lazyload)
.use(Skeleton)
.use(Circle)



// 注册路由
Vue.use(VueAxios, axios)
Vue.filter('decimal', (v, n = 2) => {
  return v.toFixed(n);
})
//  格式化日期
Vue.filter('formatDate', (v, format) => {
  // 创建日期对象
  let date = new Date();
  // 格式化年份
  let year = date.getFullYear().toString();
  if (/(y+)/.test(format)) {
    var content = RegExp.$1;
    format = format.replace(content, year.slice(year.length - content, year.length))
  }

  //格式化月份、日份、时、分、秒
  let o = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };
  return format;

})

 

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
