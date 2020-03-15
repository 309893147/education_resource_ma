// pages/index/house/detail/index.js
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
    this.id = options.id
    this.getDetail()
  },
  getDetail(){
    getApp().api.get("WxMyRentalInfoAPI",{Uuid:this.id}).then(it =>{
        this.setData({detail:it})
    }).catch(getApp().toast)
  },
  cancel(){
    getApp().api.get("WxReserveCancelAPI", { uuid: this.data.detail.tab.Uuid}).then(()=>{
      getApp().toast("取消成功",()=>{
        this.getDetail()
      })
    }).catch(getApp().toast)
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