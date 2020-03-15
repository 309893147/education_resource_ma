// pages/index/banner/index.js
let WxParse = require('../../../wxParse/wxParse.js');
require("../../../wxParse/wxParse.js")
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({title:options.title})
      let data = getApp().getUtil("store").get("banner")
      
    WxParse.wxParse('article', 'html', data.replace(/=\"\"/g, '').replace(/, \"/g, ''),this, 0);
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