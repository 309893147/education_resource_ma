let api = require("./api.js")
let isiphoneX = false
let events = {}



App({
  serverUrl: "http://localhost:8088",
  globalData: {
    userInfo: null,
    openId: null,
    user: null,
    flag: null,
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
  },
  setGlobalUserInfo: function (userInfo) {
    wx.setStorageSync("userInfo", userInfo);
  },

  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo");
  },
  onLaunch: function () {
    wx.getSystemInfo({
      success: function (res) {
        isiphoneX = res.model.indexOf("iPhone X") > -1
      }
    })
  },
  getUtil(name) {
    return require('utils/' + name + '.js')
  },
  getTime(time) {
    let newTime = new Date(Number(time.substring(6, 19)))
    console.log(newTime)
    let year = newTime.getFullYear();
    let month = newTime.getMonth() + 1;
    let date = newTime.getDate();
    let hours = newTime.getHours();
    let minutes = newTime.getMinutes();
    let seconds = newTime.getSeconds();
    return year + "/" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds
  },
  isIphoneX() {
    console.log(isiphoneX)
    return isiphoneX;
  },
  openMa(appId,path) {
    this.checkHouse(()=>{
      wx.navigateToMiniProgram({
        appId: appId,
        path: path || ""
      })
    })
    
  },
  getIndex(e) {

  },
  getUserInfo(cb, err) {
    let user = this.getUser()
    if (user) {
      cb && cb(user)
    } else {
      err && err()
      // wx.navigateTo({
      //   url: '/pages/login/index',
      // })
    }
  },
  gHost() {
    return api.getHttpUrl();
  },
  back(name, time) {
    toast(name, 500);
    setTimeOut(() => {
      wx.navigateBack()
    }, 500)
  },
  getUser() {
    let user = wx.getStorageSync("currentUser")
    return user
  },
  ed(e, name) {
    console.log(name)
    console.log(e.currentTarget.dataset[name])
    return e.currentTarget.dataset[name];
  },
  openLocation(lat, lng) {
    wx.openLocation({
      latitude: lat,
      longitude: lng,
    })
  },
  api: api,
  globalData: {
    userInfo: null
  },
  back(delta) {
    wx.navigateBack({
      delta: delta || 0
    })
  },
  toast(msg, cb, duration) {
    if (!msg) {
      return
    }
    wx.showToast({
      title: msg + "",
      icon: 'none',
      success(){
        if(cb){
          setTimeout(cb,1000)
        }
      },
      duration: duration || 1000
    })
  },
  sTime(time, type) {
    time = new Date(time);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds()
    if (type == 'month') {
      return year + '-' + month;
    } else {
      return year + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds
    }
  },
  processHouse(house) {
    if (!house || !house.length) {
      return
    }
    house.forEach(it => {
      it.statusName = this.getOwnType(it.status)
      it.stateName = this.getHouseState(it.UseStatus)
    })
  },
  checkHouse(cb){
    let house = wx.getStorageSync("currentHouse")
    if(!house){
      getApp().toast("请先选择房屋",this.back)
      return
    }
    if(house.UseStatus !== 2){
      getApp().toast("请先验证房屋", this.back)
      return
    }
    cb && cb(house)
  },
  getOwnType(type) {
    switch (type) {
      case 1:
        return "业主"
      case 2:
        return "家属"
      case 3:
        return "租客"
      case 4:
        return "保姆"
    }
  },
  getHouseState(state) {
    switch (state) {
      case 1:
        return "未验证"
      case 2:
        return "已验证"
      case 3:
        return "认证失败"
      case 4:
        return "未认证"
    }
  },
  confirm(cb, msg,hideCancel) {
    wx.showModal({
      title: msg || "确认?",
      showCancel:!hideCancel,
      success(res) {
        if (res.confirm) {
          cb && cb()
        }
      }
    })
  },
  checkPhone(tel){
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(reg.test(tel)){
      return true;
    }
    return false;
  }
})