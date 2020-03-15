// pages/index/appointment/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    menu: [{ name: "全部", active: true, key: -1 }, { name: "待处理", key: 0 }, { name: "已处理", key: 1 }, { name: "已取消", key:2}],
      list:[{title:"装修办理预约",date:"2019-03-24 14:02:26",status:"已审核"}],
      pagesize:20,
      pageindex:0,
      status:0,
      uid:getApp().getUser().id,
      currentMenu: null,
      lists:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
  },
  onTab(e) {
    let tab = this.data.menu[getApp().ed(e, "index")]
    let currentMenu = tab
    currentMenu.index = getApp().ed(e, "index")
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
      uid: this.data.uid,
      pagesize: menu.size,
      pageindex: menu.page,
      zt: this.data.currentMenu.key,
    }
    if (menu.key == -1) {
      delete payLoad.zt
    }
    getApp().api.get("WxMyRentalAPI", payLoad).then(
      it => {
        let list = menu.list
        if (menu.page == 1) {
          list = []
        }
        // it.forEach(item => {
        //   item.pic = item.pic.split(",")
        //   item.time = getApp().getTime(item.AddTime)
        // })
        list = list.concat(it)
        menu.list = list

        this.setData({
          menu: this.data.menu,
          currentMenu: this.data.currentMenu

        })
      }
    ).catch(getApp().toast)
  },
  getAll() {
    let payLoad={
      pagesize:this.data.pagesize,
      pageindex:this.data.pageindex,
      zt:this.data.status,
      uid:this.data.uid
    }

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    getApp().checkHouse()
    if(this.data.currentMenu){
      this.onTab({ currentTarget: { dataset: { index: this.data.currentMenu.index } } })
      return  
    }
    this.onTab({ currentTarget: { dataset: { index: 0 } } })
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
    this.data.currentMenu.page = 1
    this.getList()
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