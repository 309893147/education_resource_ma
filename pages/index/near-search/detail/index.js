// pages/index/near-search/detail/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    markers:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    this.setData({ uid: options.id})
    this.getDetail()
  },
  getDetail(){
    getApp().api.get("WxPlaceDetailsAPI", { uuid:this.data.uid}).then(it =>{
      this.data.markers = [{
        iconPath: '/r/location_green.png',
        id: 0,
        latitude: it.Location.Lat,
        longitude: it.Location.Lng,
        width: 19,
        height: 24
      }]
      wx.setNavigationBarTitle({
        title: "",
      })
      this.setData({detail:it,markers:this.data.markers})
    }).catch(getApp().toast)
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  call(){
    wx.makePhoneCall({
      phoneNumber: this.data.detail.Telephone,
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },
  nav() {
    getApp().openLocation(parseFloat(this.data.detail.Location.Lat),parseFloat(this.data.detail.Location.Lng));
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