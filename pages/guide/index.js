// pages/guide/index.js
let WxParse = require('../../wxParse/wxParse.js');
require("../../wxParse/wxParse.js")
Page({

  /**
   * Page initial data
   */
  data: {
    login:false,
    guide:""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getGuide();
  },
  getGuide(){
    getApp().api.get("WxGuideApi",{type:0},true).then(
      (res)=>{
        this.setData({
          guide:res
        })
        this.showContent()
      }
    ).catch(getApp().toast)
  },
  showContent(){
    if(!this.data.guide){
        return
    }
    WxParse.wxParse('article', 'html', this.data.guide.Context.replace(/=\"\"/g, '').replace(/, \"/g, ''), this, 0);
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    getApp().checkHouse()
    getApp().getUserInfo(() => {
      this.setData({
        login: true
      })
      this.getGuide()
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})