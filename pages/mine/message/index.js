// pages/mine/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenu: "all",
    messages:[],
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessageList()
  },
  getMessageList(){
    getApp().api.get("SysMsgOwner").then(
      (res)=>{
        this.setData({
          messages:res
        })
      }
    ).catch(getApp().toast)
  },
  markRead(e){
    let index =  getApp().ed(e,"index")
    let item = this.data.messages[index]
    getApp().api.get("SysMsgOwnerRead", { id: item.id, st: item.st},true,true).then(()=>{
      
    })
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
    this.getMessageList()
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