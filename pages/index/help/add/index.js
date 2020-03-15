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

  },
  deleteImage(e){
    let index = getApp().ed(e,"index")
    this.data.images.splice(index,1)
    this.setData({images:this.data.images})
  },
  addImage(){
    getApp().getUtil("util").uploadImage((url)=>{
      this.data.images.push(url)
      this.setData({images:this.data.images})
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  onContent(e){
    if(this.data.content.length > this.data.max){
      return
    }
    this.setData({ content: e.detail.value})
  },
  submit(){
    if(!this.data.content){
      getApp().toast("请输入内容")
      return
    }
    getApp().api.post("WxPatrolPost", { ovName:this.house.ovName,content:this.data.content,images:this.data.images.join(",")}).then(()=>{
      getApp().toast("添加成功",getApp().back)
    }).catch(getApp().toast)
  },
  onShow(){
    getApp().checkHouse((house)=>{
      this.house = house
    })
  }
})