// pages/mine/help/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      name: "全部",
      key: ""
    }, {
      name: "待处理",
      key: "CREATED"
    }, {
      name: "处理中",
      key: "PROCESSING"
    },
    {
      name: "已处理",
      key: "FINISH",
    }, {
      name: "已取消",
      key: "CANCELED"
    }
    ],
    // tabs: [{
    //   name: "未受理",
    //   key: "CREATED"
    // }, {
    //     name: "已受理",
    //     key: "ACCEPTED"
    //   }, {
    //     name: "处理中",
    //     key: "PROCESSING"
    //   }, {
    //     name: "异常关闭",
    //     key: "CLOSED"
    //   }, {
    //     name: "已完成",
    //     key: "FINISH"
    //   }, {
    //     name: "已取消",
    //     key: "CANCELED"
    //   }],
    pagesize: 20,
    pageindex: 0,
    currentMenu: "CREATED",
    status: 0,
    // uid: getApp().getUser().id,
    // iphone: getApp().isIphoneX(),
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: getApp().getUser()
    })
  },
  onTab(e) {
    let tab = this.data.tabs[getApp().ed(e, "index")]
    let currentMenu = tab
    this.setData({
      currentMenu: currentMenu
    })
    this.getList()
  },
  getList() {
    let menu = this.data.currentMenu
    if (!menu.page) {
      menu.page = 0
      menu.size = 20
    }
    let payLoad = {
      size: menu.size,
      page: menu.page,
    }
    if (menu.key) {
      payLoad.status = menu.key
    }
    getApp().api.get("/ma/user/ticket", payLoad).then(
      it => {
        let list = menu.list
        if (menu.page == 0) {
          list = []
        }
        it.content.forEach(item => {
          item.contentText = item.content
          // s.map(it => {
          //   return it.content
          // })
          // item.pic = item.contents.map(it => {
          //   return it.images
          // }).join(",").split(",")
          item.pic = item.images.split(",")

          item.time = item.createTime

          // item.time = getApp().getTime(item.createTime)
        })
        // if (!it.content || !it.content.length) {
        //   menu.page = menu.page - 1
        // }
        if (it.content && it.content.length) {

          list = list.concat(it.content)
          menu.list = list
          this.setData({
            tabs: this.data.tabs,
            currentMenu: this.data.currentMenu
          })
        } else {
          if (this.data.currentMenu.list && this.data.currentMenu.list.length) {
            getApp().toast("没有更多了")
          }
        }
      }
    ).catch(getApp().toast)
  },
  openItem(e) {
    let item = this.data.currentMenu.list[getApp().ed(e, "index")]
    wx.navigateTo({
      url: 'detail/detail?id=' + item.id,
    })
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
    getApp().checkHouse()
    this.onTab({
      currentTarget: {
        dataset: {
          index: 0
        }
      }
    })
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
    let menu = this.data.currentMenu;
    menu.page = 0;
    this.setData({
      currentMenu: menu
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.currentMenu.page = this.data.currentMenu.page + 1;
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})