// pages/mine/complaints/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenu: "0",
    menu: [
      {
        name: "全部",
        key: "0"
      }, {
        name: "待处理",
        key: "1"
      }, {
        name: "处理中",
        key: "2"
      }, {
        name: "已处理",
        key: "3"
      }, {
        name: "已取消",
        key: "4"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ user: getApp().getUser() })
    this.onTab({ currentTarget: { dataset: { index: 0 } } })
  },
  onTab(e) {
    let tab = this.data.menu[getApp().ed(e, "index")]
    let currentMenu = tab
    this.setData({ currentMenu: currentMenu })
    if (!currentMenu.list) {
      this.getList()
    }
  },
  openItem(e){
    let item = this.data.currentMenu.list[getApp().ed(e,"index")]
    getApp().getUtil("store").put("compliant",item)
    wx.navigateTo({
      url: 'detail/index?id='+item.id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getList() {
    let menu = this.data.currentMenu
    if (!menu.page) {
      menu.page = 0
    }
    menu.size = 20
    let payLoad = {
      uid: this.data.user.id,
      pagesize: menu.size,
      pageindex: menu.page,
      zt: this.data.currentMenu.key,
      mm: "365",
      title: "",
    }
    if (menu.key == 0) {
      delete payLoad.zt
    }
    getApp().api.get("ComplaitList", payLoad).then(
      (it) => {
        let list = menu.list
        if(menu.page == 0){
          list = []
        }
        it.forEach(item =>{
          item.pic = item.pic.split(",")
          item.time = getApp().getTime(item.AddTime)
        })
        list = list.concat(it)
        menu.list = list
        
        this.setData({
          menu:this.data.menu,
          currentMenu:this.data.currentMenu

        })
      }
    ).catch(getApp().toast)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getApp().checkHouse()
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
    this.data.currentMenu.page = 0
    this.setData({
      currentMenu: this.data.currentMenu
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let m = this.data.currentMenu;
    m.page = m.page+1;
    this.setData({
      currentMenu:currentMenu
    })
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})