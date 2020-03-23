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
    this.type = options.type

    this.setData({
      user: getApp().getUser(),
      type: this.type || null
    })
    if (this.type === "help") {
      wx.setNavigationBarTitle({
        title: "求助详情"
      })
      return
    }

  },
  getHelpDetail() {
    getApp().api.get("/ma/user/ticket/detail?id=" + this.id).then(it => {
      it.time = getApp().getTime(it.createTime);//提交时间
      it.imagesList = it.images ? it.images.split(",") : []
      it.assigneeName = it.assignee.map(item => {
        return item.employeeName
      }).join(",");
      it.handlerName = it.handler.map(item => {
        return item.employeeName
      }).join(",");
      it.events.forEach(event => {
        event.createTime = getApp().getTime(event.createTime)
      })
      it.feedback.forEach(item => {
        item.createTime = getApp().getTime(item.createTime)
      })

      this.setData({
        compliant: it
      })
    }).catch(getApp().toast)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  cancel() {
    getApp().api.post("/ma/user/ticket/cancel?id=" + this.id).then(it => {
      getApp().toast("取消成功", getApp().back)
    }).catch(getApp().toast)
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

    this.getHelpDetail()

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

  },
  callService() {

    wx.navigateTo({
      url: '../review/index?id=' + this.id,
    })
  }
})