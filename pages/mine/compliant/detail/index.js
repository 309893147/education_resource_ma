// pages/index/house/detail/index.js
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
    this.id = options.id 
    this.type = options.type
    
    this.setData({ user:getApp().getUser(),type:this.type || null})
    if (this.type === "help") {
      wx.setNavigationBarTitle({title:"求助详情"})
      return
    }
    
  },
  getHelpDetail(){
    getApp().api.get("FindPostLine", { id: this.id, staffid:"2"+this.data.user.id }).then(it => {
      it.time = getApp().getTime(it.AddTime)
      it.pic = it.pic && it.pic.split(",") || []
      if (it.plog) {
        it.plog.forEach(item => {
          item.AddTime = getApp().getTime(item.AddTime)
        })
      }
      this.setData({ compliant: it })
    }).catch(getApp().toast)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  getDetail(){
    getApp().api.get("ComplaitLine",{id:this.id}).then(it =>{
        it.time = getApp().getTime(it.AddTime)
        it.pic = it.pic && it.pic.split(",") || []
        if(it.plog){
          it.plog.forEach(item =>{
            item.AddTime = getApp().getTime(item.AddTime)
          })
        }
        this.setData({compliant:it})
    }).catch(getApp().toast)
  },
  cancel(){
    if(this.type === 'help'){
      this.cancelHelp();
      return
    }
    getApp().api.post("ComplaitCancel",{uid:this.data.user.id,name:this.data.user.name||this.data.user.nickName,id:this.data.compliant.id}).then(it =>{
        getApp().toast("取消成功",getApp().back)
    }).catch(getApp().toast)
  },
  cancelHelp(){
    getApp().api.post("UserFindPostCancel", { id: this.id }).then(it => {
      getApp().toast("取消成功", getApp().back)
    }).catch(getApp().toast)
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    if(this.type === 'help'){
      this.getHelpDetail()
      return
    }
    this.getDetail()
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

  },
  callService(){

    wx.navigateTo({
      url: '../review/index?id=' + this.id+"&type="+this.type,
    })
  }
})