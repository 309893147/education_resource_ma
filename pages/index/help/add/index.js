// pages/index/help/add/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    content: "",
    max: 200,
    images: [],
    messageStatus: true

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },
  /**切换状态 */
  changeMessage() {
    this.setData({
      messageStatus: !this.data.messageStatus
    })
  },

  /**
   * @description:订阅消息申请。
   */
  appliaction() {
    let that = this;
    if (this.data.messageStatus) {
      wx.requestSubscribeMessage({
        tmplIds: ['oqwhmufGK206nDUnpN8pPDz5kwsWwpOr_mUQUJTvx8g'],
        success(res) { 
            console.log(res)
        },
        // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个，请填写申请的模板ID
        complete() {
          that.submit();
        },
        fail(e) {
          console.log(e)
        }
      })
    } else {
      this.submit();
    }
  },


  deleteImage(e) {
    let index = getApp().ed(e, "index")
    this.data.images.splice(index, 1)
    this.setData({
      images: this.data.images
    })
  },
  addImage() {
    getApp().getUtil("util").uploadImage((url) => {
      this.data.images.push(url)
      this.setData({
        images: this.data.images
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },
  onContent(e) {
    if (this.data.content.length > this.data.max) {
      return
    }
    this.setData({
      content: e.detail.value
    })
  },
  submit() {
    if (!this.data.content) {
      getApp().toast("请输入内容")
      return
    }
    getApp().api.post("/ma/user/ticket", {
      content: this.data.content,
      images: this.data.images.join(",")
    }).then(() => {
      getApp().toast("添加成功", getApp().back)
    }).catch(getApp().toast)
  },
  onShow() {
    getApp().checkHouse((house) => {
      this.house = house
    })
  }
})