// pages/index/near-search/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    KeyWord:null,
    list:[],
    history:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
      let history = wx.getStorageSync("searchHistory")
      if(!history){
        history = []
      }
    this.setData({ history: history})
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
  onKeyword(e){
    this.setData({ KeyWord:e.detail.value})
  },
  deleteHistory(){
    this.setData({history:[]})
    wx.removeStorageSync("searchHistory")
  },
  addHistory(keyword){
    let index = this.data.history.indexOf(keyword)
    if(index > -1){
      this.data.history.splice(index,1)
    }
    this.data.history.unshift(keyword)
    wx.setStorageSync("searchHistory",this.data.history)
    this.setData({history:this.data.history})
  },
  cancel(){
    if (this.data.KeyWord === "") {
      wx.navigateBack({
        
      })
      return
     }
    this.search({detail:{value:this.data.KeyWord}})
    // this.setData({KeyWord:"",list:[]})
  },
  doSearch(e){
    let keyword = getApp().ed(e,"keyword")
    this.search({detail:{value:keyword}})
  },
  search(e){
    this.setData({KeyWord:e.detail.value})
    getApp().api.get("WxPlaceAPI", { KeyWord:this.data.KeyWord}).then(it =>{
      if (it.length > 0){
          this.addHistory(this.data.KeyWord)
        } else{
          getApp().toast("未找到任何信息")
        }
        this.setData({list:it})
    })
  },
  nav(e){
    let location = this.data.list[getApp().ed(e,"index")].Location
    getApp().openLocation(parseFloat(location.Lat),parseFloat(location.Lng));
  },
  call(e){
    let phone = getApp().ed(e,"phone")
    wx.makePhoneCall({
      phoneNumber: phone,
    })
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