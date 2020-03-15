// pages/mine/help/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{ name: "全部", active: true, key: 0 }, { name: "待处理", key: 1 }, { name: "处理中", key: 2 }, { name: "已处理", key: 3 }, { name: "已取消", key:4 }],
    pagesize:20,
    pageindex:0,
    currentMenu:null,
    status:0,
    uid:getApp().getUser().id,
    iphone: getApp().isIphoneX(),
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ user: getApp().getUser() })
    this.onTab({ currentTarget: { dataset: { index: 0 } } })
  },
  onTab(e) {
    let tab = this.data.tabs[getApp().ed(e, "index")]
    let currentMenu = tab
    this.setData({ currentMenu: currentMenu })
    if (!currentMenu.list) {
      this.getList()
    }
  },
  getList(){
    let menu = this.data.currentMenu
    if (!menu.page) {
      menu.page = 1
      menu.size = 20
    }
    let payLoad = {
      uid: this.data.user.id,
      pagesize: menu.size,
      pageindex: menu.page,
      zt: menu.key,
      mm: "365",
    
    }
    if (menu.key == 0) {
      delete payLoad.zt
    }
    getApp().api.get("UserFindPostList",payLoad).then(
      it=>{
        let list = menu.list
        if (menu.page == 1) {
          list = []
        }
        it.forEach(item => {
          item.pic = item.pic.split(",")
          item.time = getApp().getTime(item.AddTime)
        })
        list = list.concat(it)
        menu.list = list

        this.setData({
          tabs: this.data.tabs,
          currentMenu: this.data.currentMenu

        })
      }
    ).catch(getApp().toast)
  },
  openItem(e) {
    let item = this.data.currentMenu.list[getApp().ed(e, "index")]
    getApp().getUtil("store").put("compliant", item)
    wx.navigateTo({
      url: '../compliant/detail/index?type=help&id=' + item.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // onTab(e) {
  //   let tabs = this.data.tabs;
  //   tabs.forEach(it => {
  //     it.active = false
  //   })
  //   tabs[e.detail].active = true;
  //   let status = this.data.status;
  //   this.setData({ tabs: tabs, status: tabs[e.detail].status })
  //   this.getList()
  // },
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
    this.setData({
      pageindex:0
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageindex:this.data.pageindex+1,
    })
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})