// pages/index/house-buy/add/index.js
Page({

  /**
   * Page initial data
   */
  data: {
      data:{
        type:"买房"
      }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  getValue(e) {
    this.data.data[getApp().ed(e, "key")] = e.detail.value
    this.setData({ data: this.data.data })
  },
  submit() {
    let msg = null
    let data = this.data.data;
    if (!data.price) {
      msg = "请输入预期价格"
    }
    if (!data.name) {
      msg = "请输入姓名"
    }
    if (!data.tel) {
      msg = "输入联系电话"
    }
    if (!data.area) {
      msg = "请输入房屋大小"
    }
    if (!data.title) {
      msg = "请输入地段"
    }
    if (msg) {
      getApp().toast(msg)
      return
    }
    
    getApp().api.post("WxRentalTabAPI", this.data.data).then(() => {
      getApp().toast("添加成功,稍后我们的置业顾问会联系您", getApp().back)
    }).catch(getApp().toast)
  },
})