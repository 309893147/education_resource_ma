// pages/index/help/add/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    content: "",
    max: 200,
    ratingTime: null, //及时性
    ratingService: null, //服务态度
    ratingFriend: null //友好沟通
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.id = options.id
    this.type = options.type
    this.user = getApp().getUser()
  },

  onRating(e) {

    let key = getApp().ed(e, "key")
    this.data[key] = parseInt(getApp().ed(e, "index")) + 1
    this.setData({
      max: 200,
      ratingTime: this.data.ratingTime,
      ratingService: this.data.ratingService,
      ratingFriend: this.data.ratingFriend
    })
  },


  submit() {
    if (!this.data.ratingTime) {
      getApp().toast("请对及时性评分")
      return
    }
    if (!this.data.ratingService) {
      getApp().toast("请对服务态度评分")
      return
    }
    if (!this.data.ratingFriend) {
      getApp().toast("请对友好沟通评分")
      return
    }
    if (!this.data.content) {
      getApp().toast("请填写评价")
      return
    }
    let url = "ComplaitComment"
    if(this.type === 'help'){
      url = "UserFindPostComment"
    }
    getApp().api.post(url, {
      uid: this.user.id,
      uName: this.user.name || this.user.nickName,
      star: this.data.ratingTime,
      star1: this.data.ratingService,
      star2: this.data.ratingFriend,
      remark: this.data.content,
      id: this.id
    }).then(it => {
      getApp().toast("评价成功", getApp().back)
    }).catch(getApp().toast)
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
  addImage() {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})