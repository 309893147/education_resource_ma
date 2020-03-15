// pages/mine/index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    isMe: true,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var me = this;
    // fixme 修改原有的全局对象为本地缓存
    // var user = app.getGlobalUserInfo();
    var user = wx.getStorageSync("currentUser");
    console.log("onload:"+user)
    if (user) {
      var nickName = user.nickName;
      var avatarUrl = user.avatarUrl;
      me.setData({
        nickName: nickName,
        avatarUrl: avatarUrl,
        isMe: false
      })
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {
 
  },

  openManager(){
    var me = this;
    var id = app.getUser().data.data.id;
    if (id) {
      var serverUrl = app.serverUrl;
      // 调用后端
      wx.request({
        url: serverUrl + '/manage/manager/user',
        data:{
          userId:id
        } ,
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res.data);
          wx.hideLoading();
          if (res.data.code == 200) {
            wx.showToast({
              title: '账号申请成功',
              duration: 1500,
              icon: "success",
              success: function () {
                setTimeout(function () {
                  wx.navigateTo({
                    url: '/pages/address/address',
                  })


                }, 1000)
              }
            })
          }
        }
      })
    } 

  },

  //微信自有登陆
  onGotUserInfo: function (e) {
    var me = this;
    console.log(e.detail.errMsg)
    console.log("=="+e.detail.userInfo)
    console.log("__"+e.detail.rawData)
    var userInfo = e.detail.userInfo;
    var nickName = userInfo.nickName;
    var gender = userInfo.gender;
    var city = userInfo.city;
    var province = userInfo.province;
    var country = userInfo.country;
    var avatarUrl = userInfo.avatarUrl;
    //登陆
    wx.login({
      success: res => {
        // console.log("de"+res)
        //获取登录得临时凭证
        var code = res.code;
        var serverUrl = app.serverUrl;
        //调用后端,获取微信得session_key,secret
        wx.request({
          url: serverUrl + '/api/wxLogin?code=' + code,
          method: 'POST',
          header: {
            'content-type': 'application/json', // 默认值
          },
          success: function (result) {
             var openId = result.data.data.openid;
            // app.globalData.openId = openId;
            // //保存用户信息到本地缓存,可以用作小程序端的拦截器
            // console.log(result);
            // app.setGlobalUserInfo(result);
            wx.request({
              url: serverUrl + '/api/wxSaveUser',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
              },
              data: {
                openId: openId,
                nickName: nickName,
                gender: gender,
                city: city,
                province: province,
                country: country,
                avatarUrl: avatarUrl
              },
              success: function (res) {
                 console.log(res)
                // //保存用户信息到本地缓存,可以用作小程序端的拦截器
                wx.setStorageSync("currentUser", res.data.data.data)
                wx.setStorageSync("accessToken", res.data.data.token)

                me.setData({
                  nickName: res.data.data.data.nickName,
                  avatarUrl: res.data.data.data.avatarUrl,
                  isMe: false
                })

              }
            })

          }
        })
      }
    })
  },
  

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {
  
  },
  getName(){
    let house = this.data.currentHouse;
    house.statusName = getApp().getOwnType(house.status);
    house.userStatusName = getApp().getHouseState(house.UseStatus)
    this.setData({currentHouse:house})
  },
  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },
  

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})