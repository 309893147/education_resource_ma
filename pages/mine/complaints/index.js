// pages/mine/complaints/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenu:"0",
    menu:[
      {
        name:"全部",
        key:"0"
      },{
        name:"待处理",
        key:"1"
      },{
        name:"处理中",
        key:"2"
      },{
        name:"已处理",
        key:"3"
      },{
        name:"已取消",
        key:"4"
      },{
        name:"待评价",
        key:""
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({user:getApp().getUser()})
    this.onTab({ currentTarget:{dataset:{index:0}}})
  },
  onTab(e){
    let tab = this.data.menu[getApp().ed(e,"index")]
    let currentMenu = tab
    this.setData({currentMenu:currentMenu})
    if(!currentMenu.list){
      this.getList()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getList(){
    let menu =  this.data.currentMenu
    if(!menu.page){
      menu.page = 1
      menu.size = 20
    }
    let payLoad = {
      uid: this.data.user.id,
      pagesize: menu.size,
      pageindex: menu.page,
      zt: this.data.currentMenu.key,
      mm: "365",
      title: "",
    }
    if(menu.key == 0){
      delete payLoad.zt
    }
    getApp().api.get("ComplaitList", payLoad).then(
      (it) => {
        it.forEach(item => {
          item.updatetime = getApp().getTime(item.updatetime)
        })
        let list = menu.list
        if (menu.page === 1) {
          list = []
        }
        menu.list = list
        this.setData({
          currentMenu:menu,
          menu: this.data.menu
        })
      }
    )
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
      this.data.currentMenu.page = 1
      this.getList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.currentMenu.page+=1
    this.getList()
  }
})