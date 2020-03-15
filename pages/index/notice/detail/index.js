// pages/index/notice/detail/index.js
let WxParse = require('../../../../wxParse/wxParse.js');
require("../../../../wxParse/wxParse.js")
Page({

  /**
   * Page initial data
   */
  data: {
    detail:{
      title:"只做最走心的-环保装修攻略",
      image: "https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1",
      date:"2019-03-27  16:00:32",
      readcount:123,
      content:"身份划分：房屋产权登记人、产权人家属、租客，依据手机号、姓名、房号与后台中预置的产权人信息进行自动校验，匹配认证。若自动认证失败，可致电客服中心协助认证或到客服中心前台协助认证；产权人家属、租客身份认证时需产权人验证通过，还需到客服中心或致电客服中心进行确认后方可认证完成；并且产权人可对认证在其房屋名下的用户进行管理。"
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.data.time = options.time
    this.getDetail()
    this.markRead()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  goBack(){
    wx.navigateBack({
      
    })
  },
  markRead(){
    getApp().api.get("NoticeRead",{id:this.data.id},true).then(it=>{})
  },
  getDetail(){
    let vm = this
    getApp().api.get("SearchListOwnerLine", { id: this.data.id, tname:"tz"}).then(it =>{
      it.time = this.data.time
      this.setData({detail:it})
      let content = "<div>"+it.Remark+"</div>"
      WxParse.wxParse('article', 'html', content.replace(/=\"\"/g, '').replace(/, \"/g, ''), vm, 0);
    })
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

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