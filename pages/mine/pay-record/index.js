// pages/mine/pay-record/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    list: [],
    loading:false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getRecord()
    wx.setNavigationBarTitle({
      title: '缴费记录',
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

  },

  getRecord() {
    this.setData({ loading:true})
    getApp().api.get("WxPayHistoryFee").then(it => {
      this.onResult(it)
      this.setData({loading:false})
    })
  },

  onResult(list) {
    let map = {}
    list.forEach(it => {
      if (!Array.isArray(map[it.out_trade_no])) {
        map[it.out_trade_no] = []
      }
      map[it.out_trade_no].push(it)
    })
    let result = []
    for(let key in map){
      let itemList = map[key]
      result.push({
        untiName: itemList[0].untiName,
        bidName: itemList[0].bidName,
        PayTime: itemList[0].PayTime,
        total: itemList[0].OverMoney,
        bill: itemList
      })
    }
    this.setData({list:result})
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