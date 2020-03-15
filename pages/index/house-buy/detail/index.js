// pages/index/house-buy/detail/index.js
let WxParse = require('../../../../wxParse/wxParse.js');
require("../../../../wxParse/wxParse.js")
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
    let item = getApp().getUtil("store").get("houseBuy")
    this.setData({detail:item})
    WxParse.wxParse('article', 'html', item.Context.replace(/=\"\"/g, '').replace(/, \"/g, ''), this, 0);
  },
  callService(){
      wx.makePhoneCall({
        phoneNumber:this.data.detail.Tel
      })
  },
})