// pages/index/resource/detail/detail.js
let WxParse = require('../../../../wxParse/wxParse.js');
require("../../../../wxParse/wxParse.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:{},
      resourceId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this
    me.resourceId = options.id
    console.log(options.id)
    me.getResourceDetail(options.id)
    me.getResourceComment(options.id)

    let data = getApp().getUtil("store").get("resource")
    console.log(data)
    WxParse.wxParse('article', 'html', data.replace(/=\"\"/g, '').replace(/, \"/g, ''), this, 0);

  },

  getResourceDetail(id){
    getApp().api.get("/resource/detail?id="+id).then(it => {
      console.log(it)
      this.setData({
        resource: it
      })
    })
  },

  getResourceComment(id) {
    var params={
      resourceId:id
    }
    getApp().api.get("/comment", params).then(it => {
      console.log(it)
      this.setData({
        commentList: it.content
      })
    })
  },

  goDownload(e){
    var link =e.currentTarget.dataset.link;
    console.log(link)
    wx.playVoice({
      filePath: link
    })
  wx.downloadFile({
    url: link, //仅为示例，并非真实的资源
    success(res) {
      console.log('111')
      var filePath = res.tempFilePath
      wx.openDocument({
        filePath: filePath,
        success: function (res) {
          console.log('打开文档成功')
        }
      })
    },
    fail: function (err) {
      console.log(err)
    }
    
  })
  },

  formSubmit(e) {
    var me = this;
    const value = e.detail.value;
    var content = value.content;
    // console.log(content);
    var user = wx.getStorageSync("currentUser");
    if (user) {
      var userId = user.id;
      if (content && userId) {
        // 调用后端
        let params = {
          userId: userId,
          content: content,
          resourceId: me.resourceId
        }

        getApp().api.post("/comment", params).then(it => {
          this.data.loading = false
          wx.showToast({
            title: "评论成功",
            duration: 3000,
            icon: "none"
          })

        }).catch((e) => {
          getApp().toast(e, getApp().back)
          this.data.loading = false
        })


      } else {
        wx.showModal({
          title: '提示',
          content: '评论内容您还没有填写',
          showCancel: false
        })
      }
    } else {
      wx.showToast({
        title: '微信授权登录后,才能发表评论',
        icon: 'none'

      })
    }

  },


  onReachBottom: function () {
    // console.log("onReachBottom");
    var me = this;


    var currentPage = me.data.page;
    var totalpage = me.data.total;
    var records = me.data.records;
    // console.log(totalpage);
    // console.log(currentPage);
    if (records === 0) {
      wx.showToast({
        title: '暂无评论,写个评论吧',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    // 判断当前页数和总页数是否相等
    if (currentPage * records === totalpage * records) {
      wx.showToast({
        title: '加载完毕,没有更多评论啦!',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      //下拉时pageNum+1
      mydata.pageNum++;
      me.getComments(mydata.pageNum);
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