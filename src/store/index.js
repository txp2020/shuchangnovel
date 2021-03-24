import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 类似于vue中的data
  state: {
    // 当前小说的id
    bid:'',
  
  
    //  小说当前章节
    CurrentChapter:[],
    // 小说当前章节下标
    currentIndex:0,
    // 章节列表
    chapter:null
   
  },

  mutations:{
    updateChapter: function (state,payload) {
      state.chapter = payload
      console.log("state.chapter====>",state.chapter);
    },
    updateIndex: function (state,index) {
      state.currentIndex = index
      console.log("state.currentIndex====>",state.currentIndex);
    }
  }
})
