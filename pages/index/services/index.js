// pages/index/services/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    getApp().getCommunityInfo((it)=>{
      this.setData({community:it})
    })
    this.getList()
  },
  callService(){
    wx.makePhoneCall({
      phoneNumber: this.data.community.Tel,
    })
  },
  wantThis(e){
    let item =  this.data.servers[getApp().ed(e,"index")]
    if(item.Flg === false){
      return
    }
    getApp().api.get("WxReserveAPI", { DeskId: item.Uuid}).then(
      it=>{
        item.Flg = false
        this.setData({servers:this.data.servers})
      }
    ).catch(getApp().toast)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  getList(){
    getApp().api.get("WxHousingServer",{fw:1}).then(it =>{
      this.setData({
        servers:it
      })
    }).catch(getApp().toast)
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

})