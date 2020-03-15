// pages/register/position/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [
      {
        name: "七彩花园B3栋2单元"
      }, {
        name: "七彩花园B3栋5单元"
      }, {
        name: "七彩花园B3栋4单元"
      }, {
        name: "七彩花园B3栋6单元"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.getcommudity(options.id)
    }
    if(options.name){
      this.setData({
        commudityName:options.name
      })
    }
  },
  getcommudity(id){
    getApp().api.get("BanUnitMsg",{channel_id:id}).then(
      it=>{
        this.setData({
          commudity: it
        })
      }
    ).catch()
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