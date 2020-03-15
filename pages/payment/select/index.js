// pages/payment/select/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [{
      name: "A",
      items: [{
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }]
    }, {
      name: "B",
      items: [{
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }]
    }, {
      name: "C",
      items: [{
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }, {
        name: "天上里",
        address: "重庆武隆江北"
      }]
    }]
    , select:"",
    selectMenu:[
      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
    ], searchValue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  goScroll(e){
    let key = getApp().ed(e,"key")
    this.setData({
      select:key
    })
  },
  getSearchValue(e){
    this.setData({
      searchValue:e.detail.value
    })
  },
  clearSearchValue(e){
    this.setData({
      searchValue:""
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})