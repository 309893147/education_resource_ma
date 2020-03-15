// pages/register/house/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    house:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.getHouse(options.id)
    }
  },
  getHouse(id){
    getApp().api.get("BanUnitLine",{id:id}).then(
      it=>{
        this.setData({
          house:it
        })
      }
    ).catch()
  },
  checkOne(e){
    let index =  getApp().ed(e,"index")
    this.data.house.forEach(it =>{
      it.selected = false
    })
    this.data.house[index].selected = true
    this.setData({house:this.data.house,selected:this.data.house[index]})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  confirm(){
    getApp().getUtil("event").emit("chooseHouse",this.data.selected)
    wx.navigateBack({
      delta: 4
    })
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