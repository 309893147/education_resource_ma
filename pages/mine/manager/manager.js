// pages/mine/manager/manager.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  formSubmit(e) {
    var me = this;
    const value = e.detail.value;
    // value.userId = userId;
    if (value.mobile && value.password && value.userId) {
      var serverUrl = app.serverUrl;
      // 调用后端
      wx.request({
        url: serverUrl + '/manage/manager',
        data: value,
        method: "POST",
        header: { 'content-type': 'application/json'},
        success: function (res) {
          console.log(res.data);
          wx.hideLoading();
          if (res.data.status == 200) {
            wx.showToast({
              title: '账号申请成功',
              duration: 1500,
              icon: "success",
              success: function () {
                setTimeout(function () {
                  wx.navigateTo({
                    url: '/pages/address/address',
                  })


                }, 1000)
              }
            })
          }
        }
      })


    } 
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