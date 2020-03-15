// pages/index/notice/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    list: [ ],
      pagesize:20,
      pageindex:1,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

      
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  getNotice(){
    let pageindex = this.data.pageindex;
    getApp().api.get("WxNoticeLine", { pageindex:pageindex}).then(it =>{
       this.setData({list:it})
    })
  },
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    getApp().checkHouse()
    this.getNotice()
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