// pages/index/house-buy/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    infoAll:[],
    page: 1
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getAll()
  },
  getAll(){
    getApp().api.get("WxRentNoticeApi", { pageSize:20,pageIndex:this.data.page,st:0}).then(
      (it)=>{
        let list = this.data.infoAll
        if(this.data.page ===1){
            list = []
        }
        list = list.concat(it)
        this.setData({
          infoAll:list
        })
      }
    )
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  openItem(e){
    let index = getApp().ed(e,"index")
    let item = this.data.infoAll[index]
    getApp().getUtil("store").put("houseBuy",item)
    wx.navigateTo({
      url: 'detail/index',
    })
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
    this.data.page = 1
    this.getAll()
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
      this.data.page = this.data.page+1
      this.getAll()
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})