// pages/index/help/add/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    content: "",
    max: 200,
    images:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.user = getApp().getUser()
  
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  onContent(e) {
    if (this.data.content.length > this.data.max) {
      return
    }
    this.setData({ content: e.detail.value })

  },
  deleteContactImage(e) {
    let index = getApp().ed(e, "index")
    this.data.images.splice(index, 1)

    this.setData({ images: this.data.images })
  },
  addImage() {
    getApp().getUtil("util").uploadImage((url) => {
      let images = this.data.images;
      images.push(url)
      this.setData({ images: images })
    })
  },
  submit(){
    let data = this.data;
    if(!data.content){
      getApp().toast("请输入吐槽内容")
      return
    }
    let payLoad={
      remark:data.content,
    }
    payLoad.uid = this.user.id
    payLoad.name = this.user.name ||this.user.nickName
    if(data.images!=0){
      payLoad.images = data.images.join(",")
    }
    getApp().api.post("ComplaitAdd",payLoad).then(
      (res)=>{
        getApp().toast("意见反馈成功");
        setTimeout(()=>{
          wx.navigateBack()
        },500)
      }
    ).catch(getApp().toast)
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