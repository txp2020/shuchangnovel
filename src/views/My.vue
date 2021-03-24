<template>
  <div class="my">
    <div
      class="my-bg"
      :style="{ backgroundImage: `url('${userInfo.userBg}')` }"
      v-if="tokenStrings"
    >
      <van-uploader class="upload-box" :after-read="sendBg" />
    </div>
    <div class="my-box" v-if="tokenStrings">
      <div class="my-box-info">
        <div class="my-info-top">
          <div class="my-info-img">
            <img class="auto-img" :src="userInfo.userImg"/>
          </div>
          <div class="my-info-text">
            <div class="my-name">{{userInfo.nickName}}</div>
            <div class="my-text">{{userInfo.desc == '' ? '还未填写！' : userInfo.desc}}</div>
          </div>
        </div>

        <div class="my-info-bot">

          <div class="account-box" v-for="(item,index) in titleData" :key="index" @click="item.name == 'Mored' ? mored() : goPage(item.name)">
            <div class="account-img img-box">
              <img :src="item.url" />
            </div>
            <div class="account-text">{{item.title}}</div>     
          </div>

        </div>
      </div>
    </div>

    <div class="record-box" v-else>
      <van-nav-bar title="我的" />
      <div class="record">
        <div class="hello-box">HELLO!</div>
        <div class="welcome-box">欢迎来到书畅小说~</div>
        <div class="user-box">用户还未登陆,请点击登录或注册</div>
        <div class="btn-box" @click="goLogin">登录/注册</div>
        <div class="info-center" @click="goInfo">消息中心</div>
        <div class="respon" @click="goRespon">负责声明</div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/my.less";
import '../mainurl.js'
export default {
  name: "My",

  data() {
    return {
      //
      titleData: [
        { 
          title: "个人资料",
          name: 'Account',
          url:require('../assets/images/account.png')
        },
        { 
          title: "安全中心",
          name: 'Secure',
          url:require('../assets/images/secure.png')
        },
        { 
          title: "阅读历史",
          name: 'History',
          url:require('../assets/images/history.png')
        },
        { 
          title: "更多",
          name: 'Mored',
          url:require('../assets/images/more.png')
        },
      ],

      // 记录用户信息
      userInfo: [],

      // 
      tokenStrings:''
    };
  },

  created() {
    let tokenString = localStorage.getItem("__tk");
    this.tokenStrings = tokenString;
    if (tokenString) {
      // 获取用户信息
      this.getUserInfo();
    }
  },

  methods: {
    
    goLogin(){
      this.$router.push({ name: "Login" });
    },

    goInfo(){
      this.$router.push({ name: "Info" });
    },
    goRespon(){
      this.$router.push({ name: "Respon" });
    },

    // 跳转到目标页面
    goPage(name) {
        this.$router.push({name});
    },
    mored(){
      this.$toast("敬请期待更多!");
    },
    
    // 获取用户信息
    getUserInfo() {
      let tokenString = localStorage.getItem("__tk");
      this.tokenStrings = tokenString;
      if (!tokenString) {
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
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // 
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == "A001") {
            this.userInfo = result.data.result[0];
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    // 上传背景
    sendBg(file) {
      // 
      // 允许上传文件类型
      let type = ['gif', 'png', 'jpg', 'jpeg'];

        //允许最大文件大小 1MB
        let size = 1;

        //判断文件类型
        let fileType = file.file.type.split('/')[1];
        if (type.indexOf(fileType) === -1) {
          this.$toast(`文件类型只支持${type.join(',')}`);
          return;
        }

        //判断文件大小 B, 1024B = 1KB, 1024KB = 1MB
        let fileSize = file.file.size / 1024 / 1024;
        // 
        if (fileSize > size) {
          this.$toast(`文件允许最大不能超过${size}MB`);
          return;
        }

        //处理base64的标记data:image/jpeg;base64,
        let base64 = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, '');
        // 

        //发起请求
        let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
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
        method: "POST",
        url: "/updateUserBg",
        data: {
          appkey: this.appkey,
          tokenString,
          imgType: fileType,
          serverBase64Img: base64
        },
      })
        .then((result) => {
          this.$toast.clear();
          // 
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 'I001') {
            this.userInfo.userBg = result.data.userBg;
          }

          this.$toast(result.data.msg);

        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    // 跳转到目标页面
    goPage(name) {
        this.$router.push({name});
    }
  },
};
</script>