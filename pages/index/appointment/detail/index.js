// pages/index/appointment/detail/index.js
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
    if(options.item){
      this.setData({
        item:JSON.parse(options.item)
      })
      
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getDetail(){
    let item = this.data.item;
    getApp().api.get("WxMyAppointmentInfo", { uuid: item.Uuid}).then(
      res=>{
        this.setData({
          detail: res
        })
      }
    ).catch(getApp().toast)
  },
  cancel(){
    let uuid = this.data.detail.Uuid;
    getApp().confirm(()=>{
      getApp().api.get("WxAppointmentCancel", { uuid: uuid }).then(
        res => {
          getApp().toast("取消成功");
          setTimeout(() => {
            wx.navigateBack()
          }, 500)
        }
      ).catch(getApp().toast)
    },"确定此次预约服务吗？")
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDetail()
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