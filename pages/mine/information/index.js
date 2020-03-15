// pages/mine/information/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: {
      id:null,
      avatarUrl:"",
      nickName: "",
      mobile: "",
      email: "",
      qq: "",
      sex:"",
      prove:false,
      city:"",
      country: "",
      age:null,
      openId: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserInfo();
  },
  getUserInfo(){
    var me = this;
    var id= wx.getStorageSync("currentUser").id;

    console.log("my:" + id)
    if (!id){
      getApp().toast("未登录");
      return;
    }
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/api/getUser',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        id: id
      },
      success: function (res) {
        console.log("update:" + res)
        let cInfo = res.data.data;
        console.log("1"+cInfo.openId)

        cInfo.gender = cInfo.gender==1?"男":"女";
        me.setData({
      information:cInfo
    })
  
      }
    })
    // let cInfo = this.data.information;
    // cInfo.id=info.id;
    // cInfo.avatarUrl = info.avatarUrl;
    // cInfo.nickName = info.nickName;
    // cInfo.mobile = info.mobile;
    // cInfo.qq = info.qq;
    // cInfo.age = info.age
    // cInfo.gender = info.gender==1?"男":"女";
    // cInfo.email = info.email;
    // cInfo.city = info.city;
    // cInfo.country = info.country;
    // this.setData({
    //   information:cInfo
    // })
  },
  getValue(e) {
    let name = getApp().ed(e, "name");
    let info = this.data.information;
    info[name] = e.detail.value;
    this.setData({
      information: info
    })
  },
  selectSex() {
    let vm = this;
    let info = this.data.information
    let arr = ["女", "男"]
    wx.showActionSheet({
      itemList: arr,  
      success(res){
        info.gender = arr[res.tapIndex];
        vm.setData({
          information: info
        })
      }
    })
  },
  selectAvatar(){
    let me = this;
    let info = me.data.information;
    getApp().getUtil("util").uploadImage((url) => {
      info.avatarUrl = url;
      me.setData({ information:info })
    })
  },
  submit(){
    let me = this;
    // var id = app.getGlobalUserInfo().data.data.id;
    let info = me.data.information;
    console.log("my2:" + info.openId)
    console.log("my3:" + info)

    let payload={
      id: info.id,
      nickName: info.nickName,
      gender: info.gender=='男'?1:0,
      qq:info.qq,
      age:info.age,
      email:info.email,
      mobile: info.mobile,
      avatarUrl: info.avatarUrl,
      city: info.city,
      country : info.country,
      openId: info.openId,
    }
    if(payload.age && (payload.age <= 0 || payload.age > 120)){
      getApp().toast("请填写正确的年龄")
      return
    }
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/api/updateUser',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        // user: payload,
        id: info.id,
        nickName: info.nickName,
        gender: info.gender == '男' ? 1 : 0,
        qq: info.qq,
        age: info.age,
        email: info.email,
        mobile: info.mobile,
        avatarUrl: info.avatarUrl,
        city: info.city,
        country: info.country,
        openId: info.openId,

      },
      success: function (res) {
        console.log("update:"+res)

        var code = res.data.code;
        if (code == 200) {
          wx.showToast({
            title: "修改成功",
            duration: 1500,
            icon: "success",
            success: function () {
              // fixme 修改原有的全局对象为本地缓存
              //app.setGlobalUserInfo(res.data.data);
              // app.globalData.userInfo = res.data.data;
              setTimeout(function () {
                // 页面跳转
                wx.redirectTo({
                  url: '../index/index',
                })
              }, 1000)
            }
          })
        }
        // // //保存用户信息到本地缓存,可以用作小程序端的拦截器
        // me.setData({
        //   nickName: res.data.data.nickName,
        //   avatarUrl: res.data.data.avatarUrl,
        //   isMe: false
        // })
       // wx.setStorageSync("currentUser", res)
        //app.setGlobalUserInfo(res.data.data);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})