//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    host: getApp().api.getHttpUrl(),
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    currentBanner: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showBind: false,
    banner: ["/r/barner_three.jpg"],
    currentMessage:"物业已开通业务，欢迎大家使用",
    setMess:"",
    resourceType:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    var me = this;
    // me.getBanner()
    me.getResourceType()
  },
  goSelectHouse() {
    getApp().getUserInfo((data) => {
      wx.navigateTo({
        url: '/pages/mine/house/index',
      })
    }, () => {
      this.showBind()
    })
  },
  goToService() {
    getApp().getUserInfo((data) => {
      wx.navigateTo({
        url: '/pages/index/services/index',
      })
    }, () => {
      this.showBind()
    })
  },
  goResource(e) {
    let id = e.currentTarget.dataset.id;
    console.log("resourceTypeID"+id)
    getApp().getUserInfo((data) => {
      wx.navigateTo({
        url: '/pages/index/resource/index?id=' + id,
      })
    }, () => {
      this.showBind()
    })
  },
  goNotice() {
    getApp().getUserInfo(() => {
      wx.navigateTo({
        url: '/pages/index/notice/index',
      })
    }, () => {
      this.showBind()
    })
  },
  goPay() {
    getApp().getUserInfo(() => {
      wx.navigateTo({
        url: '/pages/index/house-buy/index',
      })
    }, () => {
      this.showBind()
    })
  },

  onSwiperChange(e) {
    this.setData({
      currentBanner: e.detail.current
    })
  },
  getBanner() {
    getApp().api.get("/banner", true, true).then(it => {
      console.log(it)
      this.setData({
        banner: it
      })
    })
  },

  getResourceType(){
    getApp().api.get("/resource/type", true, true).then(it => {
      console.log(it)
      this.setData({
        resourceType: it
      })
    })
  },
  openBanner(e) {
    console.log(e)
    let id =e.currentTarget.dataset.id;
    let content = e.currentTarget.dataset.content;
    console.log(id)
    let banner = this.data.banner[getApp().ed(e, "id")]
    getApp().getUtil("store").put("banner", content)
      wx.navigateTo({
        url: 'banner/index?id=' + id,
      })

  },
  onHide(){
    clearTimeout(this.data.setMess);
  },
  onShow() {

  },
  getMessage(){
    getApp().api.get("WxNoticeLine",{},true).then(it => {
      if(!it || !it.length){
        return
      }
      this.setData({ messageList: it, currentMessage: it[0].title,currentM:0 })
      this.showMesasge()
    })
  },
  showMesasge(){
    let list = this.data.messageList;
    let current = this.data.currentM;
    if(current>=list.length-1){
      current = 0
    }else{
      current = current+1
    }
    this.data.setMess = setTimeout(()=>{
      this.setData({
        currentMessage:""
      })
      setTimeout(()=>{
        this.setData({
          currentMessage: list[current].title,
          currentM: current
        })
        this.showMesasge();
      },50)
    },5000)
  },
  showBind() {
    let show = this.data.showBind;
    this.setData({
      showBind: !show
    })
    if (!show) {
      setTimeout(() => {
        this.showBind()
      }, 10)
    }

  },
  openVisitorInvite() {
    getApp().getUserInfo((data) => {
      let community = this.data.community || {}
      if (community.id == 22){
        getApp().confirm(null,"暂未开放",true)
        return
      }
      let appId = community && community.Appid || 'wxe7cd2eb305a7a195'
      getApp().openMa(appId, community.AppPath)
    }, () => {
      this.showBind()
    })
  },

  goUpdate(){
    wx.navigateTo({
      url: '/pages/update/update',
    })
  },
  goHelp() {
    getApp().getUserInfo((data) => {
      wx.navigateTo({
        url: '/pages/mine/help/index',
      })
    }, () => {
      this.showBind()
    })
  },
  goService() {
    getApp().getUserInfo((data) => {
      wx.navigateTo({
        url: '/pages/index/appointment/index',
      })
    }, () => {
      this.showBind()
    })
  },
  checkBind() {
    getApp().getUserInfo((data) => {
      getApp().getCommunityInfo((it) => {
        if(it.PayChoice == 0){
          wx.navigateTo({
            url: '/pages/payment/bill/index',
          })
        } else{
          wx.showModal({
            showCancel:false,
            title: '您所在小区暂未开通物业缴费功能，敬请期待！',
          })
        }
      })

    }, () => {
      this.showBind()
    })
  },
})