// pages/mine/information/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manager: {
      mobile: "",
      password : "",
      reason: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getManagerInfo();
  },
  getManagerInfo() {
   
  },
  getValue(e) {
    
    let name = getApp().ed(e, "name");
    let info = this.data.manager;
    info[name] = e.detail.value;
    console.log(info)
    this.setData({
      manager: info
    })
  },
 
 
  submit() {
    let info = this.data.manager;
    console.log("222"+info)
    let payload = {
      password: info.password,
      mobile: info.mobile,
      reason: info.reason
    }

    getApp().api.post("/user/manager", payload).then(
      (res) => {
        getApp().toast("修改成功")
        wx.setStorageSync("currentUser", res)
      }
    ).catch(getApp().toast)
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