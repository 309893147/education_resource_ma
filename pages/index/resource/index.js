// pages/index/resource/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resource:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me=this
    console.log(options.id) 
    me.getResource(options.id)
  },

  getResource(id){
    var params={
      basicTypeId: id
    }
    getApp().api.get("/resource", params).then(it => {
      console.log(it)
      this.setData({
        resource: it.content
      })
    })
  },

  goDetailList(e){
    let id = e.currentTarget.dataset.id;
    let content = e.currentTarget.dataset.content;

    console.log("resourceID" + id)
    console.log("contentzzz" + content)

    getApp().getUtil("store").put("resource", content)
    wx.navigateTo({
      url: '/pages/index/resource/detail/detail?id=' + id,
    })

    // getApp().getUserInfo((data) => {
    //   wx.navigateTo({
    //     url: '/pages/index/resource/detail/detail?id=' + id,
    //   })
    // }, () => {
    //   this.showBind()
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})