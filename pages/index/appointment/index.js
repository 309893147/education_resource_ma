// pages/index/appointment/index.js
Page({

  /**
   * Page initial data
   */
  data: {
      tabs:[{name:"全部",active:true,status:"all",},{name:"待审核",status:0},{name:"审核中",status:1},{name:"已审核",status:2},{name:"已取消",status:3}],
      list:[{title:"装修办理预约",date:"2019-03-24 14:02:26",status:"已审核"}],
      pageIndex:0,
      pageSize:20,
      status:"",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getAll();
  },
  getAll() {
    let pay = {
      pageindex:this.data.pageIndex,
      pagesize: this.data.pageSize,
      status:this.data.status
    }
    if(pay.status=='all'){
      delete pay.status
    }
    getApp().api.get("WxMyAppointment",pay).then(
      (it) => {
        let infoAll = this.data.infoAll;
        if(!infoAll || pay.pageindex==0){
          infoAll = []
        }
        it.forEach(it=>{
          it.StatusFlg = Number(it.StatusFlg)
        })
        infoAll = infoAll.concat(it)
        this.setData({
          infoAll: infoAll
        })
      }
    )
  },
  goDetail(e){
    let index = getApp().ed(e,"index");
    let all = this.data.infoAll;
    wx.navigateTo({
      url: 'detail/index?item='+JSON.stringify(all[index]) 
    })
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
  },
  onTab(e){
    console.log(e)
    let tabs = this.data.tabs;
    tabs.forEach(it =>{
      it.active = false
    })
    tabs[e.detail].active = true
    this.setData({ tabs: this.data.tabs, status: tabs[e.detail].status,pageIndex:0})
    this.getAll()
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
    this.setData({
      pageIndex:0
    })
    this.getAll()
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    this.setData({
      pageIndex:this.data.pageIndex+1
    })
    this.getAll();
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})