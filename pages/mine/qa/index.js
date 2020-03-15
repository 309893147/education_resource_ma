// pages/mine/qa/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    problem:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    getApp().getCommunityInfo((it) => {
      this.setData({ community: it })
    })
    this.getProblem();
  },
  openQA(e){
    let item = this.data.problem[getApp().ed(e,"index")]
    getApp().getUtil("store").put("banner",item.Context)
    wx.navigateTo({
      url: '/pages/index/banner/index?title='+item.Title,
    })
  
  },
  getProblem(e){
    getApp().api.get("WxGuideApi",{type:1}).then(
      (res)=>{
        this.setData({
          problem:res
        })
      }
    ).catch(getApp().toast)
  },
  openItem(e){
    let index = getApp().getIndex(e)
  },
  callService(){
    let tel = this.data.community.Tel;
    wx.makePhoneCall({
      phoneNumber: tel,
    })
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