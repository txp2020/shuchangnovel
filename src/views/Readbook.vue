<template>
  <div class="readbook" :style="'background:' + bgColor">
    <div class="return-box">
      <van-popup v-model="show" position="top" :style="{ height: '39px' }">
        <van-nav-bar
          :title="bookTitle"
          left-text="返回"
          right-text="首页"
          left-arrow
          fixed
          @click-left="goBack(id)"
          @click-right="goHome()"
        />
      </van-popup>
    </div>
    <van-skeleton title  :row="20" :loading="vanLoading">
    <div
      class="content-box"
      :style="
        'background:' +
        bgColor +
        ';' +
        'font-family:' +
        char +
        ';' +
        'color:' +
        textColor +
        ';' +
        'font-size:' +
        size +
        'px'
      "
      @click="onShow"
    >
      <div class="contents">
        <div class="contents-title">{{ title }}</div>
        <div class="contents-cont">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="本章节已完!"
            offset="8"
            @load="loadData"
          >
            <p v-for="(v, i) in booksData" :key="i">{{ v }}</p>
            <!-- <p v-for="(v, i) in currentContent" :key="i">{{ v }}</p> -->
          </van-list>
        </div>
        <div class="contents-btn clearfix">
          <div class="upper fl" @click.stop="upper">上一章</div>
          <div class="next fr" @click.stop="next">下一章</div>
        </div>
      </div>
    </div>
    </van-skeleton>

    <!-- 下 -->
    <div class="show-box">
      <van-popup v-model="show" position="bottom">
        <div class="popup">
          <div class="bottom-box">
            <div class="bottom">
              <div class="img-text" @click="showCatalog">
                <img class="auto-img" src="../assets/images/mu.png" />
              </div>
            </div>
            <div class="bottom">
              <div class="img-text" @click="night">
                <img class="auto-img" :src="isNight ? url2 : url1" />
              </div>
            </div>
            <div class="bottom" @click="showSetup">
              <div class="img-text">
                <img class="auto-img" src="../assets/images/she1.png" />
              </div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="setup">
      <van-popup
        class="setup-box"
        color="#000"
        v-model="isShow"
        position="bottom"
        :style="{ height: '26%' }"
      >
        <div class="typeface-box">
          <div class="center clearfix">
            <div class="increase fl crease" @click="charSizeIncrease">Aa+</div>
            <div class="size fl">{{ size }}px</div>
            <div class="decrease fl crease" @click="charSizeDecrease">Aa-</div>
            <div class="typeface fl crease" @click="changeText">
              {{ isChar ? "微软雅黑" : "楷体" }}
            </div>
          </div>
          <div class="bgColor-box">
            <div class="bgColor">
              <div
                class="color"
                v-for="(item, index) in colors"
                :key="index"
                @click="changeBgColor(index)"
              >
                <div
                  class="color-item"
                  :style="'backgroundColor:' + item.color"
                ></div>
                <div class="color-text">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>

    <!-- 目录 -->
    <div class="catalog-box">
      <van-popup
        v-model="isCatalog"
        position="left"
        :style="{ height: '100%' }"
      >
        <div class="title-box">
          <div class="fixed-box">
            <div class="title">{{ bookTitle }}</div>
            <div class="cata">目录</div>
            <div class="clearfix">
              <div class="updated fl">最新更新时间: {{ update }}</div>
              <div class="reverse fr" @click="reverse()">
                {{ isReverse ? "顺序" : "倒序" }}
              </div>
            </div>
          </div>
        </div>
        <div class="chapter-box">
          <div
            class="chapter"
            v-for="(item, index) in chapterData"
            :key="index"
            @click.stop="onClick(index)"
            :class="currentIndex == index ? 'active' : ''"
          >
            {{ item.title }}
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Form, Toast } from "vant";
import "../assets/less/readbook.less";
export default {
  name: "Readbook",
  data() {
    return {
      //
      show: false,
      // 显示设置面板
      isShow: false,
      // 显示目录
      isCatalog: false,
      //设置白天/夜间模式
      isNight: false,
      url1: require("../assets/images/bai.png"),
      url2: require("../assets/images/ye.png"),
      // 是否微软雅黑
      isChar: true,
      // 字体样式
      char: "Microsoft YaHei",
      size: 14,
      // 背景颜色
      colors: [
        {
          name: "默认",
          color: "#dbbc86",
        },
        {
          name: "白色",
          color: "#fff",
        },
        {
          name: "粉色",
          color: "pink",
        },
        {
          name: "淡绿",
          color: "#c1ffc6",
        },
      ],
      bgColor: "#dbbc86",
      // 字体颜色
      textColor: "#333",
      // 储存章节目录
      chapterData: [],
      // 最新更新时间
      update: "",

      // 储存章节内容
      chapterContent: [],

      // 书本id(跳转携带过来的书本id)
      id: "",
      // 所有章节内容
      // content: [],

      currentContent: "",
      // 根据id获取一本书本
      bookDatas: [],

      // currentIndex: 0,
      // 触发加载
      loading: false,
      //是否全部加载完成数据
      finished: false,
      //每次触底懒加载截取 n 条数据
      dataCount: 13,
      // dataCount: 2,

      //开始截取购物袋数据位置
      startIndex: 0,
      // 章节题目
      title: "",

      // 开始显示的数据
      booksData: [],

      // 是否倒序
      isReverse: false,

      // 书本名称
      bookTitle: "",

      // 用于判断跳转过来的页面
      routerName: "",
      // 本地储存的数组(用于判断是否已阅读过了)
      bookData: [],

      // 本地储存(用于历史记录)
      hisBook:[],

      // 骨架屏
      vanLoading:true
    };
  },

  created() {
    //截取detail传过来的 id和书本题目
    this.id = this.$route.query.id;
    this.bookTitle = this.$route.query.title;
    this.routerName = this.$route.query.routerName;

    // this.startIndex = 0;
    // this.finished = false;
    // // 清空数组(不能放在前面,否则会再次加载)
    // this.booksData = [];

    // 从本地拿出原有的数据
    this.bookData = JSON.parse(localStorage.getItem("booksData"))
      ? JSON.parse(localStorage.getItem("booksData"))
      : [];
    // 书本点开阅读器, 如果已经阅读过了,则执行以下代码
    for (let i = 0; i < this.bookData.length; i++) {
      //
      if (this.bookData[i].id == this.id) {
        // 章节内容重新赋值(在 this.getContent(); 方法中处理了, 在这里赋值即可)
        this.currentContent = this.bookData[i].currentContent;
        // 章节标题
        this.title = this.bookData[i].title;
        // 书本题目
        this.bookTitle = this.bookData[i].bookTitle;
        this.update = this.bookData[i].update;
        // 记得把章节目录发射回Vuex中修改再进行下面的赋值
        this.$store.commit("updateChapter", this.bookData[i].chapter);
        // 记得把章节目录发射回Vuex中修改再进行下面的赋值, 否则会影响下一章
        this.$store.commit("updateIndex", this.bookData[i].currentIndex);
        this.chapterData = this.chapter;
        this.vanLoading = false;
        return;
      } else {
        // 否则直接从第一章开始阅读
        this.$store.commit("updateIndex", 0);
      }
    }

    // 获取章节目录
    // promise 这样可以先加载完章节目录在执行内容请求(因为请求章节内容是需要用到章节目录中的数据)
    let x1 = this.getChapterData();
    Promise.all([x1]).then((res) => {
      this.getContent();
    });
    // this.vanLoading = false;
  },


  computed: {
    // 获取章节列表
    ...mapState(["chapter", "currentIndex"]),
  },

  methods: {

    // 获取章节目录
    getChapterData() {
      return new Promise((pass, rej) => {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          duration: 0,
        });

        // 获取书籍源
        this.axios
          .get(
            "http://novel.kele8.cn/book-sources?view=summary&book=" + this.id
          )
          .then((res) => {
            this.$toast.clear();
            // 根据书籍源获取 章节目录
            this.axios
              .get("http://novel.kele8.cn/book-chapters/" + res.data[0]._id)
              .then((res) => {
                this.chapterData = res.data.chapters;
               
                // 把章节目录发射到Vuex那边储存
                this.$store.commit("updateChapter", this.chapterData);

                pass();
                // next();
              });
          })
          .catch((err) => {
            this.$toast.clear();
          });
      });
    },

    // 获取章节内容
    getContent() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      // console.log("this.chapter.chapters[0]=====>", this.chapter);
      if (this.chapter != null) {
        this.axios({
          method: "GET",
          url:
            "http://novel.kele8.cn/chapters/" +
            encodeURIComponent(this.chapter[this.currentIndex].link),
        })
          .then((result) => {
            this.$toast.clear();
            // 章节标题
            this.title = result.data.chapter.title;
            // 章节内容
            this.chapterContent = result.data.chapter.cpContent;

            let update = result.data.chapter.updated;
            this.update = update.slice(0, 10);

            // 定义空数组(便于数据的处理)
            let content = [];

            // 切割数据
            content = this.chapterContent.split("\n");

            
            // 赋值
            this.currentContent = content;
            this.startIndex = 0;
            this.finished = false;
            // 清空数组(不能放在前面,否则会再次加载)
            this.booksData = [];
            // 预加载的段落数
            this.booksData = this.currentContent.slice(
              this.startIndex,
              this.startIndex + this.dataCount
            );
            

            
            // 判断书本是否存在(根据书本id判断)
            if (this.id) {
              // 定义一个空对象
              let obj = {};
              // 往空对象内添加内容
              obj.id = this.id;
              // 章节目录
              obj.chapter = this.chapterData;
              // 根据下标取章节内容
              obj.currentIndex = this.currentIndex;
              // 章节标题
              obj.title = this.title;
              // 书本的名称
              obj.bookTitle = this.bookTitle;
              // 当前章节的内容
              obj.currentContent = this.currentContent;
              obj.update = this.update;

             
              // 循环本地储存是这本书的属性
              for (let i = 0; i < this.bookData.length; i++) {
                // 判断刚进来的书本的id是否等于本地中的书本(即判断该本书是否阅读过,阅读过则从上次的推出的章节开始阅读)
                if (this.bookData[i].id == this.id) {
                  
                  // 从i 的位置开始去删除一位, 然后再替换
                  this.bookData.splice(i, 1, obj);
                  // 替换了新的内容后在存到本地
                  localStorage.setItem(
                    "booksData",
                    JSON.stringify(this.bookData)
                  );
                  return;
                }
              }
              
              // 先将该对象推入一个数组中
              this.bookData.push(obj);
              // 将该数组储存到本地储存
              localStorage.setItem("booksData", JSON.stringify(this.bookData));
            } else {
              return;
            }
            this.loading = false;
            this.vanLoading = false;
          })
          .catch((err) => {
            this.$toast.clear();
          });
      }
    },

    // 上一章
    upper() {
      let index = this.currentIndex - 1;
      // index = index >= 0 ? index : 0;

      if (index >= 0) {
        // index = index;
        this.$store.commit("updateIndex", index);
      } else {
        index = 0;
        this.$toast("本章已是第一章!");
        return;
      }

      this.startIndex = 0;
      this.finished = false;
      // 清空数组(不能放在前面,否则会再次加载)
      this.booksData = [];
      this.getContent();
      this.loading = false;

    },

    // 下一章
    next() {
      // 章节下标 -1
      let index = this.currentIndex + 1;
      // 判断当前下标是否大于章节目录的长度
      index =
        index <= this.chapter.length - 1 ? index : this.chapter.length - 1;
      // 若大于章节目录的长度则执行以下逻辑
      if (index >= this.chapter.length - 1) {
        this.$toast("本书已完结!");
        return;
      }
      // 记得把下标发射到vuex中去修改
      this.$store.commit("updateIndex", index);
      // 懒加载开始截取的下标初始化为 0
      this.startIndex = 0;
      //
      this.finished = false;
      // this.loading = true;
      // 懒加载截取的段落数初始化为空, 这样可以回到章节顶部
      this.booksData = [];
      // 调用下一章的内容
      this.getContent();
      // 记得把 触发加载 关闭
      this.loading = false;
    },

    // 点击翻转
    reverse() {
      this.isReverse = !this.isReverse;
      this.chapterData.reverse();
      this.$store.commit("updateChapter", this.chapterData);
    },

    // 点击目录章节跳转到相应的章节
    onClick(index) {
      this.$store.commit("updateIndex", index);
      this.startIndex = 0;
      this.finished = false;
      // this.loading = true;
      this.booksData = [];
      this.getContent();

      this.isCatalog = !this.isCatalog;
      this.show = !this.show;
    },
    // 返回
    goBack(id) {
      // 判断一下, 否则但书架数据为空时,返回失败
      if (id) {
        let book = JSON.parse(localStorage.getItem("books"))
          ? JSON.parse(localStorage.getItem("books"))
          : [];

        let bids = [];
        for (let i = 0; i < book.length; i++) {
          bids.push(book[i]._id);
        }

        // 判断书架是否存在该书本
        if (bids.indexOf(id) == -1) {
          this.$dialog
            .confirm({
              title: "加入书架",
              message: "是否确认加入书架?",
              confirmButtonText: "加入书架",
              cancelButtonText: "不了",
              confirmButtonColor: "#e84203",
            })
            .then(() => {
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
              // 请求当前书本的数据
              this.axios({
                method: "GET",
                url: `http://novel.kele8.cn/book-info/${id}`,
              })
                .then((result) => {
                  this.$toast.clear();
                  // 接收数据
                  let data = result.data;
                  // 图片处理
                  let img = data.cover;
                  img = unescape(img).substring(7, img.length);
                  data.cover = img;
                  //
                  this.bookDatas = data;
                  // 储存到本地, 方便加入书架时获取
                  // localStorage.setItem("name", JSON.stringify(this.bookDatas));
                  if (this.bookDatas._id) {
                    let arr = [];
                    arr.push(this.bookDatas);

                    let book = localStorage.getItem("books")
                      ? JSON.parse(localStorage.getItem("books"))
                      : [];
                    //
                    if (!book.find((book) => book._id == this.bookDatas._id)) {
                      book.push(this.bookDatas);
                      localStorage.setItem("books", JSON.stringify(book));
                    }
                  } else {
                    return;
                  }
                  // this.$router.push({ name: this.routerName, params: { id } });
                  this.$router.push({ name: this.routerName, query: { id } });

                  // this.$router.go(-1);
                })
                .catch((err) => {
                  this.$toast.clear();
                });
            })
            .catch((err) => {
              this.$toast.clear();
              // this.$router.push({ name: this.routerName, params: { id } });
              this.$router.push({ name: this.routerName, query: { id } });
              // this.$router.go(-1);
            });
        } else {
          // this.$router.push({ name: this.routerName, params: { id } });
          this.$router.push({ name: this.routerName, query: { id } });
          // this.$router.go(-1);
        }
      } else {
        // 否则回到书架
        // this.$router.push({ name: "Bookshelf"});
        this.$router.go(-1);
      }
    },
    // 返回首页
    goHome() {
      this.$router.push({ name: "Bookshop" });
    },
    onShow() {
      this.show = !this.show;
    },
    // 显示目录
    showCatalog() {
      this.isCatalog = !this.isCatalog;
    },
    // 显示设置
    showSetup() {
      this.isShow = !this.isShow;
      this.show = !this.show;
    },
    // 模式
    night() {
      if (this.isNight) {
        this.bgColor = "#dbbc86";
        this.textColor = "#333";
      } else {
        this.bgColor = "#2c2c2c";
        this.textColor = "#fff";
      }
      this.isNight = !this.isNight;
      // ("this.isNight===>",this.bgColor)
    },
    // 改变字体样式
    changeText() {
      if (!this.isChar) {
        this.char = "Microsoft YaHei";
      } else {
        this.char = "STXingkai";
      }
      this.isChar = !this.isChar;
    },
    // 字体大小
    charSizeIncrease() {
      if (this.size <= 24) {
        this.size += 2;
      }
    },
    charSizeDecrease() {
      if (this.size >= 12) {
        this.size -= 2;
      }
    },

    // 修改背景颜色
    changeBgColor(index) {
      this.bgColor = this.colors[index].color;
    },

    //懒加载数据
    loadData() {
      setTimeout(() => {
        //在currentContent截取数据
        let data = this.currentContent.slice(
          this.startIndex,
          this.startIndex + this.dataCount
        );

        //

        this.startIndex += this.dataCount;

        // 当前显示的段数
        this.booksData.push(...data);

        //如果当前截取数据不足13条数据，下次不可能截取的数据
        if (data.length < this.dataCount) {
          //没有数据可加载时，需要finished修改为true，这样可以不再onload事件
          this.finished = true;
        } else {
          //每次触发onload事件都需要将loading修改为false
          this.loading = false;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
</style>